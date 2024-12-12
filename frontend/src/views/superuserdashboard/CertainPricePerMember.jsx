import Swal from 'sweetalert2'
import {useEffect, useState} from "react";
import SidebarAdmin from "./SidebarAdmin.jsx";
import apiInstance from "../../utils/axios.js";
import apiInstancetwo from "../../utils/axios-auth.js";
import userData from "../plugin/UserData.jsx";

const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})

function CertainPricePerMember() {

    const [price, setPrice] = useState("")
    const [pricePerMember, setPricePerMember] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchPriceDataFromBack()
    }, []);

    const fetchPriceDataFromBack = () => {
        apiInstance.get('price-per-member/').then((res) => {
            setPricePerMember(res.data);
        })
    }

    const formatNumberWithCommas = (number) => {
        if (number) {
            return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        return "";
    }

    const user = userData()
     const formData = new FormData();
     formData.append("price", price);
     formData.append("uid", user.user_uid);





    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await apiInstance.post('create-price-per-member/', formData);
            Toast.fire({
                icon: 'success',
                title: 'با موفقیت ثبت گردید'
            });
            fetchPriceDataFromBack()
        } catch (error) {
            console.error("خطایی رخ داد: ", error);
            setIsLoading(false)
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
                  <div className='text-center'>
                      <b><h1><i className="fas fa-user p-3 mb-2 bg-success text-light"></i></h1></b>
                  </div>
                  <br/>
                  <form action="https://formbold.com/s/FORM_ID" method="POST" onSubmit={handleSubmit}>
                      <div className="formbold-form-title">
                          <h2 className="">تعیین میزان هزینه ثبت نام برای اعضاء</h2>
                          <hr/>
                          <h5 className='text-primary'>
                              نکته ۱: هزینه ثبت نام اعضای تیم را وارد کنید نه سرپرست تیم
                          </h5>
                          <br/>
                          <h5 className='text-success'>
                              نکته ۲: هزینه ثبت نام سرپرست تیم به صورت خودکار محاسبه میگردد
                              <br/>
                              هزینه سرپرست = هزینه ثبت نام اعضاء * ۱.۵
                          </h5>
                          <br/>
                          <h5 className='text-danger'>
                              نکته ۳: هزینه ثبت نام را بر حسب تومان وارد نمایید
                          </h5>
                      </div>

                      <div>
                          <label htmlFor="price" className="formbold-form-label"> ورود قیمت </label>
                          <input type="number" name="price" id="price" className="formbold-form-input"
                                 placeholder='1000' required onChange={(e) => setPrice(e.target.value)}/>

                      </div>

                      <br/>

                      <div>
                          <label htmlFor="price" className="formbold-form-label"> قیمت ثبت شده </label>
                          <h2 id="price"
                              className="formbold-form-input d-flex text-center">{formatNumberWithCommas(pricePerMember[0]?.price)} <p
                              className='text-success' style={{marginRight: '2%'}}>تومان</p></h2>

                      </div>


                      <button type='submit' className="formbold-btn">ثبت</button>

                  </form>
              </div>
          </div>
        </>
    )
}

export default CertainPricePerMember