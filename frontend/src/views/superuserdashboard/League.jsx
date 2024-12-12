import Sidebar from "../userdashboard/Sidebar.jsx";
import CompleteFormScreen from "../../assets/StyleForm/CompleteFormScreen.png";
import DefaultImage from "../../assets/StyleForm/default-image.jpg";
import {useEffect, useState} from "react";
import SidebarAdmin from "./SidebarAdmin.jsx";
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


function League() {

    const [leagues, setLeagues] = useState([])
    const [title, setTitle] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const user = userData()

    const formData = new FormData();
    formData.append("title", title);
    formData.append("uid", user.user_uid);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await apiInstance.post('create-league/', formData);
            setIsLoading(true);
            // Update the leagues list after creation
            setLeagues([...leagues, response.data]);
            Toast.fire({
                icon: 'success',
                title: 'با موفقیت ثبت گردید'
            });
        } catch (error) {
            console.error("خطایی رخ داد: ", error);
            setIsLoading(false)
            Toast.fire({
                icon: 'error',
                title: 'دوباره تلاش کنید.'
            });
        }
    };

    const handleDelete = async (lid) => {
        try {
            const response = await apiInstance.delete(`league-delete/${lid}/${user.user_uid}/`);
            Toast.fire({
                icon: 'success',
                title: 'لیگ با موفقیت حذف شد'
            });
            // Update the leagues list after deletion
            const updatedLeagues = leagues.filter(league => league.lid !== lid);
            setLeagues(updatedLeagues);
        } catch (error) {
            console.error("خطایی رخ داد: ", error);
            Toast.fire({
                icon: 'error',
                title: 'دوباره تلاش کنید.'
            });
        }
    };

    useEffect(() => {
        apiInstance.get('league/').then((res) => {
            setLeagues(res.data);
        })
    }, []);

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
                          <h2 className="">مدیریت لیگ</h2>
                      </div>

                      <div className="formbold-form-title text-center">
                          <h5 className="text-primary">ثبت لیگ جدید</h5>
                      </div>
                      <hr/>
                      <div>
                          <label htmlFor="title" className="formbold-form-label"> نام لیگ </label>
                          <input type="text" name="title" id="title" className="formbold-form-input"
                                 placeholder='نام لیگ را وارد نمایید' required
                                 onChange={(e) => setTitle(e.target.value)}/>
                      </div>

                      <button type='submit' className="formbold-btn">ثبت و تایید</button>
                  </form>
                  <br/>
                  <br/>
                  <br/>

                  <div>
                      <div className="formbold-form-title">
                          <h2 className=""> مشاهده و حذف لیگ ها </h2>
                          <div className='d-flex'>
                              <p className='ms-1'><i className="fa fa-exclamation-triangle fa-2x text-warning" aria-hidden="true"></i></p>
                              <p className='text-danger'>
                                  توجه: بعد از استفاده کاربران و ثبت نام تیم ها لیگ ها را حذف نکنید<br/> هرگونه بی توجهی
                                  و از دست دادن اطلاعات بر عهده ادمین میباشد.
                              </p>
                          </div>
                      </div>

                      <div className='text-center me-1'>
                          <div className="col-md-6 col-lg-8 mb-4 ">
                              <table className="table caption-top styled-table">
                                  <thead>
                                  <tr>
                                      <th scope="col">نام لیگ</th>
                                      <th scope="col">حذف</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {leagues.map(league => (
                                      <tr key={league.lid}>
                                          <td>{league?.title}</td>
                                          <td><i className="fa-solid fa-trash p-2 mb-1 bg-danger text-white"
                                                 onClick={() => handleDelete(league.lid)}></i></td>
                                      </tr>
                                  ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>


                  </div>
              </div>
          </div>
        </>
    )
}

export default League
