import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import SectionedMenu from '../MenuSubItem';

export default function ProteinBoxes() {
    const [data, setData] = useState({
        proteinBoxes: []
    });

    useEffect(() => {
        const productsRef = ref(db, 'products');

        const unsubscribe = onValue(productsRef, (snapshot) => {
            const allProducts = snapshot.val() || {};

            const result = {
                proteinBoxes: []
            };

            for (const [id, prod] of Object.entries(allProducts)) {
                if (prod.type_id === 'proteinBoxes') {
                    result.proteinBoxes.push({
                        ...prod,
                        productid: id,
                        type: prod.name,
                        image: prod.image,
                        price: prod.price
                    });
                }
            }

            setData(result);
        });

        return () => unsubscribe();
    }, []);

    const sections = [
        { key: 'proteinBoxes', title: 'Protein Boxes', clickable: false }
    ];

    return (
        <SectionedMenu
            data={data}
            sections={sections}
        />
    );
}
