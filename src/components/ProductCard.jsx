import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      aria-label={`View details for ${product.title}`}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain p-4"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-2xl font-bold text-indigo-600 mb-2">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 capitalize mb-2">
          {product.category}
        </p>
        <div className="mt-auto">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {product.rating?.rate || 'N/A'} ⭐ ({product.rating?.count || 0})
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

