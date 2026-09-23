import {Navigate, Outlet, useOutletContext} from 'react-router-dom';
import {useAuth} from '../components/AuthContext';

const ProtectedRoute = () => {
    const {user, loading} = useAuth();

    const context = useOutletContext();

    if (loading) {
        return <div style={{padding: '2rem'}}>Verifying session...</div>;
    }
    return user ? <Outlet context={context}/> : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;