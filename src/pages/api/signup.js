import connectDb from "../../../middleware/mongoose"
import User from "../../../models/User"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { name, email } = req?.body
            let u = new User({ name, email, password: CryptoJS?.AES?.encrypt(req?.body?.password, "secret123")?.toString()})
            await u.save()

            res.status(200).json({ success: 'success' })
        } catch (err) {
            console.log("🚀 ~ file: addProducts.js:23 ~ handler ~ err:", err)
            res.status(500).json({ error: err?.message })
        }
    } else {
        res.status(400).json({ error: 'This method is not allowed' })
    }
}

export default connectDb(handler)