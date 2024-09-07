 
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://online-nursery-server-blue.vercel.app/api" }),
  tagTypes: ["products", "categories","orders"],
  endpoints: (builder) => ({
    getProducts: builder.query ({
      query: () => ({
        method : "GET",
        url : "/products"
      }),
      providesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          method: "POST",
          url: "/products/create-product",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/products/${id}`,
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/products/${id}`,
      }),
      invalidatesTags: ["products"],
    }),
    getASingleProduct: builder.query ({
      query: ({ id } ) => ({
        method : "GET",
        url : `/products/${id}`
      }),
      providesTags: ["products"],
    }),
    getAllProductsCategories: builder.query({
      query: (name: string) => {
        const formattedName = decodeURIComponent(name); // Decodes '%20' to spaces
        return {
          method: "GET",
          url: `/products?&category=${formattedName}`,
        };
      },
      providesTags: ["products", "categories"],
    }),
    
    
    
    
    getCategories: builder.query ({
      query: () => ({
        method : "GET",
        url : "/categories"
      }),
      providesTags: ["categories"],
    }),
   
    addCategory: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          method: "POST",
          url: "/categories/create-category",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },  
      invalidatesTags: ["categories"],
    }),
    getOrders: builder.query ({
      query: () => ({
        method : "GET",
        url : "/orders"
      }),
      providesTags: ["orders"],
    }),
    addOrder: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          method: "POST",
          url: "/orders/create-order",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetProductsQuery,useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation, useGetASingleProductQuery,useGetAllProductsCategoriesQuery, useGetCategoriesQuery, useAddCategoryMutation ,useGetOrdersQuery, useAddOrderMutation } = baseApi;
