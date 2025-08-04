import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./slices/authSlice";

console.log("🔍 [Store] Initializing Redux store");

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    console.log("🔍 [Store] Configuring middleware");
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
