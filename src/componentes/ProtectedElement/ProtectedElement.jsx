import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

const ProtectedElement = ({mustBeBedel, mustBeDecano, children }) => {

    const { isLoggedIn, esBedel, esDecano } = useContext(UserContext);

    if (!isLoggedIn() || (mustBeBedel && !esBedel())) {
        return <></>;
    }

    if (!isLoggedIn() || (mustBeDecano && !esDecano())) {
        return <></>;
    }
    return children;
};
export { ProtectedElement };