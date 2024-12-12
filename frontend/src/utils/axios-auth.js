import axios from "axios";
import {BASE_URL} from "./constants.js";
import Cookies from "js-cookie";
const access_token = Cookies.get('access_token')
const apiInstancetwo = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,

    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
    }
})

export default apiInstancetwo
