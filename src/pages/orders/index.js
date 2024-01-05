import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Orders = () => {
  const [orders, setOrders] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const localGetToken = JSON.parse(localStorage?.getItem('myuser')).token
        const a = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, { token: localGetToken }, { headers: { 'Content-Type': 'application/json' }, });
        let res = await a?.data
        setOrders(res.orders)
      }
      catch (err) {
        console.log("🚀 ~ file: index.js:21 ~ fetchOrders ~ err:", err)
      }
    }
    if (!localStorage?.getItem('myuser')) {
      router?.push('/')
    } else {
      fetchOrders()
    }
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
                <th scope="col" className="px-6 py-3">Order Id</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Amount</th>
                <th scope="col" className="px-6 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item) => {
                return <tr key={item} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{item?.orderId}</th>
                  <td className="px-6 py-4">{item?.email}</td>
                  <td className="px-6 py-4">{item?.amount}</td>
                  <td className="px-6 py-4"> <Link href={`/order?id=${item?._id}`}>Details</Link></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Orders
