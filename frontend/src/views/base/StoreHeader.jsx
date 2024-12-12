import { useAuthStore } from "../../store/auth.js";
import { Link } from 'react-router-dom'



function StoreHeader() {

    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ])

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" to="/"><i className="fa-solid fa-house"></i> خانه </Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        ورود شرکت کنندگان
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {isLoggedIn()
                                            ?
                                            <>
                                                <li><Link className="dropdown-item"
                                                          to={'/complete/information'}>داشبورد سرپرست</Link></li>
                                                    <li><Link className="dropdown-item text-danger"
                                                              to="/logout">خروج از حساب کاربری</Link></li>
                                                    </>
                                            :
                                            <>
                                                <li><Link className="dropdown-item" to="/login"><i
                                                    className="fa fa-user-circle" aria-hidden="true"></i> ورود سرپرست
                                                    تیم</Link></li>
                                                <li><Link className="dropdown-item" to="/register"> <i
                                                    className="fa fa-user-plus" aria-hidden="true"></i>ثبت نام سرپرست
                                                    تیم </Link></li>

                                            </>
                                        }
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        ادمین پنل
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {isLoggedIn()
                                            ?
                                            <>
                                                <li><Link className="dropdown-item"
                                                          to="/teams-status">داشبورد مدیریتی</Link></li>
                                                <li><Link className="dropdown-item text-danger"
                                                          to="/logout">خروج از حساب کاربری</Link></li>
                                            </>
                                            :
                                            <>
                                                <li><Link className="dropdown-item" to="/admin-login"> <i
                                                    className="fa fa-user-circle" aria-hidden="true"></i> ورود
                                                    ادمین</Link></li>
                                                <li><Link className="dropdown-item" to="/admin-register"><i
                                                    className="fa fa-user-plus" aria-hidden="true"></i> ثبت نام ادمین</Link>
                                                </li>

                                            </>
                                        }
                                    </ul>
                                </li>

                            </ul>

                            {/*<Link className="btn btn-primary me-2" to="/login">Login</Link>*/}
                            {/*<Link className="btn btn-primary me-2" to="/register">Register</Link>*/}


                            {/* These are the button rendered based on users logged in status */}
                            {/* You could just un-comment it ;) */}




                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}


export default StoreHeader