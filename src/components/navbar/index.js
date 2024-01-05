import Image from "next/image";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { IoBagCheck, IoCart, IoCloseCircle } from "react-icons/io5";
import { IoIosRemoveCircle } from "react-icons/io";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { CartContext } from '@/pages/_app';

const Navbar = ({ logout, user, cart, addtoCart, removeFromCart, clearCart, subTotal }) => {
    const [dropDown, setDropDown] = useState(false)
    const [cartToggle, setCartToggle] = useState(false)
    const ref = useRef();

    const { totalItems } = useContext(CartContext);

    return (
        <div className="flex flex-col md:flex-row md:justify-start md:items-center py-3 shadow-xl sticky z-50 top-0 backdrop-blur-3xl">
            <Link href="/" className="logo mr-3">
                <Image width={200} height={40} src="/logo.png" alt="" />
            </Link>
            <div className="nav">
                <ul className="flex font-semibold items-center justify-center space-x-3 md:text-md">
                    <Link href="/tshirts">
                        <li>Tshirts</li>
                    </Link>
                    <Link href="/hoodies">
                        <li>Hoodies</li>
                    </Link>
                    <Link href="/stickers">
                        <li>Stickers</li>
                    </Link>
                    <Link href="/mugs">
                        <li>Mugs</li>
                    </Link>
                </ul>
            </div>
            <div className="flex cart absolute items-center right-5 top-5 mx-4">
                {user?.token && <div onClick={() => setDropDown(!dropDown)}>
                    <Icon icon="mingcute:user-4-fill" className="md:text-3xl text-2xl mx-2 cursor-pointer" />
                </div>}
                <div className={`absolute top-12 right-2 z-10 bg-white rounded-lg shadow-2xl w-44 ${dropDown ? "block" : "hidden"}`}>
                    <ul className="py-2 text-sm text-gray-700">
                        <Link href='/myAccount'><li className="px-4 py-2 hover:bg-gray-100">My Account</li></Link>
                        <Link href='/orders'><li className="px-4 py-2 hover:bg-gray-100">Orders</li></Link>
                        <li className="px-4 py-2 hover:bg-gray-100" onClick={logout}>Logout</li>
                    </ul>
                </div>
                {!user?.token && <Link href='/login'>
                    <button className="bg-pink-600 text-white px-4 py-1 mx-2 rounded-md cursor-pointer">Login</button>
                </Link>}
                <div className="relative" onClick={() => setCartToggle(!cartToggle)}>
                    <IoCart className="md:text-3xl text-2xl cursor-pointer" />
                    {totalItems > 0 && <div className="absolute text-center text-sm top-[-9px] right-[-9px] bg-pink-500 rounded-full w-5 h-w-5 text-white font-semibold">{totalItems}</div>}
                </div>
            </div>
            <div ref={ref} className={`w-72 h-[100vh] overflow-y-scroll absolute top-0 right-0 bg-pink-100 p-10 z-50 ${cartToggle ? "block" : "hidden"}`}>
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                <div className="absolute top-5 right-2 text-2xl text-pink-500 cursor-pointer" onClick={() => setCartToggle(!cartToggle)}>
                    <IoCloseCircle />
                </div>
                <ol className="list-decimal">
                    {Object.keys(cart).length == 0 && <div>No Items In The Cart</div>}
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-5">
                                <div className="w-2/3 font-semibold">{cart[k]?.name} ({cart[k]?.size} / <span className='capitalize'>{cart[k]?.variant}</span>)</div>
                                <div className="flex font-semibold items-center justify-between w-1/3 text-lg">
                                    <HiMinusCircle className="text-pink-500 cursor-pointer" onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} />
                                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                                    <HiPlusCircle className="text-pink-500 cursor-pointer" onClick={() => { addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} />
                                </div>
                            </div>
                        </li>
                    })}

                </ol>
                <div className="font-bold my-3">SUBTOTAL: ₹ {subTotal} </div>
                <div className="nav-button flex">
                    <Link href='/checkOut'>
                        <button className="flex mr-2 text-white border-0 py-2 px-4 focus:outline-none bg-pink-500 rounded text-sm items-center">
                            <IoBagCheck className="mr-2" />
                            Checkout
                        </button>
                    </Link>
                    <button onClick={clearCart} className="flex mr-2 text-white border-0 py-2 px-4 focus:outline-none bg-pink-500 rounded text-sm items-center">
                        <IoIosRemoveCircle className="mr-2" />
                        Clear
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
