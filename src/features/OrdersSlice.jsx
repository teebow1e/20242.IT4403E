import {createSlice} from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
    name: 'receivedOrders',
    initialState: {
        orders: [],
    },
    reducers: {
        addOrder: (state, action) => {
          const { id, items, totalAmount, user, time, done = false } = action.payload;
          state.orders.push({
            id,
            items,
            totalAmount,
            user, // e.g., { id: 1, displayName: 'John Doe' }
            time, // e.g., '2023-10-01T12:00:00Z'
            done, // e.g., false, true
          });
        },
    
        updateOrderStatus: (state, action) => {
          const { id, status } = action.payload;
          console.log("Updating order status:", id, status);
          const order = state.orders.find(order => order.id === id);
          if (order) {
            order.done = status;
          }
        },
    
        removeOrder: (state, action) => {
          const { id } = action.payload;
          const orderIndex = state.orders.findIndex(order => order.id === id);
          if (orderIndex >= 0) {
            state.orders.splice(orderIndex, 1);
          }
        },
    },
});

export const { addOrder, removeOrder, updateOrderStatus } = ordersSlice.actions;

// Selectors
export const selectOrders = (state) => state.receivedOrders.orders;

export default ordersSlice.reducer;
