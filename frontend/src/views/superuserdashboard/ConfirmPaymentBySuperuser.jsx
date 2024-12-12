import CreditCard from "../../assets/StyleForm/abstract-background-with-credit-cards_23-2149085905.avif";
import SidebarAdmin from "./SidebarAdmin.jsx";
import {useEffect, useState} from "react";
import apiInstance from "../../utils/axios.js";
import userData from "../plugin/UserData.jsx";
import {Link} from "react-router-dom";


function ConfirmPaymentBySuperuser() {

    const [paymentDeatailInformmation, setPaymentDeatailInformmation] = useState([])
    const user = userData()

    useEffect(() => {
        apiInstance.get(`confirm-payment-by-superuser/${user.user_uid}/`).then((res) => {
            setPaymentDeatailInformmation(res.data);
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
            <SidebarAdmin />
              <div className="formbold-form-wrapper">
                  <img className="w-100" style={{width: "100%", height: "250px", objectFit: "cover"}}
                       src={CreditCard} alt="form-screen"/>
                  <br/>
                  <br/>
                  <form action="https://formbold.com/s/FORM_ID" method="POST">
                      <div className="formbold-form-title">
                          <h2 className=""> لیست تایید پرداختی ها </h2>
                      </div>

                      <br/>
                      <div className='text-center me-1'>
                          <div className="col-md-6 col-lg-4 mb-4 ">
                              <table className="table caption-top styled-table">
                                  <thead>
                                  <tr>
                                      <th scope="col">شناسه پرداخت</th>
                                      <th scope="col">مبلغ کل پرداختی</th>
                                      <th scope="col">مشاهده جزییات</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {paymentDeatailInformmation?.map((p, index) => (
                                      <tr key={index}>
                                          <td>{p?.payid}</td>
                                          <td>{formatNumberWithCommas(p?.total_price)} <p
                                              className='text-success' style={{marginRight: '2%'}}>تومان</p></td>
                                          <td><h4><Link to={`${p?.payid}/`}><i className="fa-solid fa-eye p-2 mb-1 bg-dark text-white"></i></Link></h4>
                                          </td>
                                      </tr>
                                  ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>


                  </form>
              </div>
          </div>
        </>
    )
}

export default ConfirmPaymentBySuperuser