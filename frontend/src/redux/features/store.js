import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../api/apiSlice";
import authReducer from './auth/authSlice';
import favouritesReducer from '../../redux/features/favourite/favSlice.js';
import cartSliceReducer from '../../redux/features/cart/cartSlice.js';
import shopReducer from '../../redux/features/shop/shopSlice.js'
import { getFavouritesFromLocalStorage,remocveFavToLocalStorage,addFavToLocalStorage } from "../../Utils/localStorage";

const initializefavourites = getFavouritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favouritesReducer,
        cart: cartSliceReducer,
        shop: shopReducer,
    },

    preloadedState: {
        favorites: initializefavourites
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)
export default store;