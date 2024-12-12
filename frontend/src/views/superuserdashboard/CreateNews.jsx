import CompleteFormScreen from "../../assets/StyleForm/CompleteFormScreen.png";
import DefaultImage from "../../assets/StyleForm/default-image.jpg";
import SidebarAdmin from "./SidebarAdmin.jsx";
import {useState} from "react";
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

function CreateNews() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imagePreview, setImagePreview] = useState(DefaultImage);
    const [image, setImage] = useState(null);
    const user = userData()

    const handleImageSend = (e) => {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append("uid", user.user_uid);
        if (image) {
          formData.append("image", image);
        }

        try {
            await apiInstance.post('create-news/', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                },
            });
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
                  <img className="w-100" style={{width: "100%", height: "250px", objectFit: "cover"}}
                       src={CompleteFormScreen} alt="form-screen"/>
                  <br/>
                  <br/>
                  <form action="https://formbold.com/s/FORM_ID" method="POST" onSubmit={handleSubmit}>
                      <div className="formbold-form-title">
                          <h2 className="">ایجاد اخبار جدید</h2>
                      </div>
                      <hr/>
                      <div>
                          <label htmlFor="title" className="formbold-form-label"> عنوان خبر </label>
                          <input type="text" name="title" id="title" className="formbold-form-input"
                                 placeholder='عنوان خبر' required onChange={(e) => setTitle(e.target.value)}
                          />
                      </div>
                      <br/>
                      <div>
                          <label htmlFor="content" className="formbold-form-label"> توضیحات </label>
                          <input type="text" name="content" id="content" className="formbold-form-input"
                                 placeholder='توضیحات خبر' onChange={(e) => setContent(e.target.value)}
                          />


                      </div>

                      <br/>
                      <br/>
                      <input type="file" onChange={handleImageSend}/>
                      <br/>
                      <br/>
                      <br/>
                      <img className="w-100" style={{width: "100%", height: "300px", objectFit: "fill", borderRadius: '10%'}}
                           src={imagePreview || DefaultImage} alt="form-screen"/>

                      <button className="formbold-btn">ثبت و تایید</button>
                  </form>
              </div>
          </div>
        </>
    )
}

export default CreateNews