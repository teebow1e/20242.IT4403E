import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function Frappuccino() {
    const [data, setData] = useState({
        coffeeFrappuccino: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const grouped = {
                coffeeFrappuccino: []
            };

            for (const [id, prod] of Object.entries(allProducts)) {
                if (prod.type_id === 'coffeeFrappuccino') {
                    grouped.coffeeFrappuccino.push({
                        ...prod,
                        productid: id,
                        type: prod.name,
                        image: prod.image,
                        price: prod.price
                    });
                }
            }

            setData(grouped);
        });

        return () => unsubscribe();
    }, []);

    const sections = [
        {
            key: 'coffeeFrappuccino',
            title: 'Coffee Frappuccino®',
            clickable: false
        }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
