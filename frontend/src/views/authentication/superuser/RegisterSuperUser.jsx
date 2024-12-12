import '../../authentication/user/CSS/RegisterUserForm.css';
import {Link, useNavigate} from "react-router-dom";
import  {useState, useEffect} from "react"
import { useAuthStore } from "../../../store/auth.js"
import {registersuperuser} from "../../../utils/auth.js";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast:true,
    position:"top-right",
    showConfirmButton:false,
    timer:5000,
    timerProgressBar:true,
})

function RegisterSuperUser() {

    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [national_code, setNational_code] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [ramz_shakhsi, setRamz_shakhsi] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    useEffect(() => {
        if(isLoggedIn()){
            navigate("/")
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!first_name || !last_name|| !national_code|| !phone_number|| !email|| !ramz_shakhsi|| !password|| !password2) {
            alert("تمامی فیلد ها را کامل کرده و دوباره تلاش کنید");
            setIsLoading(false);
            return;
        }

        if (password !== password2) {
            Toast.fire({
                icon: "warning",
                title: "رمزعبورها با هم مطابقت ندارد"
            })
        }

        const { error } = await registersuperuser(first_name, last_name, national_code, phone_number, email, ramz_shakhsi, password, password2);

        if (error) {
            alert(JSON.stringify(error))
        } else {
            navigate("/admin-login")
            setIsLoading(false)
        }
    };

    return (
        <>
            <bodyt>
                <section>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span>

                    <div className="signin">
                        <div className="content">
                            <h2>ثبت نام ادمین</h2>

                            <form className="form" onSubmit={handleSubmit}>
                                <div className="inputBox"><input type="text" placeholder='نام خود را وارد کنید' id="first_name" onChange={(e) => setFirst_name(e.target.value)} required/> <i>نام</i></div>

                                <div className="inputBox"><input type="text" placeholder='نام خانوادگی خود را وارد کنید' id="last_name" onChange={(e) => setLast_name(e.target.value)} required/> <i>نام خانوادگی</i></div>

                                <div className="inputBox"><input type="number" placeholder='xxxxxxxxx' id="national_code" onChange={(e) => setNational_code(e.target.value)} required/> <i>کدملی</i></div>

                                <div className="inputBox"><input type="number" placeholder='09xxxxxxxxx' id="phone_number" onChange={(e) => setPhone_number(e.target.value)} required/> <i>شماره تلفن همراه</i></div>

                                <div className="inputBox"><input type="text" placeholder='a33hth!3#' id="ramz_shakhsi" onChange={(e) => setRamz_shakhsi(e.target.value)} required/> <i>رمز شخصی</i></div>

                                <div className="inputBox"><input type="email" placeholder='azad@gmail.com' id="email" onChange={(e) => setEmail(e.target.value)} required/> <i>ایمیل</i></div>

                                <div className="inputBox"><input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required/> <i>رمزعبور</i></div>
                                <div className="inputBox"><input type="password" id="password2" onChange={(e) => setPassword2(e.target.value)} required/> <i>تکرار رمزعبور</i></div>

                                <div className="links"><Link to={"/admin-login/"}>قبلا ثبت نام کرده اید؟</Link> <Link to={"/admin-login/"}>ورود</Link></div>

                                <div className="inputBox">
                                    <input type="submit" value="ثبت نام"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </bodyt>
        </>
    )
}

export default RegisterSuperUser