/* eslint-disable react/prop-types */
import { Redirect } from "react-router";

const ProtectedRoutes: React.FC = () => {
  return (
        <>
            <Redirect to ="/login" />
        </>
    );
};
    
export default ProtectedRoutes;
