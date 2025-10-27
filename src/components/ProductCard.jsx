import { Star } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice.js';

export function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      <div className="aspect-square bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full mb-3">
          {product.category}
        </span>
        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-slate-900">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-slate-700">
              {product.rating.rate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
