import { API_URL } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log("🔍 [AuthSlice] Initializing auth API with base URL:", API_URL);

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      console.log("🔍 [AuthSlice] Preparing headers for request");
      return headers;
    },
    // Add better error handling
    validateStatus: (response, body) => {
      console.log("🔍 [AuthSlice] Response status:", response.status);
      console.log("🔍 [AuthSlice] Response body:", body);
      return response.status >= 200 && response.status < 300;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => {
        console.log("🔍 [AuthSlice] Signup mutation called with data:", data);
        return {
          url: "/api/auth/signup",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        console.log("🔍 [AuthSlice] Signup query started");
        try {
          const result = await queryFulfilled;
          console.log("✅ [AuthSlice] Signup successful:", result.data);
        } catch (error) {
          console.error("❌ [AuthSlice] Signup failed:", error);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => {
        console.log("🔍 [AuthSlice] Login mutation called with data:", data);
        return {
          url: "/api/auth/signin",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        console.log("🔍 [AuthSlice] Login query started");
        try {
          const result = await queryFulfilled;
          console.log("✅ [AuthSlice] Login successful:", result.data);
        } catch (error) {
          console.error("❌ [AuthSlice] Login failed:", error);
        }
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
