import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const PRODUCTS_STORAGE_KEY = 'products_data';
const USD_TO_INR = 83.5;

const loadProductsFromStorage = () => {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

const saveProductsToStorage = (products) => {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const convertPriceToINR = (product) => ({
  ...product,
  price: Math.round(product.price * USD_TO_INR * 100) / 100,
});

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async () => {
        const cachedData = loadProductsFromStorage();
        if (cachedData) {
          return { data: cachedData };
        }

        try {
          const response = await fetch('https://fakestoreapi.com/products');
          if (!response.ok) throw new Error('Failed to fetch');
          const data = await response.json();
          const products = data.map(convertPriceToINR);
          saveProductsToStorage(products);
          return { data: products };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: error.message } };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product', id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProduct: builder.query({
      queryFn: async (id) => {
        const cachedData = loadProductsFromStorage();
        if (cachedData) {
          const product = cachedData.find((p) => p.id === id);
          if (product) return { data: product };
        }

        try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!response.ok) throw new Error('Failed to fetch');
          const data = await response.json();
          return { data: convertPriceToINR(data) };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    updateProduct: builder.mutation({
      queryFn: async ({ id, data }) => {
        const cachedData = loadProductsFromStorage();
        if (cachedData) {
          const updatedProducts = cachedData.map((p) =>
            p.id === id ? { ...p, ...data } : p
          );
          saveProductsToStorage(updatedProducts);
          return { data: updatedProducts.find((p) => p.id === id) };
        }
        return { error: { status: 'CUSTOM_ERROR', error: 'No cached data' } };
      },
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApi.util.updateQueryData('getProducts', undefined, (draft) => {
            const product = draft.find((p) => p.id === id);
            if (product) {
              Object.assign(product, data);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteProduct: builder.mutation({
      queryFn: async (id) => {
        const cachedData = loadProductsFromStorage();
        if (cachedData) {
          const updatedProducts = cachedData.filter((p) => p.id !== id);
          saveProductsToStorage(updatedProducts);
          return { data: { success: true } };
        }
        return { error: { status: 'CUSTOM_ERROR', error: 'No cached data' } };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApi.util.updateQueryData('getProducts', undefined, (draft) => {
            return draft.filter((product) => product.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
