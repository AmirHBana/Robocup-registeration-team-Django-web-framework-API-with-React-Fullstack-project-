import DefaultImage from "../../assets/StyleForm/default-image.jpg";
import SidebarAdmin from "./SidebarAdmin.jsx";
import {useEffect, useState} from "react";
import apiInstance from "../../utils/axios.js";
import Swal from "sweetalert2";
import userData from "../plugin/UserData.jsx";


const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})

function CertainHotelInformationAdmin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [priceMultiNight, setPriceMultiNight] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const user = userData()

  const handleImageSend = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price_per_night", pricePerNight);
    formData.append("price_multi_nights", priceMultiNight);
    formData.append("datestart", dateStart);
    formData.append("dateend", dateEnd);
    formData.append("uid", user.user_uid);
    if (image) {
      formData.append("image", image);
    }

    try {
        await apiInstance.post('create-hotel/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
        Toast.fire({
            icon: 'success',
            title: 'با موفقیت ثبت گردید'
        });
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
                <img className="w-100"
                     style={{width: "100%", height: "250px", objectFit: "cover", borderRadius: '70px'}}
                     src={imagePreview || DefaultImage} alt="form-screen"/>
                <br/>
                <br/>
                <form onSubmit={handleSubmit}>
                    <div className="formbold-form-title">
                        <h2>تکمیل اطلاعات هتل (اسکان)</h2>
                        <p className="text-danger">
                            ادمین گرامی لطفا اطلاعات هتل مورد نظر را با دقت وارد نمایید.
                        </p>
                    </div>

                    <br/>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="title" className="formbold-form-label"> نام هتل </label>
                            <input type="text" name="title" id="title" className="formbold-form-input"
                                   placeholder='نام هتل را وارد نمایید'
                                   onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="title" className="formbold-form-label"> عکس هتل </label>
                            <input type="file" name="image" id="image" onChange={handleImageSend}/>
                        </div>
                    </div>
                    <br/>

                    <div>
                        <label htmlFor="description" className="formbold-form-label"> توضیحات در مورد هتل </label>
                        <input type="text" name="description" id="description" className="formbold-form-input"
                               placeholder='توضیحات لازم را وارد نمایید'
                               onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <br/>
                    <h5 className='text-secondery'>
                        نکته ۱: هزینه اقامت در هتل را به ازای هر شخص وارد نمایید
                        <br/>
                        قیمت محاسبه شده برای چند شب = قیمت هرشب اقامت * تعداد روز اقامت و وارد نمایید
                    </h5>
                    <br/>
                    <h5 className='text-danger'>
                        نکته ۲: هزینه هتل را بر حسب تومان وارد نمایید
                    </h5>
                    <br/>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="price_per_night" className="formbold-form-label"> قیمت به ازای هرشب </label>
                            <input type="number" name="price_per_night" id="price_per_night"
                                   className="formbold-form-input"
                                   placeholder='10000' onChange={(e) => setPricePerNight(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="price_multi_nights" className="formbold-form-label"> قیمت محاسبه شده برای چند
                                شب </label>
                            <input type="number" name="price_multi_nights" id="price_multi_nights"
                                   className="formbold-form-input" placeholder='10000'
                                   onChange={(e) => setPriceMultiNight(e.target.value)}/>
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="dateStart" className="formbold-form-label"> تاریخ شروع اقامت </label>
                            <input type="text" name="dateStart" id="dateStart"
                                   className="formbold-form-input"
                                   placeholder='1402/06/03' onChange={(e) => setDateStart(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="dateEnd" className="formbold-form-label"> تاریخ پایان اقامت </label>
                            <input type="text" name="dateEnd" id="dateEnd"
                                   className="formbold-form-input" placeholder='1402/06/08'
                                   onChange={(e) => setDateEnd(e.target.value)}/>
                        </div>
                    </div>

                    <button type='submit' className="formbold-btn">ثبت اطلاعات</button>
                </form>
            </div>
        </div>
    </>
    )
}

export default CertainHotelInformationAdmin
