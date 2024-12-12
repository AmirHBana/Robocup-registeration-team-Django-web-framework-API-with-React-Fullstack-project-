import Sidebar from "./Sidebar.jsx";
import CompleteFormScreen from "../../assets/StyleForm/CompleteFormScreen.png";
import { useEffect, useState } from "react";
import apiInstance from "../../utils/axios.js";
import userData from "../plugin/UserData.jsx";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 4500,
    timerProgressBar: true,
});

function ManagementMember() {

    const user = userData();
    const [teamInformation, setTeamInformation] = useState([]);

    useEffect(() => {
        apiInstance.get(`get-all-member-information-for-one-user-to-see-in-a-list/${user.user_uid}/`).then((res) => {
            console.log(res.data);
            setTeamInformation(res.data);
        });
    }, []);

    const handleDelete = async (tid) => {
        try {
            const response = await apiInstance.delete(`delete-member-information-by-user/${tid}/${user.user_uid}/`);
            Toast.fire({
                icon: 'success',
                title: 'عضو با موفقیت حذف شد'
            });
            // Update the team information list after deletion
            const updatedTeamInformation = teamInformation.filter(t => t.tid !== tid);
            setTeamInformation(updatedTeamInformation);
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
                <div className="text-center">
                    {/*<img className="w-100" style={{ width: "100%", height: "250px", objectFit: "cover" }} src={CompleteFormScreen} alt="form-screen" />*/}
                    <br />
                    <br />

                    <div>
                        <div className="formbold-form-title">
                            <h2 className="text-dark"> ویرایش و حذف اعضای تیم من </h2>
                            <h5 className='text-danger'>
                                در صورتی که اطلاعات اعضاء اشتباه وارد شده
                                عضو را حذف نموده <br/>و از قسمت ثبت عضو جدید تیم دوباره اطلاعات عضو را ثبت نمایید.
                            </h5>
                        </div>

                        <div className='text-center me-1'>
                            <div className="col-md-8 col-lg-12 mb-4 ">
                                <table className="table caption-top styled-table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">نام عضو</th>
                                            <th scope="col">نام خانوادگی عضو</th>
                                            <th scope="col">کدملی</th>
                                            <th scope="col">تلفن همراه</th>
                                            <th scope="col">تاریخ تولد</th>
                                            <th scope="col">کشور</th>
                                            <th scope="col">شهر</th>
                                            <th scope="col">شهرستان</th>
                                            <th scope="col">آدرس</th>
                                            <th scope="col">ایمیل</th>
                                            <th scope="col">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teamInformation?.map((t, index) => (
                                            <tr key={t.tid}>
                                                <td>{t?.first_name}</td>
                                                <td>{t?.last_name}</td>
                                                <td>{t?.national_code}</td>
                                                <td>{t?.phone_number}</td>
                                                <td>{t?.birthday}</td>
                                                <td>{t?.country}</td>
                                                <td>{t?.city}</td>
                                                <td>{t?.shahrestan}</td>
                                                <td>{t?.address}</td>
                                                <td>{t?.email}</td>
                                                <td><i className="fa-solid fa-trash p-2 mb-1 bg-danger text-white" onClick={() => handleDelete(t.tid)}></i></td>
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

export default ManagementMember;
