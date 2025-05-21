import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './features/UserSlice';
import { auth } from './firebase';

function ProtectedRoute({ children, allowedRoles }) {
    const user = useSelector(selectUser);
    console.log("User in ProtectedRoute:", user);

    if (!user) {
        console.log("hi");
        return <Navigate to="/account/signin" replace />;
    }

    if (!auth.currentUser?.emailVerified) {
        console.log("hi1");
        auth.signOut();
        return <Navigate to="/account/signin" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        console.log("Unauthorized access attempt by user:", user);
        return <Navigate to="/unauthorized" replace />;
    }
    console.log("hi3");

    return children;
}

export default ProtectedRoute;