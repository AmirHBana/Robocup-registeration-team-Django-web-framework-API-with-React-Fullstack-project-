import CompleteFormScreen from "../../assets/StyleForm/CompleteFormScreen.png";
import DefaultImage from "../../assets/StyleForm/default-image.jpg";
import {useEffect, useState} from "react";
import SidebarAdmin from "./SidebarAdmin.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import apiInstance from "../../utils/axios.js";
import userData from "../plugin/UserData.jsx";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})


function ConfirmPaymentBySuperuserDetail() {

    const [checkPayment, setCheckPayment] = useState(false);
    const [unCheckPayment, setUnCheckPayment] = useState(false);
    const [paymentOneUserInformations, setPaymentOneUserInformations] = useState([])
    const navigate = useNavigate()
    const param = useParams()
    const user = userData()

    const handleCheckboxChange = (e) => {
        setCheckPayment(e.target.checked)
    };

    const handleCheckboxChange2 = (e) => {
        setUnCheckPayment(e.target.checked)
    };


    useEffect(() => {
        apiInstance.get(`confirm-payment-by-superuser/${param.payid}/${user.user_uid}/`).then((res) => {
            setPaymentOneUserInformations(res.data);
        })
    }, []);



    const formatNumberWithCommas = (number) => {
        if (number) {
            return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        return "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("payment_check", checkPayment);
        formData.append("payment_uncheck", unCheckPayment);

        // if (!checkPayment || !unCheckPayment) {
        //     Toast.fire({
        //         icon: 'error',
        //         title: 'لطفا پرداختی را تایید یا رد تایید کنید'
        //     });
        //     return;
        // }
        //
        // if (checkPayment || unCheckPayment) {
        //     Toast.fire({
        //         icon: 'error',
        //         title: 'لطفا پرداختی را تایید یا رد تایید کنید'
        //     });
        //     return;
        // }

        try {
            await apiInstance.post(`confirm-payment-by-superuser-check-or-uncheck-the-payment/${user.user_uid}/${param.payid}/`, formData);
            Toast.fire({
                icon: 'success',
                title: 'با موفقیت ثبت گردید'
            });
            navigate("/confirm-payment/")

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
            <SidebarAdmin />
            <div className="formbold-form-wrapper">
              <img className="w-100" style={{ width: "100%", height: "250px", objectFit: "cover" }} src={CompleteFormScreen} alt="form-screen" />
              <br />
                <form action="https://formbold.com/s/FORM_ID" method="POST" onSubmit={handleSubmit}>
                    <div className="formbold-form-title">
                        <h2 className="">جزییات تایید پرداختی</h2>
                        <p className='text-white bg-danger'>
                            ادمین گرامی لطفا اطلاعات را کامل بررسی کرده و سپس آن را تایید یا رد تایید نمایید.
                        </p>
                    </div>

                    <br/>

                    <div className="formbold-form-title text-center">
                        <h5 className="text-primary">اطلاعات سرپرست تیم</h5>
                    </div>
                    <hr/>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="name_team" className="formbold-form-label">
                                نام تیم
                            </label>
                            <h5 id="name_team" className="formbold-form-input">{paymentOneUserInformations?.profile?.name_of_team}</h5>
                        </div>
                        <div>
                            <label htmlFor="league" className="formbold-form-label">
                                عضو لیگ
                            </label>
                            <h5 id="league" className="formbold-form-input">{paymentOneUserInformations?.profile?.league}</h5>
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="first_name" className="formbold-form-label">
                                نام
                            </label>
                            <h5 id="first_name"
                                className="formbold-form-input">{paymentOneUserInformations?.user?.first_name}</h5>
                        </div>
                        <div>
                            <label htmlFor="last_name" className="formbold-form-label">
                                نام خانوادگی
                            </label>
                            <h5 id="last_name"
                                className="formbold-form-input">{paymentOneUserInformations?.user?.last_name}</h5>
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="national_code" className="formbold-form-label">
                                کدملی
                            </label>
                            <h5 id="national_code"
                                className="formbold-form-input">{paymentOneUserInformations?.user?.national_code}</h5>
                        </div>
                        <div>
                            <label htmlFor="phone_number" className="formbold-form-label">
                                تلفن همراه
                            </label>
                            <h5 id="phone_number"
                                className="formbold-form-input">{paymentOneUserInformations?.user?.phone_number}</h5>
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="email" className="formbold-form-label">
                                ایمیل
                            </label>
                            <h5 id="email"
                                className="formbold-form-input">{paymentOneUserInformations?.user?.email}</h5>
                        </div>
                        <div>
                            <label htmlFor="phone_number" className="formbold-form-label">
                                تاریخ تولد
                            </label>
                            <h5 id="phone_number"
                                className="formbold-form-input">{paymentOneUserInformations?.profile?.birthday}</h5>
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="country" className="formbold-form-label">
                                کشور
                            </label>
                            <h5 id="country"
                                className="formbold-form-input">{paymentOneUserInformations?.profile?.country}</h5>
                        </div>
                        <div>
                            <label htmlFor="city" className="formbold-form-label">
                                شهر
                            </label>
                            <h5 id="city"
                                className="formbold-form-input">{paymentOneUserInformations?.profile?.city}</h5>
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="shahrestan" className="formbold-form-label">
                                شهرستان
                            </label>
                            <h5 id="shahrestan"
                                className="formbold-form-input">{paymentOneUserInformations?.profile?.shahrestan}</h5>
                        </div>
                        <div>
                            <label htmlFor="zip_code" className="formbold-form-label">
                                کدپستی
                            </label>
                            <h5 id="zip_code"
                                className="formbold-form-input">{paymentOneUserInformations?.profile?.zip_code}</h5>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="formbold-form-label">
                            آدرس
                        </label>
                        <h5 id="address"
                            className="formbold-form-input">{paymentOneUserInformations?.profile?.address}</h5>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="address" className="formbold-form-label">
                                ثبت تیم به عنوان
                            </label>
                            {paymentOneUserInformations?.profile?.university_school_status === 'university' && (
                                <h5 id="order_status" className="formbold-form-input text-dark">دانشگاهی</h5>
                            )}
                            {paymentOneUserInformations?.profile?.university_school_status === 'school' && (
                                <h5 id="order_status" className="formbold-form-input text-dark">دانش آموزی</h5>
                            )}
                        </div>
                        <div>
                            <label htmlFor="zip_code" className="formbold-form-label">
                                تعداد اعضای تیم
                            </label>
                            <h5 id="zip_code"
                                className="formbold-form-input">{paymentOneUserInformations?.profile?.number_of_teams}</h5>
                        </div>
                    </div>

                    <br/>
                    <div className="formbold-form-title text-center">
                        <h5 className="text-success">اطلاعات اعضای تیم مربوطه </h5>
                    </div>
                    <hr/>
                    {/*for loop in here for bring all the Team member*/}
                    {paymentOneUserInformations?.teams?.map((t, index) => (
                        <>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="first_name" className="formbold-form-label">
                                        نام عضو
                                    </label>
                                    <h5 id="first_name" className="formbold-form-input">{t?.first_name}</h5>
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="formbold-form-label">
                                        نام خانوادگی عضو
                                    </label>
                                    <h5 id="last_name" className="formbold-form-input">{t?.last_name}</h5>
                                </div>
                            </div>

                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="national_code" className="formbold-form-label">
                                        کدملی
                                    </label>
                                    <h5 id="national_code" className="formbold-form-input">{t?.national_code}</h5>
                                </div>
                                <div>
                                    <label htmlFor="phone_number" className="formbold-form-label">
                                        تلفن همراه
                                    </label>
                                    <h5 id="phone_number" className="formbold-form-input">{t?.phone_number}</h5>
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="email" className="formbold-form-label">
                                        ایمیل
                                    </label>
                                    <h5 id="email" className="formbold-form-input">{t?.email}</h5>
                                </div>
                                <div>
                                    <label htmlFor="phone_number" className="formbold-form-label">
                                        تاریخ تولد
                                    </label>
                                    <h5 id="phone_number" className="formbold-form-input">{t?.birthday}</h5>
                                </div>
                            </div>
                            <div className="formbold-input-flex">
                                <div>
                                    <label htmlFor="country" className="formbold-form-label">
                                        کشور
                                    </label>
                                    <h5 id="country" className="formbold-form-input">{t?.country}</h5>
                                </div>
                                <div>
                                    <label htmlFor="city" className="formbold-form-label">
                                        شهر
                                    </label>
                                    <h5 id="city" className="formbold-form-input">{t?.city}</h5>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address" className="formbold-form-label">
                                    آدرس
                                </label>
                                <h5 id="address" className="formbold-form-input">{t?.address}</h5>
                            </div>
                            <hr/>
                        </>
                    ))}

                    <hr/>
                    <br/>
                    <br/>
                    <br/>

                    <div className="formbold-form-title text-center">
                        <h5 className="text-info">اطلاعات پرداخت تیم </h5>
                    </div>
                    <hr/>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="national_code" className="formbold-form-label">
                                نیاز به اسکان (هتل)
                            </label>
                            {paymentOneUserInformations?.profile?.hotel_status === true && (
                                <h5 id="order_status" className="formbold-form-input text-success">دارم</h5>
                            )}
                            {paymentOneUserInformations?.profile?.hotel_status === false && (
                                <h5 id="order_status" className="formbold-form-input text-danger">ندارم</h5>
                            )}
                        </div>
                        <div>
                            <label htmlFor="phone_number" className="formbold-form-label">
                                وضعیت ثبت نام تیم
                            </label>
                            {paymentOneUserInformations?.profile?.order_status === "pendingـpayment" && (
                                <h5 id="order_status" className="formbold-form-input text-danger">در انتظار
                                    پرداخت</h5>
                            )}
                            {paymentOneUserInformations?.profile?.order_status === "waitingـforـpaymentـconfirmation" && (
                                <h5 id="order_status" className="formbold-form-input text-primary">در انتظار تایید
                                    پرداخت</h5>
                            )}
                            {paymentOneUserInformations?.profile?.order_status === "register" && (
                                <h5 id="order_status" className="formbold-form-input text-success">ثبت نام شده</h5>
                            )}
                        </div>
                    </div>
                    <div className="formbold-mb-3">
                        <label htmlFor="payid" className="formbold-form-label"> شناسه پرداخت </label>
                        <h5 id="payid" className="formbold-form-input"><b>{paymentOneUserInformations?.payid}</b></h5>
                    </div>
                    <div>
                        <label htmlFor="total_price" className="formbold-form-label"> مبلغ کلی پرداختی </label>
                        <h5 id="total_price"
                            className="formbold-form-input d-flex">{formatNumberWithCommas(paymentOneUserInformations?.total_price)}
                            <p
                                className='text-success' style={{marginRight: '2%'}}>تومان</p></h5>
                    </div>
                    <div className="formbold-input-flex">
                        <div className="formbold-mb-3">
                            <label htmlFor="hotel_sub_price " className="formbold-form-label d-flex"> هزینه ثبت نام
                                اعضاء و سرپرست تیم </label>
                            <h5 id="hotel_sub_price" className="formbold-form-input">
                                <b>{formatNumberWithCommas(paymentOneUserInformations?.member_sub_price)} <p
                                    className='text-success' style={{marginRight: '2%'}}>تومان</p></b></h5>
                        </div>
                        <div>
                            <label htmlFor="member_sub_price" className="formbold-form-label d-flex"> هزینه محل
                                اقامت </label>
                            <h5 id="member_sub_price"
                                className="formbold-form-input">{formatNumberWithCommas(paymentOneUserInformations?.hotel_sub_price)}
                                <p
                                    className='text-success' style={{marginRight: '2%'}}>تومان</p></h5>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <Link to={`${paymentOneUserInformations?.image ? paymentOneUserInformations?.image : DefaultImage}`} target='_blank'>
                        <img
                            className="w-110"
                            style={{width: "100%", height: "450px", objectFit: "cover"}}
                            src={paymentOneUserInformations?.image ? paymentOneUserInformations?.image : DefaultImage}
                            alt="form-screen"
                        />
                    </Link>

                    <br/>
                    <br/>
                    <Link
                        to={`${paymentOneUserInformations?.image2 ? paymentOneUserInformations?.image2 : DefaultImage}`}
                        target='_blank'>
                        <img className="w-100" style={{width: "100%", height: "450px", objectFit: "cover"}}
                             src={paymentOneUserInformations?.image2 ? paymentOneUserInformations?.image2 : DefaultImage}
                             alt="form-screen"/>
                    </Link>

                    <br/>
                    <br/>
                    <Link
                        to={`${paymentOneUserInformations?.image3 ? paymentOneUserInformations?.image3 : DefaultImage}`}
                        target='_blank'>
                        <img className="w-100" style={{width: "100%", height: "450px", objectFit: "cover"}}
                             src={paymentOneUserInformations?.image3 ? paymentOneUserInformations?.image3 : DefaultImage}
                             alt="form-screen"/>
                    </Link>


                    <br/>
                    <br/>
                    <br/>
                    <hr/>
                    <div className="formbold-checkbox-wrapper">
                        <label htmlFor="checkPayment" className="formbold-checkbox-label">
                            <input type="checkbox" id="checkPayment" className="formbold-input-checkbox"
                                   checked={checkPayment} onChange={handleCheckboxChange}/>
                            <span className={`formbold-checkbox-inner ${checkPayment ? "checked" : ""}`}>✓</span>
                            <h5 className='text-success'>پرداختی را تایید میکنم</h5>
                        </label>
                    </div>
                    <div className="formbold-checkbox-wrapper">
                        <label htmlFor="unCheckPayment" className="formbold-checkbox-label">
                            <input type="checkbox" id="unCheckPayment" className="formbold-input-checkbox"
                                   checked={unCheckPayment} onChange={handleCheckboxChange2}/>
                            <span className={`formbold-checkbox-inner ${unCheckPayment ? "checked" : ""}`}>✓</span>
                            <h5 className='text-danger'>پرداختی را رد تایید میکنم (تایید نمی کنم)</h5>
                        </label>
                    </div>
                    <br/>

                    <button className="formbold-btn">ثبت و تایید</button>
                </form>
            </div>
          </div>
        </>
    )
}

export default ConfirmPaymentBySuperuserDetail