import { configureStore } from "@reduxjs/toolkit";
import { phoneNumbersApi } from "../features/phone_numbers/phoneNumbersApi";
import { wabaApi } from "../features/wabas/WabasApi";

export const store = configureStore({
    reducer: {
        [phoneNumbersApi.reducerPath]: phoneNumbersApi.reducer,
        [wabaApi.reducerPath]: wabaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(phoneNumbersApi.middleware, wabaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;