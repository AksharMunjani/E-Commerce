import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Product from '../../../models/Product'
import mongoose from 'mongoose'

const ProductDetails = ({ buyNow, addtoCart, product, variants }) => {
    const [productData, setProductData] = useState(product)

    const router = useRouter()
    const { slug } = router.query

    const refreshVariants = (newSize, newColor) => {
        let newSlug = variants?.[newColor]?.[newSize]?.['slug'];
        if (!newSlug) {
            const defaultSize = Object?.keys(variants?.[newColor])?.[0]
            newSlug = variants?.[newColor]?.[defaultSize]?.slug;
        }
        router?.push(`/product/${newSlug}`)
    }

    useEffect(() => {
        setProductData(product)
    }, [product])

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
                        <img alt="ecommerce" className="lg:w-1/2 w-auto h-auto md:h-[45rem] object-center" src={productData?.img} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{productData?.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productData?.title} ( {productData?.size} / <span className='capitalize'>{productData?.color}</span> )</h1>
                            {/* <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                            </div> */}
                            <p className="leading-relaxed">{productData?.desc}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    {/* {Object.keys(variants).includes("red") && Object.keys(variants['red']).includes(productData?.size) && <button onClick={() => { refreshVariants(productData?.size, 'red') }} className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${productData?.color === 'red' ? 'border-black' : 'border-gray-300'}`} />}
                                    {Object.keys(variants).includes("yellow") && Object.keys(variants['yellow']).includes(productData?.size) && <button onClick={() => { refreshVariants(productData?.size, 'yellow') }} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${productData?.color === 'yellow' ? 'border-black' : 'border-gray-300'}`} />}
                                    {Object.keys(variants).includes("black") && Object.keys(variants['black']).includes(productData?.size) && <button onClick={() => { refreshVariants(productData?.size, 'black') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${productData?.color === 'black' ? 'border-black' : 'border-gray-300'}"`} />}
                                    {Object.keys(variants).includes("purple") && Object.keys(variants['purple']).includes(productData?.size) && <button onClick={() => { refreshVariants(productData?.size, 'purple') }} className={`border-2 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${productData?.color === 'purple' ? 'border-black' : 'border-gray-300'}`} />}
                                    {Object.keys(variants).includes("white") && Object.keys(variants['white']).includes(productData?.size) && <button onClick={() => { refreshVariants(productData?.size, 'white') }} className={`border-2 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none ${productData?.color === 'white' ? 'border-black' : 'border-gray-300'}"`} />} */}
                                    {<button onClick={() => { refreshVariants(productData?.size, 'red') }} className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${productData?.color === 'red' ? 'border-pink-600' : 'border-gray-300'}`} />}
                                    {<button onClick={() => { refreshVariants(productData?.size, 'yellow') }} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${productData?.color === 'yellow' ? 'border-pink-600' : 'border-gray-300'}`} />}
                                    {<button onClick={() => { refreshVariants(productData?.size, 'black') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${productData?.color === 'black' ? 'border-pink-600' : 'border-gray-300'}`} />}
                                    {<button onClick={() => { refreshVariants(productData?.size, 'purple') }} className={`border-2 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${productData?.color === 'purple' ? 'border-pink-600' : 'border-gray-300'}`} />}
                                    {<button onClick={() => { refreshVariants(productData?.size, 'white') }} className={`border-2 ml-1 bg-white-500 rounded-full w-6 h-6 focus:outline-none ${productData?.color === 'white' ? 'border-pink-600' : 'border-gray-300'}`} />}
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select value={productData?.size} onChange={(e) => { refreshVariants(e.target.value, productData?.color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-pink-500 text-base pl-3 pr-10">
                                            {Object?.keys(variants[productData?.color])?.includes('S') && <option value={'S'}>S</option>}
                                            {Object?.keys(variants[productData?.color])?.includes('M') && <option value={'M'}>M</option>}
                                            {Object?.keys(variants[productData?.color])?.includes('L') && <option value={'L'}>L</option>}
                                            {Object?.keys(variants[productData?.color])?.includes('XL') && <option value={'XL'}>XL</option>}
                                            {Object?.keys(variants[productData?.color])?.includes('XXL') && <option value={'XXL'}>XXL</option>}
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <span className="title-font font-medium text-2xl text-gray-900 w-[40%]">₹ {productData?.price}</span>
                                <div className="flex flex-wrap items-center justify-end w-[60%] gap-5">
                                    <button onClick={() => { addtoCart(productData?.slug, 1, productData?.price, productData?.title, productData?.size, productData?.color) }} className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Add To Cart</button>
                                    <button onClick={() => { buyNow(productData?.slug, 1, productData?.price, productData?.title, productData?.size, productData?.color) }} className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Buy Now</button>
                                </div>
                                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                    </svg>
                                </button> */}
                            </div>
                        </div>
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
    let product = await Product?.findOne({ slug: context?.query?.slug })
    let variants = await Product?.find({ title: product?.title, category: product?.category })
    let colorSizeSlug = {}
    for (let item of variants) {
        if (Object?.keys(colorSizeSlug)?.includes(item?.color)) {
            colorSizeSlug[item?.color][item?.size] = { slug: item?.slug }
        } else {
            colorSizeSlug[item?.color] = {}
            colorSizeSlug[item?.color][item?.size] = { slug: item?.slug }
        }
    }

    return {
        props: { product: JSON?.parse(JSON?.stringify(product)), variants: JSON?.parse(JSON?.stringify(colorSizeSlug)) }
    }
}

export default ProductDetails
