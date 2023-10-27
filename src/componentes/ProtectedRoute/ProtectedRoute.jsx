import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext/UserContext';


const ProtectedRoute = ({mustBeBedel, children }) => {

    const { isLoggedIn, esBedel } = useContext(UserContext);

    if (!isLoggedIn() || (mustBeBedel && !esBedel())) {
        return <Navigate to="/" replace />;
    }

    return children;
};
export { ProtectedRoute };