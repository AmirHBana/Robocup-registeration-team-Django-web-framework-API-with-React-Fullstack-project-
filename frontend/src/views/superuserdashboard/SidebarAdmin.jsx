import "../../views/userdashboard/CSS/SidebarUser.css";
import {Link, useLocation} from "react-router-dom";

function SidebarAdmin() {

    const location = useLocation()

    return (
        <>
        <bodytt>
        <div className="area"></div>
        <nav className="main-menu" style={{right: '0'}}>
            <ul>
                <li>
                    <Link to="/teams-status" style={{backgroundColor: location.pathname === "/teams-status"  ? 'silver' :'light', color: location.pathname === "/teams-status"  ? 'darkred' :'light' }}>
                        <i className="fa fa-users fa-2x text-light"></i>
                        <span className="nav-text">
                        مشاهده وضعیت تیم ها
                    </span>
                    </Link>
                </li>
                <li className="has-subnav">
                    <Link to="/confirm-payment" style={{backgroundColor: location.pathname === "/confirm-payment"  ? 'silver' :'light', color: location.pathname === "/confirm-payment"  ? 'darkred' :'light' }}>
                        <i className="fa fa-credit-card fa-2x  text-warning"></i>
                        <span className="nav-text">
                        تایید پرداختی ها
                    </span>
                    </Link>
                </li>
                <li className="has-subnav">
                    <Link to="/certain-price/member" style={{backgroundColor: location.pathname === "/certain-price/member"  ? 'silver' :'light', color: location.pathname === "/certain-price/member"  ? 'darkred' :'light' }}>
                        <i className="fa fa-usd fa-2x text-success "></i>
                        <span className="nav-text">
                        تعیین هزینه ثبت نام اعضاء
                    </span>
                    </Link>
                </li>
                <li className="has-subnav">
                    <Link to="/certain-information/hotel" style={{backgroundColor: location.pathname === "/certain-information/hotel"  ? 'silver' :'light', color: location.pathname === "/certain-information/hotel"  ? 'darkred' :'light' }}>
                        <i className="fa fa-bed fa-2x text-primary"></i>
                        <span className="nav-text">
                        تعیین هتل و محل اقامت
                    </span>
                    </Link>
                </li>
                <li>
                    <Link to="/news-management/create" style={{backgroundColor: location.pathname === "/news-management/create"  ? 'silver' :'light', color: location.pathname === "/news-management/create"  ? 'darkred' :'light' }}>
                        <i className="fa fa-paper-plane fa-2x text-info"></i>
                        <span className="nav-text">
                    ثبت خبر جدید
                    </span>
                    </Link>
                </li>
                <li>
                    <Link to="/news-management" style={{backgroundColor: location.pathname === "/news-management"  ? 'silver' :'light', color: location.pathname === "/news-management"  ? 'darkred' :'light' }}>
                        <i className="fa fa-trash fa-2x text-danger"></i>
                        <span className="nav-text">
                        مدیریت و حذف اخبار
                    </span>
                    </Link>
                </li>
                <li>
                    <Link to="/league-management" style={{backgroundColor: location.pathname === "/league-management"  ? 'silver' :'light', color: location.pathname === "/league-management"  ? 'darkred' :'light' }}>
                        <i className="fa fa-sitemap fa-2x text-light"></i>
                        <span className="nav-text">
                        مدیریت لیگ ها
                    </span>
                    </Link>
                </li>
                <li>
                    <Link to="/reset-password/admin" style={{backgroundColor: location.pathname === "/reset-password/admin"  ? 'silver' :'light', color: location.pathname === "/reset-password/admin"  ? 'darkred' :'light' }}>
                        <i className="fa fa-cogs fa-2x text-secondary"></i>
                        <span className="nav-text">
                        تغییر رمز عبور
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
    )
}

export default SidebarAdmin