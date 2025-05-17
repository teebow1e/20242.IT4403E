import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function Snacks() {
    const [data, setData] = useState({
        proteinAndSnackBars: [],
        saltySnacks: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const result = {
                proteinAndSnackBars: [],
                saltySnacks: []
            };

            for (const [id, prod] of Object.entries(allProducts)) {
                const item = {
                    ...prod,
                    productid: id,
                    type: prod.name,
                    image: prod.image,
                    price: prod.price
                };

                if (result[prod.type_id]) {
                    result[prod.type_id].push(item);
                }
            }

            setData(result);
        });

        return () => unsubscribe();
    }, []);

    const sections = [
        { key: 'proteinAndSnackBars', title: 'Protein & Snack Bars', clickable: false },
        { key: 'saltySnacks',         title: 'Salty Snacks',         clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
