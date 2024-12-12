import Sidebar from "./Sidebar.jsx";
import CreditCard from "../../assets/StyleForm/abstract-background-with-credit-cards_23-2149085905.avif";
import userData from "../plugin/UserData.jsx";
import {useEffect, useState} from "react";
import apiInstance from "../../utils/axios.js";
import Swal from "sweetalert2";
import DefaultImage from "../../assets/StyleForm/default-image.jpg";
const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})

function SendPicturePaymentUser() {

    const user = userData()
    const [paymentInformation, setPaymentInformation] = useState([])
    const [teamInformationStatus, setTeamInformationStatus] = useState([])
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreview2, setImagePreview2] = useState(null);
    const [imagePreview3, setImagePreview3] = useState(null);

    useEffect(() => {
        apiInstance.get(`payment-user-status-check-by-payid/${user.user_uid}/`).then((res) => {
            setPaymentInformation(res.data);
        })
    }, []);

    useEffect(() => {
        apiInstance.get(`payment-user-status-two/${user.user_uid}/`).then((res) => {
            setTeamInformationStatus(res.data);
        })
    }, []);

    const formatNumberWithCommas = (number) => {
        if (number) {
            return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        return "";
    }

    const handleImageSend = (e) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleImageSend2 = (e) => {
        setImage2(e.target.files[0]);
        setImagePreview2(URL.createObjectURL(e.target.files[0]));
    };

    const handleImageSend3 = (e) => {
        setImage3(e.target.files[0]);
        setImagePreview3(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) {
          formData.append("image", image);
        }
        if (image2) {
          formData.append("image2", image2);
        }
        if (image3) {
          formData.append("image3", image3);
        }

        try {
            await apiInstance.post(`send-pic-user-post-image/${user.user_uid}/`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                },
            })
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
                  <img className="w-100" style={{width: "100%", height: "250px", objectFit: "cover"}}
                       src={CreditCard} alt="form-screen"/>
                  <br/>
                  <br/>
                  <form action="https://formbold.com/s/FORM_ID" method="POST" onSubmit={handleSubmit}>
                      <div className="formbold-form-title">
                          <h2 className=""> ارسال عکس از فیش واریز وجه </h2>
                      </div>

                      <br/>
                      <div>
                          <label htmlFor="number_of_teams" className="formbold-form-label">
                              نام تیم
                          </label>
                          <h5 id="number_of_teams"
                              className="formbold-form-input">{teamInformationStatus[0]?.name_of_team}</h5>
                      </div>
                      <br/>
                      <div className="formbold-input-flex">
                          <div>
                              <label htmlFor="order_status" className="formbold-form-label">آخرین وضعیت ثبت نام</label>
                              {teamInformationStatus[0]?.order_status === "pendingـpayment" && (
                                  <h5 id="order_status" className="formbold-form-input text-danger">در انتظار
                                      پرداخت</h5>
                              )}
                              {teamInformationStatus[0]?.order_status === "waitingـforـpaymentـconfirmation" && (
                                  <h5 id="order_status" className="formbold-form-input text-primary">در انتظار تایید
                                      پرداخت</h5>
                              )}
                              {teamInformationStatus[0]?.order_status === "register" && (
                                  <h5 id="order_status" className="formbold-form-input text-success">ثبت نام شده</h5>
                              )}
                          </div>
                      </div>


                      <br/>
                      <div className="formbold-form-title">
                          <p className='text-secondary'>
                              توضیح حالت های مختلف آخرین وضعیت ثبت نام
                          </p>
                          <h5 className='text-danger'>
                              در انتظار پرداخت: سرپرست تیم عکس واریز وجه خود را باید در سایت آپلود کند
                          </h5>
                          <h5 className='text-primary'>
                              در انتظار تایید پرداخت: پرداختی شما در انتظار تایید شدن توسط ادمین میباشد
                          </h5>
                          <h5 className='text-success'>
                              ثبت نام شده: پرداختی شما تایید شده و ثبت نام با موفقیت صورت گرفته
                          </h5>
                      </div>

                      <hr/>

                      <div>
                          <label htmlFor="total_price" className="formbold-form-label"> مبلغ کلی پرداختی </label>
                          <h5 id="total_price"
                              className="formbold-form-input d-flex">{formatNumberWithCommas(paymentInformation[0]?.total_price)}
                              <p
                                  className='text-success' style={{marginRight: '2%'}}>تومان</p></h5>
                      </div>
                      <div className="formbold-input-flex">
                          <div className="formbold-mb-3">
                              <label htmlFor="hotel_sub_price " className="formbold-form-label d-flex"> هزینه ثبت نام
                                  اعضاء و سرپرست تیم </label>
                              <h5 id="hotel_sub_price" className="formbold-form-input">
                                  <b>{formatNumberWithCommas(paymentInformation[1]?.member_sub_price)} <p
                                      className='text-success' style={{marginRight: '2%'}}>تومان</p></b></h5>
                          </div>
                          <div>
                              <label htmlFor="member_sub_price" className="formbold-form-label d-flex"> هزینه محل
                                  اقامت </label>
                              <h5 id="member_sub_price"
                                  className="formbold-form-input">{formatNumberWithCommas(paymentInformation[2]?.hotel_sub_price)}
                                  <p
                                      className='text-success' style={{marginRight: '2%'}}>تومان</p></h5>
                          </div>
                      </div>

                      <div className="formbold-form-title">
                          <h5 className='text-dark'>
                              لطفا مبلغ کلی پرداخت را به شماره کارت یا شبای
                              <br/>
                              <br/>
                              6104337364955771
                              <br/>
                              <hr/>
                              IR552146987452145863251478
                              <br/>
                              <br/>
                              واریز نموده و عکس فیش واریزی را آپلود کنید
                          </h5>
                      </div>
                      <div className="formbold-input-flex">
                          <div>
                              <label htmlFor="title" className="formbold-form-label"> انتخاب عکس اول  </label>
                              <input type="file" name="image" id="image" onChange={handleImageSend}/>
                          </div>
                      </div>

                      <img className="w-100" style={{width: "100%", height: "250px", objectFit: "cover"}}
                           src={imagePreview || DefaultImage} alt="form-screen"/>
                      <br/>
                      <br/>
                      <br/>
                      <div className="formbold-input-flex">
                          <div>
                              <label htmlFor="title" className="formbold-form-label"> انتخاب عکس دوم </label>
                              <input type="file" name="image" id="image" onChange={handleImageSend2}/>
                          </div>
                      </div>

                      <img className="w-100" style={{width: "100%", height: "250px", objectFit: "cover"}}
                           src={imagePreview2 || DefaultImage} alt="form-screen"/>
                      <br/>
                      <br/>
                      <br/>
                      <div className="formbold-input-flex">
                          <div>
                              <label htmlFor="title" className="formbold-form-label"> انتخاب عکس سوم </label>
                              <input type="file" name="image" id="image" onChange={handleImageSend3}/>
                          </div>
                      </div>

                      <img className="w-100" style={{width: "100%", height: "250px", objectFit: "cover"}}
                           src={imagePreview3 || DefaultImage} alt="form-screen"/>


                      <button type='submit' className="formbold-btn">ثبت و تایید</button>
                  </form>
              </div>
          </div>
        </>
    )
}

export default SendPicturePaymentUser