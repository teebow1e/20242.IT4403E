import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase'; 
import SectionedMenu from '../MenuSubItem';

export default function ShoppingBag() {
    const [shoppingBagItems, setShoppingBagItems] = useState([]);

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};
            const filtered = Object.entries(allProducts)
                .filter(([_, prod]) => prod.type_id === 'shoppingBag')
                .map(([id, prod]) => ({
                    ...prod,
                    productid: id,
                    type: prod.name,
                    image: prod.image,
                    price: prod.price
                }));

            setShoppingBagItems(filtered);
        });

        return () => unsubscribe(); // cleanup listener
    }, []);

    const data = {
        shoppingBag: shoppingBagItems
    };

    const sections = [
        { key: 'shoppingBag', title: 'Shopping Bag', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
