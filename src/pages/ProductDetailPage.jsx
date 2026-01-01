import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchProductById, clearSelectedProduct } from '../store/slices/productsSlice'
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice'
import { selectSelectedProduct, selectIsFavorite } from '../store/selectors'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const product = useAppSelector(selectSelectedProduct)
  const loading = useAppSelector((state) => state.products.loading)
  const error = useAppSelector((state) => state.products.error)
  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, parseInt(id))
  )

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }

    return () => {
      dispatch(clearSelectedProduct())
    }
  }, [id, dispatch])

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(parseInt(id)))
    } else {
      dispatch(addToFavorites(product))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading product...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="text-xl text-red-600 mb-4">
          {error || 'Product not found'}
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Product Image */}
        <div className="flex items-center justify-center bg-gray-100 rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full h-auto max-h-96 object-contain p-8"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>

          <div className="mb-4">
            <span className="text-4xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {product.rating?.rate || 'N/A'} ⭐ ({product.rating?.count || 0}{' '}
              reviews)
            </span>
            <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 capitalize">
              {product.category}
            </span>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleToggleFavorite}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                isFavorite
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage

