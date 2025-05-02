import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/UserSlice'
import cartReducer from './features/CartSlice'
import ordersReducer from './features/OrdersSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    receivedOrders: ordersReducer,
  },
})

export default store;
