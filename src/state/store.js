import { configureStore } from "@reduxjs/toolkit";
import plansReducer from "./plansSlice";

export const store = configureStore({
    reducer: {
        plans: plansReducer,
    },
});
export const state = store.getState;
export const dispatch = store.dispatch;
