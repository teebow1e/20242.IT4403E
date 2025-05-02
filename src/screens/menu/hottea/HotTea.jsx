import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function HotTea() {
    const [data, setData] = useState({
        teaLatte: [],
        brewedTea: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const grouped = {
                teaLatte: [],
                brewedTea: []
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
        { key: 'teaLatte', title: 'Tea Latte', clickable: false },
        { key: 'brewedTea', title: 'Brewed Tea', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
