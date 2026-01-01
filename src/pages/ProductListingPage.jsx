import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchProducts } from '../store/slices/productsSlice'
import { selectFilteredProducts } from '../store/selectors'
import SearchAndFilter from '../components/SearchAndFilter'
import ProductCard from '../components/ProductCard'

function ProductListingPage() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectFilteredProducts)
  const loading = useAppSelector((state) => state.products.loading)
  const error = useAppSelector((state) => state.products.error)

  useEffect(() => {
    // Only fetch if we don't have products yet
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="text-xl text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
      <SearchAndFilter />
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductListingPage

