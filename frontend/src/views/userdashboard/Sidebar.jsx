import '../userdashboard/CSS/SidebarUser.css';
import {Link, useLocation} from "react-router-dom";

function Sidebar() {

    const location = useLocation()

  return (
      <>
        <bodytt>
        <div className="area"></div>
        <nav className="main-menu" style={{right: '0'}}>
          <ul>
            <li>
              <Link to="/">
                <i className="fa fa-home fa-2x text-success"></i>
                <span className="nav-text">
                        خانه
                    </span>
              </Link>
            </li>
            <li  className="has-subnav">
              <Link to="/complete/information" style={{backgroundColor: location.pathname === "/complete/information"  ? 'silver' :'light', color: location.pathname === "/complete/information"  ? 'darkred' :'light' }}>
                <i className="fa fa-user-secret fa-2x text-primary"></i>
                <span className="nav-text">
                     تکمیل اطلاعات سرپرست
                    </span>
              </Link>
            </li>
            <li className="has-subnav">
              <Link to="/update/information" style={{backgroundColor: location.pathname === "/update/information"  ? 'silver' :'light', color: location.pathname === "/update/information"  ? 'darkred' :'light' }}>
                <i className="fa fa-user-circle fa-2x text-white"></i>
                <span className="nav-text">
                        بروزرسانی و تغییر اطلاعات سرپرست
                    </span>
              </Link>
            </li>
            <li className="has-subnav">
              <Link to="/create/member" style={{backgroundColor: location.pathname === "/create/member"  ? 'silver' :'light', color: location.pathname === "/create/member"  ? 'darkred' :'light' }}>
                <i className="fa fa-user-plus fa-2x text-white"></i>
                <span className="nav-text">
                        ثبت عضو جدید تیم
                    </span>
              </Link>
            </li>
            <li>
              <Link to="/management/member" style={{backgroundColor: location.pathname === "/management/member"  ? 'silver' :'light', color: location.pathname === "/management/member"  ? 'darkred' :'light' }}>
                <i className="fa fa-users fa-2x text-danger"></i>
                <span className="nav-text">
                         حذف اعضای تیم من
                    </span>
              </Link>
            </li>
            <li>
              <Link to="/send-picture/payment" style={{backgroundColor: location.pathname === "/send-picture/payment"  ? 'silver' :'light', color: location.pathname === "/send-picture/payment"  ? 'darkred' :'light' }}>
                <i className="fa fa-camera-retro fa-2x text-info"></i>
                <span className="nav-text">
                        ارسال عکس واریز وجه
                    </span>
              </Link>
            </li>
            <li>
              <Link to="/payment/status" style={{backgroundColor: location.pathname === "/payment/status"  ? 'silver' :'light', color: location.pathname === "/payment/status"  ? 'darkred' :'light' }}>
                <i className="fa fa-credit-card fa-2x text-warning"></i>
                <span className="nav-text">
                        وضعیت پرداختی من
                    </span>
              </Link>
            </li>
            <li>
              <Link to="/reset/password" style={{backgroundColor: location.pathname === "/reset/password"  ? 'silver' :'light', color: location.pathname === "/reset/password"  ? 'darkred' :'light' }}>
                <i className="fa fa-cogs fa-2x text-light"></i>
                <span className="nav-text">
                        تغییر رمزعبور
                    </span>
              </Link>
            </li>
          </ul>

          <ul className="logout">
            <li>
              <Link to='/logout'>
                <i className="fa fa-power-off fa-2x"></i>
                <span className="nav-text">
                        خروج از حساب کاربری
                    </span>
              </Link>
            </li>
          </ul>
        </nav>
        </bodytt>


      </>
  );
}

export default Sidebar;
