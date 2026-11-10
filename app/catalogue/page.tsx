import ProductList from '@/components/product/ProductList'
import { products } from '@/data/products'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-7xl mx-auto w-full px-6 py-10 space-y-10'>
        <h1 className='text-4xl'>Produits</h1>
        <ProductList products= {products}/>
    </div>
  )
}

export default page