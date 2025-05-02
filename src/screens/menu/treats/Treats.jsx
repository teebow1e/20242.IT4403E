import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function Treats() {
    const [data, setData] = useState({
        cakePops: [],
        cookiesAndBrownies: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const result = {
                cakePops: [],
                cookiesAndBrownies: []
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
        { key: 'cakePops', title: 'Cake Pops', clickable: false },
        { key: 'cookiesAndBrownies', title: 'Cookies & Brownies', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
