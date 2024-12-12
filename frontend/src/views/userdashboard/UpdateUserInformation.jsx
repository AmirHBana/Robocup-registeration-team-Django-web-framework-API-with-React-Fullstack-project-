import Sidebar from "./Sidebar.jsx";
import CompleteFormScreen from "../../assets/StyleForm/CompleteFormScreen.png";
import {useEffect, useState} from "react";
import apiInstance from "../../utils/axios.js";
import Swal from "sweetalert2";
import userData from "../plugin/UserData.jsx";
import {Link, useNavigate} from "react-router-dom";


const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})

function UpdateUserInformation() {

    const [league, setLeague] = useState('');
    const [selectedLeague, setSelectedLeague] = useState('');
    const [universitySchoolStatus, setUniversitySchoolStatus] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const user = userData();
    const [birthday, setBirthday] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [shahrestan, setShahrestan] = useState("");
    const [address, setAddress] = useState("");
    const [zip_code, setZipCode] = useState("");
    const [name_of_team, setNameOfTeam] = useState("");
    const [number_of_teams, setNumberOfTeams] = useState("");
    const [hotelStatus, setHotelStatus] = useState(false);

    useEffect(() => {
        apiInstance.get('league/').then((res) => {
            setLeague(res.data);
        });
    }, []);

  const handleLeagueChange = (e) => {
        const selectedLeague = league.find(item => item.title === e.target.value);
        if (selectedLeague) {
            setSelectedLeague(selectedLeague.id);
        }
    };
  const handleUniversitySchoolStatusChange = (e) => {
      setUniversitySchoolStatus(e.target.value);
  };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
            setSelectedFile(file);
            setFileError('');
        } else {
            setFileError('فایل باید از نوع PDF باشد و حجم آن نباید بیشتر از 5 مگابایت باشد');
            document.getElementById('fileError').classList.add('error');
        }
    };

    const handleCheckboxChange4 = (e) => {
        setHotelStatus(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!selectedLeague) {
            Toast.fire({
                icon: 'error',
                title: 'لطفا لیگ را انتخاب کنید'
            });
            return;
        }

        if (!universitySchoolStatus) {
            Toast.fire({
                icon: 'error',
                title: 'لطفا وضعیت عضو تیم را انتخاب کنید'
            });
            return;
        }
        if (!selectedFile) {
            Toast.fire({
                icon: 'error',
                title: 'لطفا PDF خود را دوباره بارگذاری کنید'
            });
        }

        // API Call to Save Data
        const formData = new FormData();
        // formData.append("id", user.user_uid);
        formData.append("league", selectedLeague);
        formData.append("birthday", birthday);
        formData.append("country", country);
        formData.append("city", city);
        formData.append("shahrestan", shahrestan);
        formData.append("address", address);
        formData.append("zip_code", zip_code);
        formData.append("name_of_team", name_of_team);
        formData.append("number_of_teams", number_of_teams);
        formData.append("university_school_status", universitySchoolStatus);
        formData.append("hotel_status", hotelStatus);
        formData.append("PDF_file", selectedFile);

        try {
            await apiInstance.patch(`update-user-profile/${user.user_uid}/`, formData, {
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

    useEffect(() => {
        apiInstance.patch(`update-user-profile/${user.user_uid}/`).then((res => {
            console.log(res.data);
        }))
    }, []);


    return (
        <>
      <div className="formbold-main-wrapper">
        <Sidebar />
        <div className="formbold-form-wrapper">
          <img className="w-100" style={{ width: "100%", height: "250px", objectFit: "cover" }} src={CompleteFormScreen} alt="form-screen" />
          <br />
            <form action="https://formbold.com/s/FORM_ID" method="POST" onSubmit={handleSubmit}>
                <div className="formbold-form-title">
                    <h2 className="">بروزرسانی اطلاعات سرپرست تیم</h2>
                    <p>
                        سرپرست گرامی لطفا اطلاعات خود را در صورت نیاز تغییر دهید.
                        <br/>
                        تمامی موارد را کامل کرده و ارسال کنید
                    </p>
                    <p className='text-danger'>
                        درصورتی که وضعیت ثبت نام شما در انتظار تایید ادمین یا ثبت نام شده میباشد.<br/>
                        قادر به تغییر اطلاعات نمی باشید

                    </p>
                </div>

                <div>
                    <label htmlFor="league" className="formbold-form-label"> لیگ را انتخاب کنید </label>
                    <select name="league" id="league" className="formbold-form-input" value={selectedLeague.title}
                            onChange={handleLeagueChange}>
                        <option value="">انتخاب کنید</option>
                        {Array.isArray(league) && league.map(league => (
                            <option key={league.id} value={league.title}>{league.title}</option>
                        ))}
                    </select>
                </div>
                <br/>
                <div className="formbold-input-flex">
                    <div>
                        <label htmlFor="birthday" className="formbold-form-label">
                            تاریخ تولد سرپرست
                        </label>
                        <input type="text" name="birthday" id="birthday" className="formbold-form-input"
                               placeholder='1370/04/08' onChange={(e) => setBirthday(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="name_of_team" className="formbold-form-label"> نام تیم </label>
                        <input type="text" name="name_of_team" id="name_of_team" className="formbold-form-input"
                               placeholder='نام تیم خود را وارد نمایید'
                               onChange={(e) => setNameOfTeam(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="number_of_teams" className="formbold-form-label"> تعداد اعضای تیم </label>
                    <input type="number" name="number_of_teams" id="number_of_teams" className="formbold-form-input"
                           placeholder='تعداد اعظای تیم بدون شمارش سرپرست تیم'
                           onChange={(e) => setNumberOfTeams(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label htmlFor="university_school_status" className="formbold-form-label"> عضو تیم </label>
                    <input type="radio" id="university" name="university_school_status" value="university"
                           style={{marginLeft: '1%'}} onChange={handleUniversitySchoolStatusChange}/>
                    <label htmlFor="university" style={{marginLeft: '11%'}}>دانشگاه</label>
                    <input type="radio" id="school" name="university_school_status" value="school"
                           style={{marginLeft: '1%'}} onChange={handleUniversitySchoolStatusChange}/>
                    <label htmlFor="school">مدرسه</label>
                </div>

                <br/>
                <div className="formbold-mb-3">
                    <label htmlFor="upload_file" className="formbold-form-label"> بارگذاری فایل PDF </label>
                    <input type="file" accept=".pdf" name="upload_file" id="upload_file"
                           className="formbold-form-input"
                           onChange={handleFileChange}/>
                    <span className="error-message" id="fileError">{fileError}</span>
                </div>
                <br/>

                <div className='formbold-input-flex'>
                    <div className="formbold-checkbox-wrapper">
                        <label htmlFor="hotelStatus" className="formbold-checkbox-label" style={{marginRight: '1%'}}>
                            <input type="checkbox" id="hotelStatus" className="formbold-input-checkbox"
                                   checked={hotelStatus} onChange={handleCheckboxChange4}/>
                            <span className={`formbold-checkbox-inner ${hotelStatus ? "checked" : ""}`}>✓</span>
                            اسکان (هتل) ..... مشاهده هتل
                        </label>
                    </div>
                    <Link to='/complete/information/hotel' target='_blank'>
                        <p><i className="fa-solid fa-eye p-1 mb-2 bg-dark text-white"></i></p>
                    </Link>
                </div>

                <br/>

                <div className="formbold-input-flex">
                    <div>
                        <label htmlFor="country" className="formbold-form-label"> کشور </label>
                        <input type="text" name="country" id="country" className="formbold-form-input"
                               placeholder='نام کشور محل اقامت' onChange={(e) => setCountry(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="city" className="formbold-form-label"> شهر </label>
                        <input type="text" name="city" id="city" className="formbold-form-input" placeholder='نام شهر'
                               onChange={(e) => setCity(e.target.value)}/>
                    </div>
                </div>
                <div className="formbold-mb-3">
                    <label htmlFor="city" className="formbold-form-label"> شهرستان </label>
                    <input type="text" name="city" id="city" className="formbold-form-input"
                           placeholder='نام شهرستان خود را وارد کنید' onChange={(e) => setShahrestan(e.target.value)}/>
                </div>

                <div className="formbold-mb-3">
                    <label htmlFor="address" className="formbold-form-label">
                        آدرس
                    </label>
                    <input type="text" name="address" id="address" className="formbold-form-input"
                           placeholder='آدرس خود را وارد کنید' onChange={(e) => setAddress(e.target.value)}/>
                </div>

                <div className="formbold-input-flex">
                    <div>
                        <label htmlFor="zip_code" className="formbold-form-label"> کد پستی </label>
                        <input type="text" name="zip_code" id="zip_code" className="formbold-form-input"
                               placeholder='1234354543' onChange={(e) => setZipCode(e.target.value)}/>
                    </div>

                </div>
                <br/>
                <button type='submit' className="formbold-btn">ثبت تغییرات اعمال شده</button>
            </form>
        </div>
      </div>
        </>
    )
}

export default UpdateUserInformation