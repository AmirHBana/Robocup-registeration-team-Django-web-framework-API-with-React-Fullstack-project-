import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import apiInstance from "../../utils/axios.js";
import SidebarAdmin from "./SidebarAdmin.jsx";
import CompleteFormScreen from "../../assets/StyleForm/CompleteFormScreen.png";
import userData from "../plugin/UserData.jsx";

const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
});

function ManageNews() {
    const [news, setNews] = useState();
    const user = userData()

    useEffect(() => {
        apiInstance.get('news/').then((res) => {
            setNews(res.data);
        });
    }, []);

    const handleDelete = async (nid) => {
        try {
            const response = await apiInstance.delete(`news-delete/${nid}/${user.user_uid}/`);
            Toast.fire({
                icon: 'success',
                title: 'خبر با موفقیت حذف شد'
            });
            // Update the news list after deletion
            const updatedNews = news.filter(n => n.nid !== nid);
            setNews(updatedNews);
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

                    <div>
                        <div className="formbold-form-title">
                            <h2 className=""> مدیریت اخبار </h2>
                        </div>

                        <div className='text-center me-1'>
                            <div className="col-md-8 col-lg-12 mb-4 ">
                                <table className="table caption-top styled-table">
                                    <thead>
                                    <tr>
                                        <th scope="col">عنوان خبر</th>
                                        <th scope="col">حذف</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {news?.map(n => (
                                        <tr key={n.nid}>
                                            <td>{n?.title}</td>
                                            <td><i className="fa-solid fa-trash p-2 mb-1 bg-danger text-white"
                                                   onClick={() => handleDelete(n.nid)}></i></td>
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
    );
}

export default ManageNews;
