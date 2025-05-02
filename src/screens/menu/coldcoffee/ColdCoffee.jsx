import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function ColdCoffee() {
    const [data, setData] = useState({
        nitroColdBrew: [],
        icedCoffee: [],
        icedShakenEspresso: [],
        icedMocha: [],
        icedMacchiato: [],
        icedFlatWhite: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const grouped = {
                nitroColdBrew: [],
                icedCoffee: [],
                icedShakenEspresso: [],
                icedMocha: [],
                icedMacchiato: [],
                icedFlatWhite: []
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
        { key: 'nitroColdBrew', title: 'Nitro Cold Brew', clickable: false },
        { key: 'icedCoffee', title: 'Iced Coffee', clickable: false },
        { key: 'icedShakenEspresso', title: 'Iced Shaken Espresso', clickable: false },
        { key: 'icedMocha', title: 'Iced Mocha', clickable: false },
        { key: 'icedMacchiato', title: 'Iced Macchiato', clickable: false },
        { key: 'icedFlatWhite', title: 'Iced Flat White', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
