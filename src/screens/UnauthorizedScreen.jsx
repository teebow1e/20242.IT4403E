import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/UserSlice';
import { getRedirectByRole } from '../utils/RoleBasedRedirect';

function UnauthorizedScreen() {
    const user = useSelector(selectUser);
    return (
        <div>
            <div className="grid place-items-center w-full h-full text-sm mt-8 mb-8">
                <h1 className="text-[32px] font-bold text-[#e75b52] text-center">403 - Access Denied</h1>
                <p className="text-sm text-gray-600 mt-2 text-center">You do not have permission to access this page.</p>
            </div>

            <div className="w-full flex justify-center items-center mt-8 mx-auto max-w-[300px]">
                <Link to={getRedirectByRole(user.role)} className="inline-block bg-transparent border border-solid rounded-full no-underline text-[#00653e] font-semibold text-sm py-1 px-4 leading-relaxed hover:bg-[rgba(0,86,62,0.06)]">
                    Go back
                </Link>
            </div>
        </div>
    );
}

export default UnauthorizedScreen;
