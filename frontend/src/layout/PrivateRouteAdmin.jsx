import { Navigate, useNavigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'
import { useAuthStore } from "../store/auth.js"
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn)()
    const access_token = Cookies.get('access_token')
    // console.log(access_token);

    if (!access_token) {
        return <Navigate to={'/admin-login'} />
    }

    const user = jwt_decode(access_token)
    // console.log(user);

    if (user.is_staff === 'false' || !user.is_staff) {
        return <Navigate to={'/admin-login'} />
    }

    return loggedIn ? <>{children}</> : <Navigate to={'/admin-login'} />
}

export default PrivateRoute
