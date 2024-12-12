import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css'
import RegisterUser from "./views/authentication/user/RegisterUser.jsx";
import MainPage from "./views/mainpage/MainPage.jsx";
import MainPageListOfTeam from "./views/mainpage/MainPageListOfTeam.jsx";
import LoginUser from "./views/authentication/user/LoginUser.jsx";
import ForgetPasswordUser from "./views/authentication/user/ForgetPasswordUser.jsx";
import RegisterSuperUser from "./views/authentication/superuser/RegisterSuperUser.jsx";
import LoginSuperUser from "./views/authentication/superuser/LoginSuperUser.jsx";
import ForgetPasswordSuperUser from "./views/authentication/superuser/ForgetPasswordSuperUser.jsx";
import StoreHeader from "./views/base/StoreHeader.jsx";
import StoreFooter from "./views/base/StoreFooter.jsx";
import Logout from "./views/authentication/Logout.jsx";
import CompleteUserInformation from "./views/userdashboard/CompleteUserInformation.jsx";
import MainWrapper from "./layout/MainWrapper.jsx";
import PrivateRoute from "./layout/PrivateRoute.jsx";
import CertainPricePerMember from "./views/superuserdashboard/CertainPricePerMember.jsx";
import PrivateRouteAdmin from "./layout/PrivateRouteAdmin.jsx";
import ResetPasswordForUser from "./views/userdashboard/ResetPasswordForUser.jsx";
import UpdateUserInformation from "./views/userdashboard/UpdateUserInformation.jsx";
import ResetPasswordForAdmin from "./views/superuserdashboard/ResetPasswordForAdmin.jsx";
import CertainHotelInformationAdmin from "./views/superuserdashboard/CertainHotelInformationAdmin.jsx";
import PaymentStatusVisualUser from "./views/userdashboard/PaymentStatusVisualUser.jsx";
import SendPicturePaymentUser from "./views/userdashboard/SendPicturePaymentUser.jsx";
import ConfirmPaymentBySuperuser from "./views/superuserdashboard/ConfirmPaymentBySuperuser.jsx";
import ConfirmPaymentBySuperuserDetail from "./views/superuserdashboard/ConfirmPaymentBySuperuserDetail.jsx";
import League from "./views/superuserdashboard/League.jsx";
import CreateNews from "./views/superuserdashboard/CreateNews.jsx";
import ManageNews from "./views/superuserdashboard/ManageNews.jsx";
import CreateMember from "./views/userdashboard/CreateMember.jsx";
import ManagementMember from "./views/userdashboard/ManagementMember.jsx";
import UpdateMember from "./views/userdashboard/UpdateMember.jsx";
import ObservHotelArrengedByAdmin from "./views/userdashboard/ObservHotelArrengedByAdmin.jsx";
import NewsDetail from "./views/mainpage/NewsDetail.jsx";
import TeamsStatus from "./views/superuserdashboard/TeamsStatus.jsx";
import TeamsStutusDetail from "./views/superuserdashboard/TeamsStutusDetail.jsx";



function App() {
  // const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
          <StoreHeader />
              <MainWrapper>
                  <Routes>
                      {/*Authentication User Components*/}
                      <Route path='/register' element={<RegisterUser />} />
                      <Route path='/login' element={<LoginUser />} />
                      <Route path='/forgotpassword' element={<ForgetPasswordUser />} />
                      <Route path='/logout' element={<Logout />} />

                      {/*Authentication SuperUser Components*/}
                      <Route path='/admin-register' element={<RegisterSuperUser />} />
                      <Route path='/admin-login' element={<LoginSuperUser />} />
                      <Route path='/admin-forgotpassword' element={<ForgetPasswordSuperUser />} />


                      {/*User Dashboard page*/}
                      <Route path='/complete/information' element={<PrivateRoute><CompleteUserInformation /></PrivateRoute>} />
                      <Route path='/update/information' element={<PrivateRoute><UpdateUserInformation /></PrivateRoute>} />
                      <Route path='/complete/information/hotel' element={<PrivateRoute><ObservHotelArrengedByAdmin /></PrivateRoute>} />
                      <Route path='/create/member' element={<PrivateRoute><CreateMember /></PrivateRoute>} />
                      <Route path='/management/member' element={<PrivateRoute><ManagementMember /></PrivateRoute>} />
                      <Route path='/update/member' element={<PrivateRoute><UpdateMember /></PrivateRoute>} />
                      <Route path='/payment/status' element={<PrivateRoute><PaymentStatusVisualUser /></PrivateRoute>} />
                      <Route path='/send-picture/payment' element={<PrivateRoute><SendPicturePaymentUser /></PrivateRoute>} />
                      <Route path='/reset/password' element={<PrivateRoute><ResetPasswordForUser /></PrivateRoute>} />


                      {/*SuperUser Dashboard page*/}
                      <Route path='/teams-status' element={<PrivateRouteAdmin><TeamsStatus /></PrivateRouteAdmin>} />
                      <Route path='/teams-status/:pid' element={<PrivateRouteAdmin><TeamsStutusDetail /></PrivateRouteAdmin>} />
                      <Route path='/certain-price/member' element={<PrivateRouteAdmin><CertainPricePerMember /></PrivateRouteAdmin>} />
                      <Route path='/certain-information/hotel' element={<PrivateRouteAdmin><CertainHotelInformationAdmin /></PrivateRouteAdmin>} />
                      <Route path='/confirm-payment' element={<PrivateRouteAdmin><ConfirmPaymentBySuperuser /></PrivateRouteAdmin>} />
                      <Route path='/confirm-payment/:payid' element={<PrivateRouteAdmin><ConfirmPaymentBySuperuserDetail /></PrivateRouteAdmin>} />
                      <Route path='/league-management' element={<PrivateRouteAdmin><League /></PrivateRouteAdmin>} />
                      <Route path='/news-management/create' element={<PrivateRouteAdmin><CreateNews /></PrivateRouteAdmin>} />
                      <Route path='/news-management' element={<PrivateRouteAdmin><ManageNews /></PrivateRouteAdmin>} />
                      <Route path='/reset-password/admin' element={<PrivateRouteAdmin><ResetPasswordForAdmin /></PrivateRouteAdmin>} />


                      {/*mane page*/}
                      <Route path='/' element={<MainPage />} />
                      <Route path='/teams-register' element={<MainPageListOfTeam />} />
                      <Route path='/news/:nid' element={<NewsDetail />} />


                  </Routes>
              </MainWrapper>
          <StoreFooter />
      </BrowserRouter>

  )
}

export default App
