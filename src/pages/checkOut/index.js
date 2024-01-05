import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const CheckOut = ({ cart, clearCart, addtoCart, removeFromCart, subTotal }) => {

    const [disabled, setDisabled] = useState(true)
    const [user, setUser] = useState()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('myuser'))
        if (user) {
            setUser(user)
        }
    }, [])


    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const watchAllFields = watch({ name: "name", email: "email", address: "address", phone: "phone", city: "city", state: "state", pincode: "pincode" });

    useEffect(() => {
        if (Object?.values(watchAllFields)?.every(field => field)) {
            setDisabled(false)
        } else (
            setDisabled(true)
        )
    }, [watchAllFields])

    useEffect(() => {
        if (document) {
            document.title = "CodesWear || CheckOut";
        }
    }, []);

    const onSubmit = (data) => { };
    // console.log('data log', { cart, subTotal, email: watchAllFields.email, name: watchAllFields.name, address: watchAllFields.address, pincode: watchAllFields.pincode, phone: watchAllFields.phone })

    const initiatePayment = async () => {
        let oid = Math?.floor(Math?.random() * Date?.now())
        console.log("Order ID:", oid); // Log the order id

        const data = { cart, subTotal, oid, email: watchAllFields.email, name: watchAllFields.name, address: watchAllFields.address, pincode: watchAllFields.pincode, phone: watchAllFields.phone }
        console.log("Data:", data); // Log the data

        const a = await axios.post(`${process?.env?.NEXT_PUBLIC_HOST}/api/pretransaction`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON?.stringify(data)
        });

        let txnRes = await a.data
        console.log("Transaction Response:", txnRes); // Log the transaction response
        if (txnRes?.success) {
            let txnToken = txnRes?.txnToken
            console.log("Transaction Token:", txnToken); // Log the transaction token

            var config = {
                "root": "",
                "flow": "DEFAULT",
                "data": {
                    "orderId": oid, /* update order id */
                    "token": txnToken, /* update token value */
                    "tokenType": "TXN_TOKEN",
                    "amount": subTotal /* update amount */
                },
                "handler": {
                    "notifyMerchant": function (eventName, data) {
                        console.log("notifyMerchant handler function called");
                        console.log("eventName => ", eventName);
                        console.log("data => ", data);
                    }
                }
            };
            console.log("Config:", config);

            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                // after successfully updating configuration, invoke JS Checkout
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("CheckoutJS Error :", error);
            });
        } else {
            console?.log("Transaction Error:", txnRes?.error)
            clearCart()
            toast.error(txnRes?.error, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className="container px-5 sm:mx-auto">
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <Script type="application/javascript" src={`${process?.env?.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process?.env?.NEXT_PUBLIC_PAYTM_MID}.js`} />
            <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <h1 className="font-bold text-center text-3xl my-8">CheckOut</h1>
            <h2 className="font-semibold text-xl">1. Delivery Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto flex my-2">
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                Email
                            </label>
                            {user?.email ? <input type="email" value={user?.email} placeholder={user?.email} id="email" name="email" readOnly className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"{...register("email", { required: false })} />
                                :
                                <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("email", { required: true, maxLength: 50, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "invalid email address", }, })} />
                            }
                            {/* {...register("email", { required: true, maxLength: 50, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "invalid email address", }, })}*/}
                            {errors.email && errors.email.type === "required" && (<p className="text-pink-500">Email is required**</p>)}
                            {errors.email && errors.email.type === "maxLength" && (<p className="text-pink-500">Email cannot exceed 50 characters</p>)}
                            {errors.email && errors.email.type === "pattern" && (<p className="text-pink-500">{errors.email.message}</p>)}
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                {...register("name", {
                                    required: true,
                                    maxLength: 20,
                                    pattern: /^[A-Za-z\s]+$/,
                                })}
                            />
                            {errors.name && errors.name.type === "required" && (<p className="text-pink-500">Name is required**</p>)}
                            {errors.name && errors.name.type === "maxLength" && (<p className="text-pink-500">Name cannot exceed 20 characters**</p>)}
                            {errors.name && errors.name.type === "pattern" && (<p className="text-pink-500">Name should only contain alphabets**</p>)}
                        </div>
                    </div>
                </div>
                <div className="px-2">
                    <div className="relative mb-4">
                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                            Address
                        </label>
                        <textarea
                            rows={3}
                            id="address"
                            name="address"
                            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            defaultValue={""}
                            {...register("address", {
                                required: "Address is required",
                                minLength: {
                                    value: 10,
                                    message: "Address should be at least 10 characters",
                                },
                            })}
                        />
                        {errors.address && (<p className="text-pink-500">{errors.address.message}</p>)}
                    </div>
                </div>
                <div className="mx-auto flex my-2">
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^(\+1|1)?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                                        message: "Invalid phone number",
                                    },
                                })}
                            />
                            {errors.phone && (<p className="text-pink-500">{errors.phone.message}</p>)}
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                {...register("city", {
                                    required: true,
                                    maxLength: 20,
                                    pattern: /^[A-Za-z\s]+$/,
                                })}
                            />
                            {errors.city && errors.city.type === "required" && (<p className="text-pink-500">City is required**</p>)}
                            {errors.city && errors.city.type === "pattern" && (<p className="text-pink-500">City should only contain alphabets**</p>)}
                        </div>
                    </div>
                </div>

                <div className="mx-auto flex my-2">
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                                State
                            </label>
                            <input
                                type="tel"
                                id="state"
                                name="state"
                                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                {...register("state", {
                                    required: true,
                                    maxLength: 20,
                                    pattern: /^[A-Za-z\s]+$/,
                                })}
                            />
                            {errors.state && errors.state.type === "required" && (<p className="text-pink-500">state is required**</p>)}
                            {errors.state && errors.state.type === "pattern" && (<p className="text-pink-500">state should only contain alphabets**</p>)}
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label
                                htmlFor="pincode"
                                className="leading-7 text-sm text-gray-600"
                            >
                                Pincode
                            </label>
                            <input
                                type="text"
                                id="pincode"
                                name="pin"
                                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                {...register("pincode", {
                                    required: 'Pincode is required**',
                                    maxLength: {
                                        value: 6,
                                        message: "Please enter a valid 6-digit pincode",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Please enter a valid 6-digit pincode",
                                    },
                                    pattern: {
                                        value: /^[0-9]{6}$/,
                                        message: "Please enter a valid 6-digit pincode",
                                    },
                                })}
                            />
                            {errors.pincode && (<p className="text-pink-500">{errors.pincode.message}</p>)}
                        </div>
                    </div>
                </div>
                <h2 className="font-semibold text-xl">2. Review Cart Items & Pay</h2>
                <div className="bg-pink-100  p-10 z-50">
                    <ol className="list-decimal">
                        {Object.keys(cart).length == 0 && <div>No Items In The Cart</div>}
                        {Object.keys(cart).map((k) => {
                            return (
                                <li key={k}>
                                    <div className="item flex my-5">
                                        <div className="w-1/2 font-semibold">
                                            {cart[k]?.name} ({cart[k]?.size} / <span className="capitalize">{cart[k]?.variant}</span>)
                                        </div>
                                        <div className="flex font-semibold items-center text-lg">
                                            <HiMinusCircle className="text-pink-500 cursor-pointer" onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant); }} />
                                            <span className="mx-2 text-sm">{cart[k].qty}</span>
                                            <HiPlusCircle className="text-pink-500 cursor-pointer" onClick={() => { addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant); }} />
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                    <div className="font-bold">SUBTOTAL: ₹ {subTotal} </div>
                </div>
                <div className="m-5">
                    <input type="submit" disabled={disabled} onClick={initiatePayment} className="disabled:bg-pink-300 flex mr-2 text-white border-0 py-2 px-4 focus:outline-none bg-pink-500 rounded text-sm items-center cursor-pointer" value={`Pay ₹ ${subTotal}`} />
                </div>
            </form>
        </div>
    );
};

export default CheckOut;