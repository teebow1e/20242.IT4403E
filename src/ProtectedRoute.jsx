import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './features/UserSlice';

function ProtectedRoute({ children }) {
    const user = useSelector(selectUser);

    if (!user) {
        // Redirect to login if the user is not authenticated
        return <Navigate to="/account/signin" replace />;
    }

    // Render the children if the user is authenticated
    return children;
}

export default ProtectedRoute;