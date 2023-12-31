import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (localStorage?.getItem('token')) {
            router?.push('/')
        }
        if (document) {
            document.title = 'CodesWear || Login';
        }
    }, [])


    const handleChange = async (e) => {
        if (e?.target?.name == 'email') {
            setEmail(e?.target?.value)
        }
        else if (e?.target?.name == 'password') {
            setPassword(e?.target?.value)
        }
    }

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const data = { email, password };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, data)

            setEmail("");
            setPassword("");

            if (response.data.success) {
                localStorage?.setItem('token', response.data.token);
                toast.success('You are successfully logged in', {
                    position: "top-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    router?.push(process.env.NEXT_PUBLIC_HOST);
                }, 1800);
            } else {
                toast.error(response.data.error, {
                    position: "top-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    // const handleSubmit = async (e) => {
    //     e?.preventDefault()
    //     const data = { email, password }
    //     let res = await fetch("http://localhost:3000/api/login", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON?.stringify(data),
    //     })

    //     let response = await res?.json()
    //     console.log("🚀 ~ file: index.js:34 ~ handleSubmit ~ response:", response)

    //     setEmail("")
    //     setPassword("")
    //     if (response?.success) {
    //         localStorage?.setItem('token', response?.token)
    //         toast.success('You are successfully logged in', {
    //             position: "top-left",
    //             autoClose: 1000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });
    //         setTimeout(() => {
    //             router?.push("http://localhost:3000")
    //         }, 1800);
    //     } else {
    //         toast.error(response?.error, {
    //             position: "top-left",
    //             autoClose: 1000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });
    //     }
    // }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <ToastContainer
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-20 w-auto" src="/codeswearcircle.png" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className='mt-2 text-center text-sm text-gray-600'> Or
                        <Link href='/signUp' className='font-medium text-pink-600 hover:text-pink-500'> Singup</Link>
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 outline-none sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    <Link href="/forgot" className="font-semibold text-pink-600 hover:text-pink-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 outline-none sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
