import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../Auth";


const PrivateRoute = () => {

    const currentUser = useUserAuth()

    return currentUser ? <Outlet /> : <Navigate to="/signup" />

}

export default PrivateRoute;