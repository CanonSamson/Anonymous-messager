import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../Auth";


const PrivateRoute = () => {

    const { auth } = useUserAuth()

    return auth.currentUser ? <Outlet /> : <Navigate to="/" />

}

export default PrivateRoute;