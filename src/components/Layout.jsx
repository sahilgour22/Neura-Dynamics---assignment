import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectFavorites } from '../store/selectors'

function Layout({ children }) {
  const favorites = useAppSelector(selectFavorites)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-800"
            >
              Product Dashboard
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link
                to="/favorites"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium relative"
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout

