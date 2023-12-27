import React, { useEffect } from 'react'
import Order from '../../../models/Order'
import mongoose from 'mongoose'

const Orders = () => {

  useEffect(() => {
    if (document) {
      document.title = 'CodesWear || Orders';
    }
  }, [])

  return (
    <>
      <div className='container mx-auto'>
        <h1 className='p-8 text-2xl text-center font-medium'>My Orders</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Product name</th>
                <th scope="col" className="px-6 py-3">Color</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Apple MacBook Pro 17</th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
              </tr>
              <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Microsoft Surface Pro</th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
              </tr>
              <tr className="bg-white">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Magic Mouse 2</th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose?.connections[0]?.readyState) {
    await mongoose?.connect(process?.env?.MONGO_URL)
  }
  let orders = await Order?.find({})

  return {
    props: { orders: orders }
  }
}

export default Orders
