import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";


// configuración para conectar a firebase
export const shopApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories.json`
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res)
        return transformedResponse;
      }
    }),
    getProductById: builder.query({
      // Los numeros no necesitan comillas dobles
      query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res)
        if(transformedResponse.length) return transformedResponse[0];
      }
    })
  })
})

// Exportación de los hooks personalizados por React Toolkit Query
export const {useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery} = shopApi