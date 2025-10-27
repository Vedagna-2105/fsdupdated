import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products } = useAppContext();   // ✅ call the hook

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-20 mt-6'>
        {/* ✅ Render only if products exist */}
        {products && products.length > 0 ? (
          products.slice(0, 5).map((product, i) => (
            <ProductCard key={i} product={product} />
          ))
        ) : (
          <p className="text-gray-500 mt-4">No products available.</p>
        )}
      </div>
    </div>
  )
}

export default BestSeller
