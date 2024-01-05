import Link from 'next/link'
import React, { useEffect } from 'react'
import Product from '../../../models/Product'
import mongoose from 'mongoose'

const Tshirts = ({ products }) => {

    useEffect(() => {
        if (document) {
            document.title = 'CodesWear || Tshirt';
        }
    }, [])


    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {Object.keys(products)?.map((data, index) => {
                            return <div key={data + index} className="lg:w-1/4 md:w-1/2 p-4 w-full flex flex-col items-center shadow-lg">
                                <Link href={`product/${products[data]?.slug}`} className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="w-full h-80 block" src={products[data]?.img} />
                                </Link>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{products[data]?.category}</h3>
                                    <Link href={`product/${products[data]?.slug}`} className="text-gray-900 title-font text-lg font-medium hover:text-pink-500">{products[data]?.title}</Link>
                                    <p className="mt-1">₹ {products[data]?.price}</p>
                                    {/* <p className="mt-1 uppercase">{products[data]?.size}</p> */}
                                    <div className="mt-1 uppercase">
                                        {products[data]?.size?.includes("S") && <span className='border border-gray-300 p-1 mx-1'>S</span>}
                                        {products[data]?.size?.includes("M") && <span className='border border-gray-300 p-1 mx-1'>M</span>}
                                        {products[data]?.size?.includes("L") && <span className='border border-gray-300 p-1 mx-1'>L</span>}
                                        {products[data]?.size?.includes("XL") && <span className='border border-gray-300 p-1 mx-1'>XL</span>}
                                        {products[data]?.size?.includes("XXL") && <span className='border border-gray-300 p-1 mx-1'>XXL</span>}
                                    </div>
                                    <div className="mt-1 uppercase">
                                        {products[data]?.color?.includes("red") && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none" />}
                                        {products[data]?.color?.includes("yellow") && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none" />}
                                        {products[data]?.color?.includes("black") && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none" />}
                                        {products[data]?.color?.includes("purple") && <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none" />}
                                        {products[data]?.color?.includes("white") && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none" />}
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </section>

        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process?.env?.MONGO_URL)
    }
    let products = await Product.find({ category: 'tshirt' })
    let tshirts = {}
    for (let item of products) {
        if (item.title in tshirts) {
            if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                tshirts[item.title].color.push(item.color)
            }
            if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                tshirts[item.title].size.push(item.size)
            }
        }
        else {
            tshirts[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                tshirts[item.title].color = [item.color]
                tshirts[item.title].size = [item.size]
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(tshirts)) }
    }
}

export default Tshirts
