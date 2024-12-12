import '../../authentication/user/CSS/RegisterUserForm.css';
import {Link, useNavigate} from "react-router-dom";
import  {useState, useEffect} from "react"
import { useAuthStore } from "../../../store/auth.js"
import {loginsuperuser} from "../../../utils/auth.js";
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


function LoginSuperUser() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [captchaInput, setCaptchaInput] = useState("");
    const [username, setPhone_number] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/')
        }
    }, [isLoggedIn, navigate])

    const resetForm = () => {
        setPhone_number("")
        setPassword("")
    }

    useEffect(() => {
        getRandomImage();
    }, []);

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setSelectedImage(images[randomIndex]);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Check if the selected image and captcha input are valid
        if (!selectedImage || !captchaInput) {
            Toast.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select the correct image from the captcha',
            });
            return;
        }

        const imageCode = selectedImage.split("/").pop().split(".")[0];
        if (captchaInput !== imageCode) {
            Toast.fire({
                icon: 'warning',
                title: 'کپچا را بادقت وارد کنید',
            });
            getRandomImage()
            return;
        }

        if (!username || !password) {
            alert("فیلد ها را کامل کنید و دوباره تلاش فرمایید");
            return;
        }

        const { error } = await loginsuperuser(username, password);
        if (error) {
            alert(error);
        } else {
            navigate("/teams-status");
            resetForm();
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
                            <h2>ورود ادمین</h2>


                            <form className="form" onSubmit={handleLogin}>

                                <div className="inputBox"><input type="number" placeholder='09xxxxxxxxx' id="username"
                                                                 name="username" value={username}
                                                                 onChange={(e) => setPhone_number(e.target.value)}
                                                                 required/> <i>شماره تلفن همراه</i></div>

                                <div className="inputBox"><input type="password" id="password" name="password"
                                                                 value={password}
                                                                 onChange={(e) => setPassword(e.target.value)}
                                                                 required/> <i>رمزعبور</i></div>

                                <div className="inputBox">
                                    <input type="text" placeholder='کپچا را وارد کنید'
                                           value={captchaInput}
                                           onChange={(e) => setCaptchaInput(e.target.value)}
                                           required/>
                                    <label>کپچا</label>
                                </div>
                                <div className="captchaImage">
                                    {selectedImage && <img style={{maxWidth: '100%', maxHeight: '60%', textAlign: "center"}} src={selectedImage} alt="Captcha"/>}
                                </div>
                                <button type="button" onClick={getRandomImage}>برای دریافت کپچا کلیک کنید</button>

                                <div className="links"><Link to={"/admin-forgotpassword/"}>فراموشی رمز عبور</Link> <Link
                                    to={"/admin-register/"}>ثبت نام</Link></div>

                                <div className="inputBox">
                                    <input type="submit" value="ورود"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </bodyt>
        </>
    )
}

export default LoginSuperUser