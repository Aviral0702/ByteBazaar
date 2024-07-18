// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/themeSlice';
import productReducer from './product/productSlice';
import listingsReducer from './listing/listingSlice';
import cartReducer from './cart/cartSlice';

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    listings: listingsReducer,
    cart: cartReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);