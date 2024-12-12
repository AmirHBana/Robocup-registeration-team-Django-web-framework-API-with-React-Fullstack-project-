import SidebarAdmin from "./SidebarAdmin.jsx";
import CompleteFormScreen from "../../assets/StyleForm/CompleteFormScreen.png";
import DefaultImage from "../../assets/StyleForm/default-image.jpg";
import {useEffect, useState} from "react";
import apiInstance from "../../utils/axios.js";
import Swal from "sweetalert2";
import {Link, useParams} from "react-router-dom";
import userData from "../plugin/UserData.jsx";

const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})

function TeamsStutusDetail() {

    const [paymentOneUserInformations, setPaymentOneUserInformations] = useState([])
    const param = useParams()
    const user = userData()

    useEffect(() => {
        apiInstance.get(`status-teams-superuser/${user.user_uid}/${param.pid}/`).then((res) => {
            setPaymentOneUserInformations(res.data);
        })
    }, []);

    const formatNumberWithCommas = (number) => {
        if (number) {
            return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        return "";
    }

    const downloadPdfFile = (pdfFilePath) => {
        var link = document.createElement('a');
        link.href = pdfFilePath;
        link.download = 'team_file.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <>
          <div className="formbold-main-wrapper">
            <SidebarAdmin />
            <div className="formbold-form-wrapper">
              <img className="w-100" style={{ width: "100%", height: "250px", objectFit: "cover" }} src={CompleteFormScreen} alt="form-screen" />
              <br />
                <div>
                    <div className="formbold-form-title">
                        <h2 className="">جزییات ثبت نام تیم</h2>
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
                            <h5 id="name_team"
                                className="formbold-form-input">{paymentOneUserInformations?.name_of_team}</h5>
                        </div>
                        <div>
                            <label htmlFor="league" className="formbold-form-label">
                                عضو لیگ
                            </label>
                            <h5 id="league" className="formbold-form-input">{paymentOneUserInformations?.league}</h5>
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
                                className="formbold-form-input">{paymentOneUserInformations?.birthday}</h5>
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="country" className="formbold-form-label">
                                کشور
                            </label>
                            <h5 id="country" className="formbold-form-input">{paymentOneUserInformations?.country}</h5>
                        </div>
                        <div>
                            <label htmlFor="city" className="formbold-form-label">
                                شهر
                            </label>
                            <h5 id="city" className="formbold-form-input">{paymentOneUserInformations?.city}</h5>
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="shahrestan" className="formbold-form-label">
                                شهرستان
                            </label>
                            <h5 id="shahrestan"
                                className="formbold-form-input">{paymentOneUserInformations?.shahrestan}</h5>
                        </div>
                        <div>
                            <label htmlFor="zip_code" className="formbold-form-label">
                                کدپستی
                            </label>
                            <h5 id="zip_code"
                                className="formbold-form-input">{paymentOneUserInformations?.zip_code}</h5>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="formbold-form-label">
                            آدرس
                        </label>
                        <h5 id="address" className="formbold-form-input">{paymentOneUserInformations?.address}</h5>
                    </div>
                    <div>
                        <label htmlFor="pdf-file" className="formbold-form-label">
                            فایل PDF تیم مربوطه
                        </label>
                        <a href={paymentOneUserInformations?.PDF_file} download="team_file.pdf"
                           onClick={() => downloadPdfFile(paymentOneUserInformations?.PDF_file)}>
                            <h5 id="pdf-file" className="formbold-form-input">دانلود فایل PDF</h5>
                        </a>
                    </div>
                    <br/>
                    <div className="formbold-form-title text-center">
                        <h5 className="text-success">اطلاعات اعضای تیم مربوطه </h5>
                    </div>
                    <hr/>
                    {/*for loop in here for bring all the Team member*/}
                    {paymentOneUserInformations?.team?.map((t, index) => (
                        <>
                            <div className="formbold-input-flex" key={index}>
                                <div>
                                    <label htmlFor="first_name" className="formbold-form-label">
                                        نام
                                    </label>
                                    <h5 id="first_name" className="formbold-form-input">{t?.first_name}</h5>
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="formbold-form-label">
                                        نام خانوادگی
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
                            <br/>
                            <hr/>
                        </>
                    ))}

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
                            {paymentOneUserInformations?.hotel_status === true && (
                                <h5 id="order_status" className="formbold-form-input text-success">دارم</h5>
                            )}
                            {paymentOneUserInformations?.hotel_status === false && (
                                <h5 id="order_status" className="formbold-form-input text-danger">ندارم</h5>
                            )}
                        </div>
                        <div>
                            <label htmlFor="phone_number" className="formbold-form-label">
                                وضعیت ثبت نام تیم
                            </label>
                            {paymentOneUserInformations?.order_status === "pendingـpayment" && (
                                <h5 id="order_status" className="formbold-form-input text-danger">در انتظار
                                    پرداخت</h5>
                            )}
                            {paymentOneUserInformations?.order_status === "waitingـforـpaymentـconfirmation" && (
                                <h5 id="order_status" className="formbold-form-input text-primary">در انتظار تایید
                                    پرداخت</h5>
                            )}
                            {paymentOneUserInformations?.order_status === "register" && (
                                <h5 id="order_status" className="formbold-form-input text-success">ثبت نام شده</h5>
                            )}
                        </div>
                    </div>

                    {/*for loop barayeh pardakhti ha*/}
                    {paymentOneUserInformations?.payment?.map((p, index) => (
                        <>
                            <div className="formbold-mb-3" key={index}>
                                <label htmlFor="payid" className="formbold-form-label"> شناسه پرداخت </label>
                                <h5 id="payid" className="formbold-form-input">
                                    <b>{p?.payid}</b></h5>
                            </div>
                            <div className="formbold-mb-3">
                                <label htmlFor="payment-status" className="formbold-form-label"> وضعیت پرداخت </label>
                                {p?.payment_status === 'paid' &&
                                    <h5 id="payment-status" className="formbold-form-input text-success">پرداخت شده</h5>
                                }
                                {p?.payment_status === 'unPaid' &&
                                    <h5 id="payment-status" className="formbold-form-input text-danger">پرداخت نشده</h5>
                                }

                            </div>
                            <div>
                                <label htmlFor="total_price" className="formbold-form-label"> مبلغ کلی پرداختی </label>
                                <h5 id="total_price"
                                    className="formbold-form-input d-flex">{formatNumberWithCommas(p?.total_price)}
                                    <p
                                        className='text-success' style={{marginRight: '2%'}}>تومان</p></h5>
                            </div>
                            <div className="formbold-input-flex">
                                <div className="formbold-mb-3">
                                    <label htmlFor="hotel_sub_price " className="formbold-form-label d-flex"> هزینه ثبت
                                        نام
                                        اعضاء و سرپرست تیم </label>
                                    <h5 id="hotel_sub_price" className="formbold-form-input">
                                        <b>{formatNumberWithCommas(p?.member_sub_price)}
                                            <p
                                                className='text-success' style={{marginRight: '2%'}}>تومان</p></b></h5>
                                </div>
                                <div>
                                    <label htmlFor="member_sub_price" className="formbold-form-label d-flex"> هزینه محل
                                        اقامت </label>
                                    <h5 id="member_sub_price"
                                        className="formbold-form-input">{formatNumberWithCommas(p?.hotel_sub_price)}
                                        <p
                                            className='text-success' style={{marginRight: '2%'}}>تومان</p></h5>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            {p?.image && (
                                <Link to={`${p?.image}`} target='_blank'>
                                    <img className="w-100" style={{width: "100%", height: "250px", objectFit: "cover"}}
                                         src={p?.image ? p?.image : DefaultImage}
                                         alt="form-screen"/>
                                </Link>

                            )}
                            {p?.image2 && (
                                <Link to={`${p?.image2}`} target='_blank'>
                                    <img className="w-100" style={{width: "100%", height: "250px", objectFit: "cover"}}
                                         src={p?.image2 ? p?.image2 : DefaultImage}
                                         alt="form-screen"/>
                                </Link>

                            )}
                            {p?.image3 && (
                                <Link to={`${p?.image3}`} target='_blank'>
                                    <img className="w-100" style={{width: "100%", height: "250px", objectFit: "cover"}}
                                         src={p?.image3 ? p?.image3 : DefaultImage}
                                         alt="form-screen"/>
                                </Link>

                            )}


                            <br/>
                            <br/>
                            <br/>
                            <hr/>
                        </>
                    ))}


                </div>
            </div>
          </div>
        </>
    )
}

export default TeamsStutusDetail