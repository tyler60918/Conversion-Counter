import { Navigate } from 'react-router-dom';
import { useAuth } from '../ui/AuthContext';

function PublicRoute({ children }) {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/input" />;
    }

    return children;
}

export default PublicRoute;