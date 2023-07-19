import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { login } from '../features/auth/authSlice';


const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user && !isLoading) {
            const token = localStorage.getItem('token');
            if (token) {
                dispatch(login({ token }));
            }
        }
    }, [dispatch, user, isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return children;
    } else {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
};

export default PrivateRoute;