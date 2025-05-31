import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function MeowbucksReserve() {
    const [data, setData] = useState({
        meowbucksReserve: [],
        blondeRoast: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const result = {
                meowbucksReserve: [],
                blondeRoast: []
            };

            Object.entries(allProducts).forEach(([id, prod]) => {
                const item = {
                    ...prod,
                    productid: id,
                    type: prod.name,
                    image: prod.image,
                    price: prod.price
                };

                switch (prod.type_id) {
                    case 'meowbucksReserve':
                        result.meowbucksReserve.push(item);
                        break;
                    case 'blondeRoast':
                        result.blondeRoast.push(item);
                        break;
                    default:
                        break;
                }
            });

            setData(result);
        });

        return () => unsubscribe();
    }, []);

    const sections = [
        { key: 'meowbucksReserve', title: 'Meowbucks Reserve®', clickable: false },
        { key: 'blondeRoast', title: 'Blonde Roast', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
