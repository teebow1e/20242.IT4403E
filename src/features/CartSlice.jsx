import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, type, image, price = 4.95, category, customizations = {} } = action.payload;
      const existingItem = state.items.find(item => item.id === id &&
        JSON.stringify(item.customizations) === JSON.stringify(customizations));

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = Number((existingItem.quantity * existingItem.price).toFixed(2));
      } else {
        state.items.push({
          id,
          type,
          image,
          price,
          category,
          quantity: 1,
          totalPrice: price,
          customizations
        });
      }

      state.totalQuantity++;
      state.totalAmount = Number((state.totalAmount + price).toFixed(2));
    },

    removeFromCart: (state, action) => {
      const { id, customizations = {} } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id &&
        JSON.stringify(item.customizations) === JSON.stringify(customizations));

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalAmount = Number((state.totalAmount - item.totalPrice).toFixed(2));
        state.items.splice(itemIndex, 1);
      }
    },

    decreaseQuantity: (state, action) => {
      const { id, customizations = {} } = action.payload;
      const existingItem = state.items.find(item => item.id === id &&
        JSON.stringify(item.customizations) === JSON.stringify(customizations));

      if (existingItem) {
        if (existingItem.quantity === 1) {
          const itemIndex = state.items.findIndex(item => item.id === id &&
            JSON.stringify(item.customizations) === JSON.stringify(customizations));
          state.items.splice(itemIndex, 1);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = Number((existingItem.quantity * existingItem.price).toFixed(2));
        }

        state.totalQuantity--;
        state.totalAmount = Number((state.totalAmount - existingItem.price).toFixed(2));
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  }
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
