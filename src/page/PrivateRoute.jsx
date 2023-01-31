import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../Auth";


const PrivateRoute = () => {

    const { userD } = useUserAuth()

    return userD ? <Outlet /> : <Navigate to="/" />

}

export default PrivateRoute;