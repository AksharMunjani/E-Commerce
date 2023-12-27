import Link from 'next/link'
import React from 'react'
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi'
import { IoIosRemoveCircle } from 'react-icons/io'
import { IoBagCheck, IoCloseCircle } from 'react-icons/io5'

const CheckOut = ({ cart, addtoCart, removeFromCart, subTotal }) => {
    return (
        <div className='container px-5 sm:mx-auto'>
            <h1 className='font-bold text-center text-3xl my-8'>CheckOut</h1>
            <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
            <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <div className="px-2">
                <div className="relative mb-4">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea rows={3} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} />
                </div>
            </div>
            <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="tel" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                        <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input type="tel" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input type="text" id="pincode" name="pin" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <h2 className='font-semibold text-xl'>2. Review Cart Items & Pay</h2>
            <div className="bg-pink-100  p-10 z-50">
                <ol className="list-decimal">
                    {Object.keys(cart).length == 0 && <div>No Items In The Cart</div>}
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-5">
                                <div className="w-1/2 font-semibold">{cart[k]?.name} ({cart[k]?.size} / <span className='capitalize'>{cart[k]?.variant}</span>)</div>
                                <div className="flex font-semibold items-center text-lg">
                                    <HiMinusCircle className="text-pink-500 cursor-pointer" onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} />
                                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                                    <HiPlusCircle className="text-pink-500 cursor-pointer" onClick={() => { addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} />
                                </div>
                            </div>
                        </li>
                    })}
                </ol>
                <div className="font-bold">SUBTOTAL: ₹ {subTotal} </div>
            </div>
            <div className="m-5">
                <Link href='/checkOut'>
                    <button className="flex mr-2 text-white border-0 py-2 px-4 focus:outline-none bg-pink-500 rounded text-sm items-center">
                        <IoBagCheck className="mr-2" />
                        Pay ₹ {subTotal}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CheckOut
