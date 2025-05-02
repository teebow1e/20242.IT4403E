import React from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';       

function PlayGround() {
    React.useEffect(() => {
        set(ref(db, 'test'), { hello: 'world' })
            .then(() => console.log('✅ write succeeded'))
            .catch(console.error);
    }, []);  

    return (
        <div className="p-6 text-center">
            Open the browser console & the Firebase console → Realtime DB.
            You should see the <code>test/hello</code> node appear.
        </div>
    );
}

export default PlayGround;