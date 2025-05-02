import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function Breakfast() {
    const [data, setData] = useState({
        breakfastSandwiches: [],
        breakfastWraps: [],
        eggBitesAndBakes: [],
        oatmealAndYogurt: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const grouped = {
                breakfastSandwiches: [],
                breakfastWraps: [],
                eggBitesAndBakes: [],
                oatmealAndYogurt: []
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
        { key: 'breakfastSandwiches', title: 'Breakfast Sandwiches', clickable: false },
        { key: 'breakfastWraps', title: 'Breakfast Wraps', clickable: false },
        { key: 'eggBitesAndBakes', title: 'Egg Bites & Bakes', clickable: false },
        { key: 'oatmealAndYogurt', title: 'Oatmeal & Yogurt', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
