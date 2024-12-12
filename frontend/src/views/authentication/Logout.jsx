import {useEffect} from "react"
import {logout} from "../../utils/auth.js";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";


const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})

function Logout() {

    const navigate = useNavigate()

    useEffect(() => {
        logout()
        navigate('/')
        Toast.fire({
            icon: "success",
            title: "با موفقیت از حساب کاربری خود خارج شدید"
        })
    }, []);

    return (
        <div></div>
    )
}

export default Logout