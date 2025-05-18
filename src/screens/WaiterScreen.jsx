import {useEffect, useState} from 'react';
import OrderCard from "../components/OrderCard";
import { OrderService } from "../services/OrderService";
import { onChildAdded, ref, off } from 'firebase/database';
import { db } from "../firebase";

function WaiterScreen() {
    const [loading, setLoading] = useState(false);
    const [unfinishedOrders, setUnfinishedOrders] = useState([]);

    useEffect(() => {
        if (unfinishedOrders.length == 0) {
            setLoading(true);
        }
        const fetchUnfinishedOrders = async () => {
            try {
                const response = (await OrderService.getUnfinishedOrders());
                setLoading(false);
                if (response.success) {
                    setUnfinishedOrders(response.orders);
                } else {
                    console.error("Error:", response.message);
                }
            } catch (error) {
                setLoading(false);
                console.error("Error fetching unfinished orders:", error);
            }
        };
        fetchUnfinishedOrders();
    }, []);

    useEffect(() => {
        const ordersRef = ref(db, "orders");
        const handleNewOrder = (snapshot) => {
            const id = snapshot.key;
            const value = snapshot.val();
            if (value.finished !== "Pending") return;
            const newOrder = { id, ...value };

            setUnfinishedOrders((unfinishedOrders) => {
            // Tránh thêm trùng đơn hàng
            const exists = unfinishedOrders.some(order => order.id === newOrder.id);
            if (exists) return unfinishedOrders;
                return [...unfinishedOrders, newOrder];
            });
        }
        onChildAdded(ordersRef, handleNewOrder);

        // Cleanup khi component unmount (rời màn hình)
        return () => {
            off(ordersRef, "child_added", handleNewOrder);
        };
    });

    const onCancel = async(order) => {
        setUnfinishedOrders((unfinishedOrders) =>
            unfinishedOrders.filter(o => o.id !== order.id)
        );
        // Gọi API để hủy đơn hàng
        try {
            const response = await OrderService.updateOrderStatus(order.id, "Canceled");
            if (response.success) {
                console.log("Order cancelled successfully:", order.id);
            } else {
                console.error("Error cancelling order:", response.message);
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    }
    const onSuccess = async (order) => {
        try {
            const response = await OrderService.updateOrderStatus(order.id, "Completed");
            if (response.success) {
                setUnfinishedOrders((unfinishedOrders) =>
                    unfinishedOrders.filter(o => o.id !== order.id)
                );
                console.log("Order marked as completed:", order.id);
            } else {
                console.error("Error:", response.message);
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Received Orders</h1>
            {/* Hiển thị list các order */}
            {console.log("Unfinished orders:", unfinishedOrders)}
            {loading && (
                <div className="text-center">
                    <p className="text-xl mb-6">Loading pending orders...</p>
                </div>
            )}
            {unfinishedOrders.length === 0 && !loading
                ? 
                (
                <div className="text-center">
                    <p className="text-xl mb-6">No orders received</p>
                </div>
                )
                : 
                (
                <div className="flex flex-col gap-4">
                    {unfinishedOrders.map((order) => (
                        <OrderCard orderId={order.id} order={order} onCancel={onCancel} onSuccess={onSuccess} />
                    ))}
                </div>
                )
            }
        </div>
    )
}

export default WaiterScreen;