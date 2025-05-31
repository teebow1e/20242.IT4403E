import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import userReducer from './features/UserSlice'
import cartReducer from './features/CartSlice'
import receiptReducer from './features/ReceiptSlice'

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'totalQuantity', 'totalAmount']
}

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer)

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: persistedCartReducer,
    receipt: receiptReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)
export default store
