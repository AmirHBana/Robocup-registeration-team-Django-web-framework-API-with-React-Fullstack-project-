import {Link, useNavigate} from "react-router-dom";
import '../user/CSS/RegisterUserForm.css';
import {useEffect, useState} from "react"
import { useAuthStore } from "../../../store/auth.js"
import {forgetpassword} from "../../../utils/auth.js";

import chap1 from '../../../assets/chap/51515.jpg'
import chap2 from '../../../assets/chap/4NV3A.jpg'
import chap3 from '../../../assets/chap/9M4BP.jpg'
import chap6 from '../../../assets/chap/SKARD.jpg'
import chap7 from '../../../assets/chap/TK58P.jpg'
import chap4 from '../../../assets/chap/25.png'
import chap5 from '../../../assets/chap/0034523.jpeg'
import chap8 from '../../../assets/chap/TTC2J.png'
import chap9 from '../../../assets/chap/6345262.jpeg'
import chap10 from '../../../assets/chap/W68HP.png'
import chap11 from '../../../assets/chap/AAXUE.webp'
import chap12 from '../../../assets/chap/263S2V.webp'
import chap13 from '../../../assets/chap/Eps10vecTor.webp'
import chap14 from '../../../assets/chap/mwxe2.webp'
import chap15 from '../../../assets/chap/JIC22U.webp'
import chap16 from '../../../assets/chap/RENAJIX.webp'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})
const images = [chap1, chap2, chap3, chap6, chap7, chap4, chap5, chap8, chap9, chap10, chap11, chap12, chap13, chap14, chap15, chap16];

function ForgetPasswordUser() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [captchaInput, setCaptchaInput] = useState("");

    const [national_code, setNational_code] = useState("")
    const [username, setPhone_number] = useState("")
    const [email, setEmail] = useState("")
    const [password2, setPassword] = useState("")
    const [password3, setPassword2] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)


    useEffect(() => {
        if(isLoggedIn()){
            navigate("/")
        }
    }, [])

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setSelectedImage(images[randomIndex]);
    };

    useEffect(() => {
        getRandomImage();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!national_code || !username|| !email|| !password2|| !password3) {
            alert("تمامی فیلد ها را کامل کرده و دوباره تلاش کنید");
            setIsLoading(false);
            return;
        }

        if (password2 !== password3) {
            Toast.fire({
                icon: "warning",
                title: "رمزعبورها با هم مطابقت ندارد"
            })
        }

        if (!selectedImage || !captchaInput) {
            Toast.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select the correct image from the captcha',
            });
            setIsLoading(false);
            return;
        }

        const imageCode = selectedImage.split("/").pop().split(".")[0];
        if (captchaInput !== imageCode) {
            Toast.fire({
                icon: 'warning',
                title: 'کپچا را بادقت وارد کنید',
            });
            getRandomImage()
            setIsLoading(true);
            return;
        }

        const { error } = await forgetpassword(national_code, username, email, password2, password3);

        if (error) {
            alert(JSON.stringify(error))
        } else {
            navigate("/login")
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
                            <h2>فراموشی رمز عبور</h2>

                            <form className="form" onSubmit={handleSubmit}>

                                <div className="inputBox"><input type="number" placeholder='xxxxxxxxx'
                                                                 id="national_code"
                                                                 onChange={(e) => setNational_code(e.target.value)}
                                                                 required/> <i>کدملی</i></div>

                                <div className="inputBox"><input type="number" placeholder='09xxxxxxxxx'
                                                                 id="phone_number"
                                                                 onChange={(e) => setPhone_number(e.target.value)}
                                                                 required/> <i>شماره تلفن همراه</i></div>

                                <div className="inputBox"><input type="email" placeholder='azad@gmail.com' id="email"
                                                                 onChange={(e) => setEmail(e.target.value)} required/>
                                    <i>ایمیل</i></div>

                                <div className="inputBox"><input type="password" id="password"
                                                                 onChange={(e) => setPassword(e.target.value)}
                                                                 required/> <i>رمزعبور جدید</i></div>
                                <div className="inputBox"><input type="password" id="password2"
                                                                 onChange={(e) => setPassword2(e.target.value)}
                                                                 required/> <i>تکرار رمزعبور جدید</i></div>

                                <div className="inputBox">
                                    <input
                                        type="text"
                                        placeholder='کپچا را وارد کنید'
                                        value={captchaInput}
                                        onChange={(e) => setCaptchaInput(e.target.value)}
                                        required
                                    /><i>کپچا</i>
                                </div>
                                <div className="captchaImage">
                                    {selectedImage && <img style={{maxWidth: '100%', maxHeight: '60%', textAlign: "center"}} src={selectedImage} alt="Captcha"/>}
                                </div>
                                <button type="button" onClick={getRandomImage}>برای دریافت کپچا کلیک کنید</button>

                                <div className="links"><Link to={"/register/"}>ثبت نام</Link> <Link
                                    to={"/login/"}>ورود</Link></div>

                                <div className="inputBox">
                                    <input type="submit" value="ثبت"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </bodyt>
        </>
    )
}

export default ForgetPasswordUser