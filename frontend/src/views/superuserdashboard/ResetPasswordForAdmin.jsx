import Sidebar from "../userdashboard/Sidebar.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {resetpasswordadmin} from "../../utils/auth.js";
import Swal from 'sweetalert2'
import SidebarAdmin from "./SidebarAdmin.jsx";
import userData from "../plugin/UserData.jsx";

const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})


function ResetPasswordForAdmin() {

    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [password3, setPassword3] = useState("")
    const user = userData()

    const navigate = useNavigate()


    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!password|| !password2|| !password3) {
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


        const { error } = await resetpasswordadmin(password, password2, password3);

        if (error) {
            alert(JSON.stringify(error))
        } else {
            navigate("/reset-password/admin")
            setIsLoading(false)
        }
    };

    return (
        <>
          <div className="formbold-main-wrapper">
            <SidebarAdmin />
              <div className="formbold-form-wrapper">
                  <div className='text-center'>
                      <b><h1><i className="fas fa-exclamation-circle p-3 mb-2 bg-warning text-light"></i></h1></b>
                  </div>
                  <br/>
                  <form action="https://formbold.com/s/FORM_ID" method="POST" onSubmit={handleSubmit}>
                      <div className="formbold-form-title">
                          <h2 className="">تغییر رمز عبور</h2>
                      </div>

                      <div>
                          <label htmlFor="zip_code" className="formbold-form-label"> رمز عبور قدیمی </label>
                          <input type="password" name="password" id="password" className="formbold-form-input"
                                 placeholder='**********' required onChange={(e) => setPassword(e.target.value)}/>
                      </div>
                      <br/>

                      <div>
                          <label htmlFor="zip_code" className="formbold-form-label"> رمز عبور جدید </label>
                          <input type="password" name="password2" id="password2" className="formbold-form-input"
                                 placeholder='**********' required onChange={(e) => setPassword2(e.target.value)}/>
                      </div>
                      <br/>

                      <div>
                          <label htmlFor="zip_code" className="formbold-form-label"> تکرار رمز عبور جدید </label>
                          <input type="password" name="password3" id="password3" className="formbold-form-input"
                                 placeholder='**********' required onChange={(e) => setPassword3(e.target.value)}/>
                      </div>


                      <button type='submit' className="formbold-btn p-3 mb-2 bg-dark text-white">تغییر رمز</button>

                  </form>
              </div>
          </div>
        </>
    )
}

export default ResetPasswordForAdmin