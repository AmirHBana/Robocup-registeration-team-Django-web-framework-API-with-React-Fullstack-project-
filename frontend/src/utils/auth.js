import { useAuthStore } from "../store/auth.js"
import axios from "./axios"
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import userData from "../views/plugin/UserData.jsx"

const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar:true,
})

// export const login = async (email, password) => {
//     try {
//         const {data, status} = await axios.post("user/token/", {
//             email,
//             password
//         })
//
//         if (status === 200){
//             setAuthUser(data.access, data.refresh)
//
//             // Alert : sign-in successfully
//         }
//         return { data, error: null }
//
//     } catch (error) {
//         return {
//             data: null,
//             error: error.response.data?.detail || 'Somthing went wrong'
//         };
//     }
// }

export const login = async (username, password) => {
    try {
        const { data, status } = await axios.post("login-user/", {
            username,
            password
        });

        if (status === 200) {
            setAuthUser(data.access, data.refresh);
            Toast.fire({
                icon: "success",
                title: "با موفقیت وارد شدید"
            })
            return { data, error: null };

        } else {
            return { data: null, error: 'دوباره تلاش فرمایید' };
        }
    } catch (error) {
        if (error.response) {
            return { data: null, error: error.response.data?.detail || 'دوباره تلاش فرمایید' };
        } else {
            return { data: null, error: 'دوباره تلاش فرمایید' };
        }
    }
};


export const register = async (first_name, last_name, national_code, phone_number, email, password, password2) => {
    try {
        const { data } = await axios.post('register-user/', {
            first_name,
            last_name,
            national_code,
            phone_number,
            email,
            password,
            password2
        })

        // await login(phone_number, password)

        // Alert - Sign-up successfully
        Toast.fire({
            icon: "success",
            title: "با موفقیت ثبت نام شدید"
        })

        return { data, error: null }
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'دوباره تلاش کنید'
        };
    }
}

export const forgetpassword = async (national_code, username, email, password2, password3) => {
    try {
        const { data } = await axios.post('forgot-user-password/', {
            national_code,
            username,
            email,
            password2,
            password3,
        })

        // Alert - Sign-up successfully
        Toast.fire({
                icon: "success",
                title: "با موفقیت رمز عبور شما تغییر کرد"
            })

        return { data, error: null }
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'دوباره تلاش فرمایید'
        };
    }
}

export const resetpassword = async (id, password, password2, password3) => {
    try {
        const { data } = await axios.post('reset-user-password/', {
            id,
            password,
            password2,
            password3,
        })

        // Alert - Sign-up successfully
        Toast.fire({
            icon: "success",
            title: "با موفقیت رمز عبور شما تغییر کرد"
        })

        return { data, error: null }
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'دوباره تلاش فرمایید'
        };
    }
}

const user = userData()
export const resetpasswordadmin = async (password, password2, password3) => {
    try {
        const { data } = await axios.post(`reset-superuser-password/${user.user_uid}/`, {
            password,
            password2,
            password3,
        })

        // Alert - Sign-up successfully
        Toast.fire({
            icon: "success",
            title: "با موفقیت رمز عبور شما تغییر کرد"
        })

        return { data, error: null }
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'دوباره تلاش فرمایید'
        };
    }
}



export const loginsuperuser = async (username, password) => {
    try {
        const { data, status } = await axios.post("login-superuser/", {
            username,
            password
        });

        if (status === 200) {
            setAuthUser(data.access, data.refresh);
            Toast.fire({
                icon: "success",
                title: "با موفقیت وارد شدید"
            })
            return { data, error: null };

        } else {
            return { data: null, error: 'دوباره تلاش فرمایید' };
        }
    } catch (error) {
        if (error.response) {
            return { data: null, error: error.response.data?.detail || 'دوباره تلاش فرمایید' };
        } else {
            return { data: null, error: 'دوباره تلاش فرمایید' };
        }
    }
};


export const registersuperuser = async (first_name, last_name, national_code, phone_number, email, ramz_shakhsi, password, password2) => {
    try {
        const { data } = await axios.post('register-superuser/', {
            first_name,
            last_name,
            national_code,
            phone_number,
            ramz_shakhsi,
            email,
            password,
            password2
        })

        // await login(phone_number, password)

        // Alert - Sign-up successfully
        Toast.fire({
                icon: "success",
                title: "با موفقیت ثبت نام شدید"
            })

        return { data, error: null }
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'دوباره تلاش کنید'
        };
    }
}

export const forgetpasswordsuperuser = async (national_code, username, email, password2, password3) => {
    try {
        const { data } = await axios.post('forgot-superuser-password/', {
            national_code,
            username,
            email,
            password2,
            password3,
        })

        // Alert - Sign-up successfully
        Toast.fire({
                icon: "success",
                title: "با موفقیت رمز عبور شما تغییر کرد"
            })

        return { data, error: null }
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'دوباره تلاش فرمایید'
        };
    }
}

export const logout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")

    useAuthStore.getState().setUser(null)

    // Alert - Signout successfully
}



export const setUser = async () => {
    const accessToken = Cookies.get("access_token")
    const refreshToken = Cookies.get("refresh_token")

    if (!accessToken || !refreshToken) {
        return;
    }

    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)
    } else {
        setAuthUser(accessToken, refreshToken)
    }
}



export const setAuthUser = (access_token, refresh_token) => {
    Cookies.set('access_token', access_token, {
        expires: 1,
        secure: true
    })

    Cookies.set('refresh_token', refresh_token, {
        expires: 7,
        secure: true
    })

    const user = jwt_decode(access_token) ??null

    if (user) {
        useAuthStore.getState().setUser(user)
    }
    useAuthStore.getState().setLoading(false)
}




export const getRefreshToken = async () => {
    const refresh_token = Cookies.get("refresh_token")
    const response = await axios.post('user/token/refresh/', {
        refresh: refresh_token
    })

    return response.data
}



export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwt_decode(accessToken)
        return decodedToken.exp < Date.now() / 100
    } catch (error) {
        console.log(error);
        return true
    }
}