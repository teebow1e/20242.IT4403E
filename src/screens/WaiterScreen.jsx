import React, {useEffect} from 'react';
import { 
    selectOrders,
    addOrder,
    removeOrder,
    updateOrderStatus
} from "../features/OrdersSlice";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "../components/OrderCard";

function WaiterScreen() {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);

    const onCancel = (order) => {
        dispatch(removeOrder({ id: order.id }));
        console.log("Order: ", order);
        console.log("Order cancelled:", order.id);
    }
    const onSuccess = (order) => {
        dispatch(updateOrderStatus({ id: order.id, status: true }));
        // dispatch(removeOrder({ id: order.id }));
        console.log("Order marked as success:", order.id);
    }

    // Add tests
    useEffect(() => {
        console.log("Dispatching test orders...");
        dispatch (
            addOrder({
                id: 1,
                items: [
                    { id: 1, type: "Eggs & Gouda Protein Box", image: "https://globalassets.starbucks.com/digitalassets/products/food/SBX20221206_EggsGoudaProteinBox.jpg?impolicy=1by1_tight_288", price: 50, quantity: 1, totalPrice: 50, customizations: {}},
                    { id: 2, type: "Cheese & Fruit Protein Box", image: "https://globalassets.starbucks.com/digitalassets/products/food/SBX20221206_CheeseFruitProteinBox.jpg?impolicy=1by1_tight_288", price: 25, quantity: 2, totalPrice: 50, customizations: {}},
                ],
                totalAmount: 100,
                user: {
                    id: 1,
                    displayName: "John Doe",
                },
                time: new Date().toISOString(),
                done: false,
            }) 
        );
        dispatch (
            addOrder({
                id: 2,
                items: [
                    { type: "Eggs & Gouda Protein Box", image: "https://globalassets.starbucks.com/digitalassets/products/food/SBX20221206_EggsGoudaProteinBox.jpg?impolicy=1by1_tight_288", price: 50, quantity: 1, totalPrice: 50, customizations: {}},
                    { type: "Cheddar & Uncured Salami Protein Box", image: "https://globalassets.starbucks.com/digitalassets/products/food/SBX20221206_CheddarUncuredSalamiProteinBox.jpg?impolicy=1by1_tight_288", price: 100, quantity: 1, totalPrice: 100, customizations: {}},
                    { type: "Cheese & Fruit Protein Box", image: "https://globalassets.starbucks.com/digitalassets/products/food/SBX20221206_CheeseFruitProteinBox.jpg?impolicy=1by1_tight_288", price: 25, quantity: 2, totalPrice: 50, customizations: {}},
                ],
                totalAmount: 200,
                user: {
                    id: 1,
                    displayName: "Nguyen",
                },
                time: new Date().toISOString(),
                done: false,
            }) 
        );           
    }, [dispatch]);

    console.log("Orders fetched from Redux:", orders);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Received Orders</h1>
            {/* Hiển thị list các order */}
            {orders.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl mb-6">No orders received</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} onCancel={onCancel} onSuccess={onSuccess} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default WaiterScreen;