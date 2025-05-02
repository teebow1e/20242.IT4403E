import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function HotCoffee() {
    const [data, setData] = useState({
        brewedCoffee: [],
        americano: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const grouped = {
                brewedCoffee: [],
                americano: []
            };

            for (const [id, prod] of Object.entries(allProducts)) {
                const item = {
                    ...prod,
                    productid: id,
                    type: prod.name,
                    image: prod.image,
                    price: prod.price
                };

                if (grouped[prod.type_id]) {
                    grouped[prod.type_id].push(item);
                }
            }

            setData(grouped);
        });

        return () => unsubscribe();
    }, []);

    const sections = [
        { key: 'brewedCoffee', title: 'Brewed Coffee', clickable: false },
        { key: 'americano', title: 'Americano', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
