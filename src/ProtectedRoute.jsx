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
        // Nếu đã đăng nhập nhưng chưa xác minh email, thì đăng xuất và chuyển hướng
        if (user && !auth.currentUser?.emailVerified) {
            console.warn("Email not verified. Signing out...");
            auth.signOut().then(() => {
                navigate("/account/signin", { replace: true });
            });
        }
    }, [user, navigate]);

    if (isAuthLoading) {
        // Nếu đang tải thông tin xác thực, không render gì cả
        return <Spinner />; // Tránh render trong khi đang tải
    }

    // Chưa đăng nhập
    if (!user) {
        return <Navigate to="/account/signin" replace />;
    }

    // Nếu đang đăng xuất sau khi chưa xác minh email, tạm không render gì cả
    if (user && !auth.currentUser?.emailVerified) {
        return null; // Tránh render trong khi `auth.signOut()` đang thực hiện
    }

    // // Không thuộc vai trò cho phép
    // if (!allowedRoles.includes(user.role)) {
    //     return <Navigate to="/unauthorized" replace />;
    // }

    // Đủ điều kiện => cho phép truy cập
    return children;
}

export default ProtectedRoute;
