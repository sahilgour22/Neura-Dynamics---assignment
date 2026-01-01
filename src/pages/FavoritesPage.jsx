import { useAppSelector, useAppDispatch } from '../store/hooks'
import { selectFavorites } from '../store/selectors'
import { removeFromFavorites } from '../store/slices/favoritesSlice'
import ProductCard from '../components/ProductCard'

function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites)
  const dispatch = useAppDispatch()

  const handleRemove = (productId) => {
    dispatch(removeFromFavorites(productId))
  }

  if (favorites.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Favorites</h1>
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">
            You haven't added any favorites yet.
          </p>
          <p className="text-gray-500">
            Browse products and add them to your favorites!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Favorites ({favorites.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            <button
              onClick={() => handleRemove(product.id)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
              aria-label={`Remove ${product.title} from favorites`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage

