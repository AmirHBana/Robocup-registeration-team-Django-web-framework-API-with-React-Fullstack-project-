import Sidebar from "./Sidebar.jsx";
import CompleteFormScreen from "../../assets/StyleForm/CompleteFormScreen.png";
import userData from "../plugin/UserData.jsx";
import {useEffect, useState} from "react";
import apiInstance from "../../utils/axios.js";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})

function CreateMember() {

    const user = userData()
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [national_code, setNationalCode] = useState("")
    const [phone_number, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [birthday, setBirthday] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [shahrestan, setShahrestan] = useState("")
    const [address, setAddress] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phone_number.length !== 11) {
            Toast.fire({
                icon: 'error',
                title: 'تلفن همراه باید 11 رقم باشد'
            });
            return;
        }

        const formData = new FormData();
        formData.append("id", user.user_id);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("national_code", national_code);
        formData.append("phone_number", phone_number);
        formData.append("email", email);
        formData.append("birthday", birthday);
        formData.append("country", country);
        formData.append("city", city);
        formData.append("shahrestan", shahrestan);
        formData.append("address", address);

        try {
            const response = await apiInstance.post("complete-member-information-by-user/", formData);

            Toast.fire({
                icon: 'success',
                title: 'با موفقیت ثبت گردید'
            });
            setTimeout(() => {
                window.location.reload();
            }, 4500); // Reload the page after 4 seconds

        } catch (error) {
            console.error("خطایی رخ داد: ", error);
            Toast.fire({
                icon: 'error',
                title: 'دوباره تلاش کنید.'
            });
        }
    };


    return (
        <>
          <div className="formbold-main-wrapper">
            <Sidebar />
            <div className="formbold-form-wrapper">
              <img className="w-100" style={{ width: "100%", height: "250px", objectFit: "cover" }} src={CompleteFormScreen} alt="form-screen" />
              <br />
                <form action="https://formbold.com/s/FORM_ID" method="POST" onSubmit={handleSubmit}>
                    <div className="formbold-form-title">
                        <h2 className="">ثبت عضو جدید</h2>
                        <p className='text-danger'>
                            سرپرست گرامی لطفا اطلاعات اعضای خود را با دقت وارد نمایید.
                        </p>
                    </div>

                    <br/>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="first_name" className="formbold-form-label">
                                نام
                            </label>
                            <input type="text" name="first_name" id="first_name" className="formbold-form-input"
                                   placeholder='' onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="last_name" className="formbold-form-label"> نام خانوادگی </label>
                            <input type="text" name="last_name" id="last_name" className="formbold-form-input"
                                   placeholder='' onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="national_code" className="formbold-form-label">
                                کدملی
                            </label>
                            <input type="number" name="national_code" id="national_code" className="formbold-form-input"
                                   placeholder='' onChange={(e) => setNationalCode(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="name_of_team" className="formbold-form-label"> تلفن همراه </label>
                            <input type="number" name="name_of_team" id="name_of_team" className="formbold-form-input"
                                   placeholder='*********09' onChange={(e) => setPhoneNumber(e.target.value)}/>
                        </div>
                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="email" className="formbold-form-label">
                                ایمیل
                            </label>
                            <input type="email" name="email" id="email" className="formbold-form-input"
                                   placeholder='' onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="name_of_team" className="formbold-form-label"> تاریخ تولد </label>
                            <input type="text" name="name_of_team" id="name_of_team" className="formbold-form-input"
                                   placeholder='1402/02/06' onChange={(e) => setBirthday(e.target.value)}/>
                        </div>
                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="country" className="formbold-form-label">
                                کشور
                            </label>
                            <input type="text" name="country" id="country" className="formbold-form-input"
                                   placeholder='' onChange={(e) => setCountry(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="city" className="formbold-form-label"> شهر </label>
                            <input type="text" name="city" id="city" className="formbold-form-input"
                                   placeholder='' onChange={(e) => setCity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="sharestan" className="formbold-form-label"> شهرستان </label>
                            <input type="text" name="sharestan" id="sharestan" className="formbold-form-input"
                                   placeholder='' onChange={(e) => setShahrestan(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="formbold-form-label"> آدرس </label>
                        <input type="text" name="address" id="address" className="formbold-form-input"
                               placeholder='' onChange={(e) => setAddress(e.target.value)}/>
                    </div>


                    <button type='submit' className="formbold-btn">ثبت و تایید</button>
                </form>
            </div>
          </div>
        </>
    )
}

export default CreateMember