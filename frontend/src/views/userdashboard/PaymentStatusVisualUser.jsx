import Sidebar from "./Sidebar.jsx";
import CreditCard from "../../assets/StyleForm/abstract-background-with-credit-cards_23-2149085905.avif";
import {useEffect, useState} from "react";
import apiInstance from "../../utils/axios.js";
import userData from "../plugin/UserData.jsx";


function PaymentStatusVisualUser() {

    const [teamInformationStatus, setTeamInformationStatus] = useState([])
    const [paymentInformationForOneUser, setPaymentInformationForOneUser] = useState()
    const user = userData()

    useEffect(() => {
        apiInstance.get(`payment-user-status-two/${user.user_uid}/`).then((res) => {
            setTeamInformationStatus(res.data);
        })
    }, []);

    useEffect(() => {
        apiInstance.get(`payment-user-status/${user.user_uid}/`).then((res) => {
            console.log(res.data);
            setPaymentInformationForOneUser(res.data);
        })
    }, []);

    const formatNumberWithCommas = (number) => {
        if (number) {
            return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        return "";
    }

    return (
        <>
          <div className="formbold-main-wrapper">
            <Sidebar />
              <div className="formbold-form-wrapper">
                  <img className="w-100" style={{width: "100%", height: "250px", objectFit: "cover"}}
                       src={CreditCard} alt="form-screen"/>
                  <br/>
                  <br/>
                  <div>
                      <div className="formbold-form-title">
                      <h2 className=""> مشاهده وضعیت پرداختی ها </h2>
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
                          <h5 className="text-danger">وضعیت تمامی پرداختی های انحام شده</h5>
                      </div>
                      <hr/>
                      {/*حلقه برای دریافت پرداختی ها اینجا زده میشه*/}
                      {paymentInformationForOneUser?.map((p, index) => (
                          <>
                              <div className="formbold-mb-3" key={index}>
                                  <label htmlFor="payid" className="formbold-form-label"> ****شناسه پرداخت**** </label>
                                  <h5 id="payid" className="formbold-form-input"><b>{p?.payid}</b></h5>
                              </div>
                              <div className="formbold-input-flex">
                                  <div>
                                      <label htmlFor="total_price" className="formbold-form-label"> مبلغ کلی
                                          پرداختی </label>
                                      <h5 id="total_price" className="formbold-form-input">{formatNumberWithCommas(p?.total_price)} <p
                                          className='text-success' style={{marginRight: '2%'}}>تومان</p></h5>
                                  </div>
                                  <div>
                                      <label htmlFor="payment_status" className="formbold-form-label"> وضعیت
                                          پرداخت </label>
                                      {p?.payment_status === "unPaid" && (
                                          <h5 id="order_status" className="formbold-form-input text-danger">پرداخت نشده</h5>
                                      )}
                                      {p?.payment_status === "paid" && (
                                          <h5 id="order_status" className="formbold-form-input text-success">پرداخت شده</h5>
                                      )}
                                  </div>
                              </div>

                              <div>
                                  <label htmlFor="payment_check_status" className="formbold-form-label"> وضعیت تایید
                                      پرداخت از
                                      طرف
                                      ادمین </label>
                                  {p?.payment_check_status === "accept" && (
                                      <h5 id="order_status" className="formbold-form-input text-success">تایید شده</h5>
                                  )}
                                  {p?.payment_check_status === "reject" && (
                                      <h5 id="order_status" className="formbold-form-input text-danger">رد شده</h5>
                                  )}
                                  {p?.payment_check_status === "notseen" && (
                                      <h5 id="order_status" className="formbold-form-input text-primary">دیده نشده</h5>
                                  )}
                              </div>
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

export default PaymentStatusVisualUser