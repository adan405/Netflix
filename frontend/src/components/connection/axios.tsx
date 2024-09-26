import axios from "axios"

const token = "";

const custom_axios = axios.create({
    baseURL : 'http://localhost:4000/',
withCredentials:true,
    headers:{
        Authorization:token,
        Accept:"*/*",
       'Content-Type': 'application/json',
    },
    timeout:5000
})

export default custom_axios;