import SidebarAdmin from "./SidebarAdmin.jsx";
import CompleteFormScreen from "../../assets/StyleForm/CompleteFormScreen.png";
import { useEffect, useState } from "react";
import apiInstance from "../../utils/axios.js";
import {Link} from "react-router-dom";
import userData from "../plugin/UserData.jsx";

function TeamsStatus() {
    const [teamsRegisterList, setTeamsRegisterList] = useState([]);
    const user = userData()
    const [searchTeamName, setSearchTeamName] = useState("");
    const [searchRegistrationStatus, setSearchRegistrationStatus] = useState("");

    useEffect(() => {
        apiInstance.get(`status-teams-superuser/${user.user_uid}/`).then((res) => {
            setTeamsRegisterList(res.data);
        });
    }, []);


    return (
        <>
            <div className="formbold-main-wrapper">
                <SidebarAdmin />
                <div className="formbold-form-wrapper">
                    <img className="w-100" style={{ width: "100%", height: "250px", objectFit: "cover" }}
                        src={CompleteFormScreen} alt="form-screen" />
                    <br />
                    <br />

                    <div>
                        <div className="formbold-form-title">
                            <h2 className=""> مشاهده وضعیت تیم ها </h2>
                        </div>

                        <div className='text-center me-1'>
                            <div className="col-md-9 col-lg-12 mb-4 ">
                                <table className="table caption-top styled-table">

                                    <thead>
                                    <tr>
                                        <th scope="col">
                                            <p>نام تیم</p>
                                            <input
                                                type="text"
                                                value={searchTeamName}
                                                onChange={(e) => setSearchTeamName(e.target.value)}
                                                placeholder="جستجو بر اساس نام تیم"
                                            />
                                        </th>
                                        <th scope="col" className='col-lg-2'>
                                            <p>وضعیت ثبت نام تیم</p>
                                        </th>
                                        <th scope="col">مشاهده جزییات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {teamsRegisterList?.filter((team) => {
                                        return team?.name_of_team.toLowerCase().includes(searchTeamName.toLowerCase()) &&
                                            team?.order_status.toLowerCase().includes(searchRegistrationStatus.toLowerCase());
                                    }).map((team) => (
                                        <tr key={team.pid}>
                                            <td>{team?.name_of_team}</td>
                                            <td>
                                                {team?.order_status === "pendingـpayment" && (
                                                    <h5 id="order_status" className="formbold-form-input text-danger">در
                                                        انتظار پرداخت</h5>
                                                )}
                                                {team?.order_status === "waitingـforـpaymentـconfirmation" && (
                                                    <h5 id="order_status"
                                                        className="formbold-form-input text-primary">در انتظار تایید
                                                        پرداخت</h5>
                                                )}
                                                {team?.order_status === "register" && (
                                                    <h5 id="order_status"
                                                        className="formbold-form-input text-success">ثبت نام شده</h5>
                                                )}
                                            </td>
                                            <td><Link to={`${team?.pid}/`}><i
                                                className="fa-solid fa-eye p-2 mb-1 bg-light text-dark"></i></Link></td>
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

export default TeamsStatus;
