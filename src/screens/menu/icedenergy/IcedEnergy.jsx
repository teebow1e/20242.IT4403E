import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function IcedEnergy() {
    const [data, setData] = useState({
        icedEnergy: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const grouped = {
                icedEnergy: []
            };

            for (const [id, prod] of Object.entries(allProducts)) {
                if (prod.type_id === 'icedEnergy') {
                    grouped.icedEnergy.push({
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
        { key: 'icedEnergy', title: 'Iced Energy', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
