import React, { useEffect } from 'react'
import Order from '../../../models/Order'
import mongoose from 'mongoose'
import { useRouter } from 'next/router';

const MyOrder = ({ order, clearCart }) => {

  let products = order?.products;
  const router = useRouter()
  useEffect(() => {
    if (router?.query?.clearCart == 1) {
      clearCart()
    }
  }, [])

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order ID: #{order?.orderId}</h1>
              <p className="leading-relaxed">Your order has been succcessfully placed.</p>
              <p className='mb-4'>Your Payment Status is: <span className='font-semibold text-slate-700'>{order?.status}</span></p>
              <table className="overflow-x-scroll w-full text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="text-pink-500 py-2 text-lg px-1 text-center">Item Description</th>
                    <th scope="col" className="text-pink-500 py-2 text-lg px-1 text-center">Quantity</th>
                    <th scope="col" className="text-pink-500 py-2 text-lg px-1 text-center">Item Total</th>
                  </tr>
                </thead>
                {Object?.keys(products).map((item) => {
                  return <tbody key={item}>
                    <tr className="border-t border-gray-200">
                      <th className="text-gray-500 text-center py-2">{products[item].name} ({products[item].size}/{products[item].variant})</th>
                      <td className="text-gray-500 text-center py-2">{products[item].qty}</td>
                      <td className="text-gray-500 text-center py-2">₹ {products[item].price}</td>
                    </tr>
                  </tbody>
                })}
              </table>
              <div className="flex flex-col mt-8">
                <span className="title-font font-medium text-2xl text-gray-900">Subtotal: ₹{order?.amount}</span>
                <button className="flex w-full justify-center mt-4 mx-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
              </div>
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
          </div>
        </div>
      </section>

    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose?.connections[0]?.readyState) {
    await mongoose?.connect(process?.env?.MONGO_URL)
  }
  let order = await Order?.findById(context?.query?.id)
  return {
    props: { order: JSON?.parse(JSON?.stringify(order)) }
  }
}

export default MyOrder
