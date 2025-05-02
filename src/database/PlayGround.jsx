import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export default function PlayGround() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = onValue(ref(db, 'products'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsed = Object.entries(data).map(([id, item]) => ({
                    id,
                    ...item
                }));
                setProducts(parsed);
            } else {
                setProducts([]);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">📦 Product Table from Firebase</h2>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">Product ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Price (₫)</th>
                        <th className="border px-4 py-2">Type</th>
                        <th className="border px-4 py-2">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id}>
                            <td className="border px-4 py-1">{prod.id}</td>
                            <td className="border px-4 py-1">{prod.name}</td>
                            <td className="border px-4 py-1">{prod.price}</td>
                            <td className="border px-4 py-1">{prod.type_id}</td>
                            <td className="border px-4 py-1">
                                <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="h-10 w-10 object-contain"
                                />
                            </td>
                        </tr>
                    ))}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={5} className="border text-center py-4 text-gray-500">
                                No products found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
