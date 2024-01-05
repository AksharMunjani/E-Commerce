import connectDb from "../../../middleware/mongoose"
import User from "../../../models/User"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {

            let user = await User?.findOne({ "email": req?.body?.email })
            const bytes = CryptoJS.AES.decrypt(user?.password, process.env.NEXT_PUBLIC_AES_SECRET)
            let decryptedPass = bytes?.toString(CryptoJS.enc.Utf8)
            if (user) {
                if (req?.body?.email == user?.email && req?.body?.password == decryptedPass) {
                    var token = jwt.sign({ email: user?.email, name: user?.name }, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: "2d" });
                    res.status(200).json({ success: true, token, email: user.email })
                } else {
                    res.status(200).json({ success: false, error: "Invalid Credentials !" })
                }
            } else {
                res.status(200).json({ success: false, error: "No user founnd !" })
            }

        } catch (err) {
            console.log("🚀 ~ file: addProducts.js:23 ~ handler ~ err:", err)
            res.status(500).json({ error: err?.message })
        }
    } else {
        res.status(400).json({ error: 'Invalid Credentials' })
    }
}

export default connectDb(handler)