import connectDb from '../../../middleware/mongoose';
import Order from '../../../models/Order';
import Product from '../../../models/Product';

const https = require('https');
const PaytmChecksum = require('paytmchecksum');

const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {

            // check if the cart is tampered with
            let product, sumtotal = 0
            let cart = req?.body?.cart
            for (let item in cart) {
                sumtotal += cart[item].price * cart[item].qty
                product = await Product?.findOne({ slug: item })
                if (product.availableQty < cart[item].qty) {
                    res.status(200).json({ success: false, "error": "Some items in your cart went out of stock. Please try again!" })
                }
                if (product?.price != cart[item].price) {
                    res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please try again" })
                    return
                }
            }
            if (sumtotal !== req?.body?.subTotal) {
                res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please try again" })
                return
            }

            // check if the cart items are out of stock

            // check if the details are valid

            // Initiate on order corresponding to this order id
            let order = new Order({
                email: req?.body?.email,
                orderId: req?.body?.oid,
                address: req?.body?.address,
                amount: req?.body?.subTotal,
                products: req?.body?.cart
            })
            await order?.save()

            // Insert on entry in the Orders table with status as pending
            var paytmParams = {};

            paytmParams.body = {
                "requestType": "Payment",
                "mid": process?.env?.NEXT_PUBLIC_PAYTM_MID,
                "websiteName": "YOUR_WEBSITE_NAME",
                "orderId": req?.body?.oid,
                "callbackUrl": `${process?.env?.NEXT_PUBLIC_HOST}/api/posttransaction`,
                "txnAmount": {
                    "value": req?.body?.subTotal,
                    "currency": "INR",
                },
                "userInfo": {
                    "custId": req?.body?.email,
                },
            };

            const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process?.env?.NEXT_PUBLIC_PAYTM_MKEY)

            paytmParams.head = {
                "signature": checksum
            };

            var post_data = JSON.stringify(paytmParams);

            const requestAsync = () => {
                return new Promise((resolve, reject) => {
                    var options = {

                        /* for Staging */
                        // hostname: 'securegw-stage.paytm.in',

                        /* for Production */
                        hostname: 'securegw.paytm.in',

                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${process?.env?.NEXT_PUBLIC_PAYTM_MID}&orderId=${req?.body?.oid}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };

                    var response = "";
                    var post_req = https.request(options, function (post_res) {
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });
                        post_res.on('end', function () {
                            console.log('Response: ', response);
                            let ress = JSON?.parse(response)?.body
                            if (ress) {
                                ress.success = true;
                            }
                            resolve(ress)
                        });
                    });

                    post_req.write(post_data);
                    post_req.end();
                })
            }

            let myr = await requestAsync()
            res?.status(200)?.json(myr)
        } else {
            res.status(405).json({ success: false, error: 'Method not allowed' });
        }
    } catch (err) {
        console.log("🚀 ~ file: pretransaction.js:114 ~ handler ~ err:", err)
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
export default connectDb(handler)