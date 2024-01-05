import connectDb from "../../../middleware/mongoose"
import Order from "../../../models/Order"
import jsonwebtoken from "jsonwebtoken"


const handler = async (req, res) => {
    try {
        const token = req?.body?.token
        const data = jsonwebtoken.verify(token, process?.env?.NEXT_PUBLIC_JWT_SECRET);
        let orders = await Order?.find({ email: data?.email })
        res.status(200).json({ orders })
    } catch (error) {
        console.log("🚀 ~ file: myorders.js:16 ~ handler ~ error:", error)
        res.status(500).json({ error: error?.message })
    }
}
export default connectDb(handler)