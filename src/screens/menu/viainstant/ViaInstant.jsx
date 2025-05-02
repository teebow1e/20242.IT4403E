import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function VIAInstant() {
    const [data, setData] = useState({
        flavored: [],
        blondeRoast: [],
        mediumRoast: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const result = {
                flavored: [],
                blondeRoast: [],
                mediumRoast: []
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
        { key: 'flavored', title: 'Flavored', clickable: false },
        { key: 'blondeRoast', title: 'Blonde Roast', clickable: false },
        { key: 'mediumRoast', title: 'Medium Roast', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
