import { getDatabase, ref, set, get, query, orderByChild, equalTo } from "firebase/database";
import { auth } from "../firebase";

// Get a reference to the database
const db = getDatabase();

export const OrderService = {
  placeOrder: async (orderData) => {
    try {
      console.log('Submitting order to Firebase:', orderData);

      // Generate a timestamp for the order
      const timestamp = new Date().toISOString();
      const orderId = `ORD-${Date.now()}`;

      // Format the order data according to the specified structure
      const orderToSave = {
        items: orderData.items.map(item => ({
          name: item.type,
          quantity: item.quantity,
          price: item.price,
          customizations: item.customizations || {}
        })),
        userId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
        customer: orderData.customer,
        paymentMethod: orderData.paymentMethod,
        deliveryAddress: orderData.deliveryAddress || null,
        totalAmount: orderData.totalAmount,
        timestamp: timestamp,
        finished: false // Default to NO as requested
      };

      console.log(orderToSave);

      // Create a reference to the specific order in the 'orders' node
      const orderRef = ref(db, `orders/${orderId}`);

      // Write the order data to Firebase
      await set(orderRef, orderToSave);

      return {
        success: true,
        orderId: orderId,
        message: 'Order placed successfully',
        orderDetails: orderToSave
      };
    } catch (error) {
      console.error('Error placing order:', error);
      return {
        success: false,
        message: error.message || 'Failed to place order'
      };
    }
  },

  // Get order history for a user from Firebase
  getOrderHistory: async (userId = null) => {
    try {
      // Use current authenticated user if userId not provided
      if (!userId && auth.currentUser) {
        userId = auth.currentUser.uid;
      }

      if (!userId) {
        throw new Error('User ID is required to fetch order history');
      }

      // Query orders by userId
      const ordersRef = ref(db, 'orders');
      const userOrdersQuery = query(
        ordersRef,
        orderByChild('userId'),
        equalTo(userId)
      );

      const snapshot = await get(userOrdersQuery);

      if (!snapshot.exists()) {
        return {
          success: true,
          orders: []
        };
      }

      // Convert the snapshot to an array of orders
      const orders = [];
      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();

        orders.push({
          orderId: key,
          date: data.timestamp,
          items: data.items,
          totalAmount: data.totalAmount,
          status: data.finished ? 'Completed' : 'Pending',
          customer: data.customer
        });
      });

      // Sort orders by date (most recent first)
      orders.sort((a, b) => new Date(b.date) - new Date(a.date));

      return {
        success: true,
        orders: orders
      };
    } catch (error) {
      console.error('Error fetching order history:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch order history'
      };
    }
  },

  // Get a single order by ID
  getOrderById: async (orderId) => {
    try {
      const orderRef = ref(db, `orders/${orderId}`);
      const snapshot = await get(orderRef);

      if (!snapshot.exists()) {
        throw new Error(`Order with ID ${orderId} not found`);
      }

      const data = snapshot.val();

      return {
        success: true,
        order: {
          orderId: orderId,
          date: data.timestamp,
          items: data.items,
          totalAmount: data.totalAmount,
          status: data.finished ? 'Completed' : 'Pending',
          customer: data.customer,
          deliveryAddress: data.deliveryAddress,
          paymentMethod: data.paymentMethod
        }
      };
    } catch (error) {
      console.error('Error fetching order:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch order'
      };
    }
  },

  // Mark an order as completed/fulfilled (for waiters)
  updateOrderStatus: async (orderId, markAsCompleted = true) => {
    try {
      // Update just the 'finished' field
      await set(ref(db, `orders/${orderId}/finished`), markAsCompleted);

      return {
        success: true,
        message: markAsCompleted ? 'Order marked as completed' : 'Order marked as pending'
      };
    } catch (error) {
      console.error('Error updating order:', error);
      return {
        success: false,
        message: error.message || 'Failed to update order'
      };
    }
  }
};

export default OrderService;
