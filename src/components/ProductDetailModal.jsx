import { useState } from 'react';
import { X, Star, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useGetProductQuery, useUpdateProductMutation, useDeleteProductMutation } from '../store/productsApi.js';
import { ConfirmDialog } from './ConfirmDialog.jsx';
import { EditProductForm } from './EditProductForm.jsx';
import { formatPrice } from '../utils/formatPrice.js';

export function ProductDetailModal({ productId, onClose }) {
  const { data: product, isLoading, error } = useGetProductQuery(productId);
  const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting, error: deleteError }] = useDeleteProductMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(productId).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8">
          <Loader2 className="w-12 h-12 text-slate-900 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center">
          <p className="text-red-600 mb-4">Failed to load product details</p>
          <button
            onClick={onClose}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <EditProductForm
        product={product}
        onClose={() => setIsEditing(false)}
        onSave={async (data) => {
          await updateProduct({ id: productId, data }).unwrap();
          setIsEditing(false);
        }}
        isSaving={isUpdating}
      />
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Product Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-xl p-8 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-96 object-contain"
                />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full mb-4">
                  {product.category}
                </span>

                <h3 className="text-3xl font-bold text-slate-900 mb-4">{product.title}</h3>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-slate-900">{formatPrice(product.price)}</span>
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg">
                    <Star className="w-5 h-5 text-amber-500 fill-current" />
                    <span className="font-semibold text-slate-900">{product.rating.rate}</span>
                    <span className="text-slate-600">({product.rating.count} reviews)</span>
                  </div>
                </div>

                <div className="prose prose-slate mb-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Description</h4>
                  <p className="text-slate-600 leading-relaxed">{product.description}</p>
                </div>

                <div className="flex gap-3 pt-6 border-t border-slate-200">
                  <button
                    onClick={() => setIsEditing(true)}
                    disabled={isUpdating}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit Product
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isDeleting}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Product
                  </button>
                </div>

                {updateError && (
                  <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    Failed to update product. Please try again.
                  </div>
                )}

                {deleteError && (
                  <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    Failed to delete product. Please try again.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete Product"
          message={`Are you sure you want to delete "${product.title}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}
