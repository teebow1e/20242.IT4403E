import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthLoading } from './features/UserSlice';
import { auth } from './firebase';
import { useEffect } from 'react';
import Spinner from './components/Spinner';

function ProtectedRoute({ children, allowedRoles }) {
    const user = useSelector(selectUser);
    const isAuthLoading = useSelector(selectIsAuthLoading);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !auth.currentUser?.emailVerified) {
            console.warn("Email not verified. Signing out...");
            auth.signOut().then(() => {
                navigate("/account/signin", { replace: true });
            });
        }
    }, [user, navigate]);

    if (isAuthLoading) {
        return <Spinner />;
    }

    if (!user) {
        return <Navigate to="/account/signin" replace />;
    }

    if (user && !auth.currentUser?.emailVerified) {
        return null;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;
