import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function Bakery() {
    const [data, setData] = useState({
        croissantsAndDanishes: [],
        loavesAndCakes: [],
        muffinsSconesAndDoughnuts: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const grouped = {
                croissantsAndDanishes: [],
                loavesAndCakes: [],
                muffinsSconesAndDoughnuts: []
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
        { key: 'croissantsAndDanishes', title: 'Croissants & Danishes', clickable: false },
        { key: 'loavesAndCakes', title: 'Loaves & Cakes', clickable: false },
        { key: 'muffinsSconesAndDoughnuts', title: 'Muffins, Scones & Doughnuts', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
