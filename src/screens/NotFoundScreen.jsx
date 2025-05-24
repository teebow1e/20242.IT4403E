import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/UserSlice';
import { getRedirectByRole } from '../utils/RoleBasedRedirect';

function NotFoundScreen() {
    const user = useSelector(selectUser);
    return (
        <div>
            <div className="flex flex-col justify-center items-center h-screen bg-white">
                <h1 className="text-6xl font-bold text-black mb-4">404</h1>
                <p className="text-2xl text-gray-700">Page Not Found</p>
                
            </div>
            <div className="w-full flex justify-center items-center mt-8 mx-auto max-w-[300px]">
                    <Link
                    to={getRedirectByRole(user?.role)}
                    className="inline-block bg-transparent border border-solid rounded-full no-underline text-[#00653e] font-semibold text-sm py-1 px-4 leading-relaxed hover:bg-[rgba(0,86,62,0.06)]"
                    >
                    Go back
                    </Link>
                </div>
        </div>
        
    );
}

export default NotFoundScreen;