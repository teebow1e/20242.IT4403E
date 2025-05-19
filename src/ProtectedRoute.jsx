import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './features/UserSlice';
import { auth } from './firebase';

function ProtectedRoute({ children, allowedRole }) {
    const user = useSelector(selectUser);

    if (!user) {
        return <Navigate to="/account/signin" replace />;
    }

    if (!auth.currentUser?.emailVerified) {
        auth.signOut();
        return <Navigate to="/account/signin" replace />;
    }

    if (allowedRole && !allowedRole.includes(user.role)) {
        return <Navigate to="/account/signin" replace />;
    }

    return children;
}

export default ProtectedRoute;