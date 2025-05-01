// This is a service to handle order submissions to the backend API

// Dummy API URL (replace with your actual API endpoint in production)
const API_URL = 'https://starbucks-clone-api.example.com/api/orders';

export const OrderService = {
  // Submit an order to the backend
  placeOrder: async (orderData) => {
    try {
      // In a real application, this would be a real API call
      // For now, we'll just simulate a successful response

      console.log('Submitting order:', orderData);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate a successful response
      return {
        success: true,
        orderId: `ORD-${Date.now()}`,
        message: 'Order placed successfully'
      };

      // In a real application, you would make a fetch or axios call like this:
      /*
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      return await response.json();
      */
    } catch (error) {
      console.error('Error placing order:', error);
      return {
        success: false,
        message: error.message || 'Failed to place order'
      };
    }
  },

  // Get order history for a user
  getOrderHistory: async (userId) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simulate a successful response with dummy data
      return {
        success: true,
        orders: [
          {
            orderId: 'ORD-12345',
            date: '2025-04-25T14:30:00Z',
            items: [
              { type: 'Caffè Americano', quantity: 2, price: 4.95 },
              { type: 'Iced Coffee', quantity: 1, price: 3.75 }
            ],
            totalAmount: 13.65,
            status: 'Completed'
          },
          {
            orderId: 'ORD-12344',
            date: '2025-04-20T10:15:00Z',
            items: [
              { type: 'Caramel Frappuccino', quantity: 1, price: 5.45 }
            ],
            totalAmount: 5.45,
            status: 'Completed'
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching order history:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch order history'
      };
    }
  }
};

export default OrderService;
