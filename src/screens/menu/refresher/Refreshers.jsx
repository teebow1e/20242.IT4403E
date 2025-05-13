import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function Refreshers() {
    const [data, setData] = useState({
        lemonadeRefreshers: [],
        coconutmilkRefreshers: [],
        refreshers: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const grouped = {
                lemonadeRefreshers: [],
                coconutmilkRefreshers: [],
                refreshers: []
            };

            for (const [id, prod] of Object.entries(allProducts)) {
                if (grouped[prod.type_id]) {
                    grouped[prod.type_id].push({
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
        { key: 'lemonadeRefreshers', title: 'Lemonade Refreshers', clickable: false },
        { key: 'coconutmilkRefreshers', title: 'Coconutmilk Refreshers', clickable: false },
        { key: 'refreshers', title: 'Refreshers', clickable: false }
    ];

    return <SectionedMenu data={data} sections={sections} />;
}
