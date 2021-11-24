import jwt_decode from "jwt-decode"
const axios = require('axios')


const axiosInstance = axios.create({
    baseURL:'http://localhost:3000',
    headers:{
        "x-access-token": localStorage.getItem('accessToken'),
        "content-type":'application/json',
        accept:"application/json"
    }
})

const refreshToken = async ()=>{
    const data = {
        "token":localStorage.getItem('refreshToken')
    }
    try {
        const res = await axios.post("http://localhost:3000/api/refresh",data)
        localStorage.setItem('accessToken',res.data.accessToken)
        console.log('acess toke updated : ' + res.data.accessToken)
        localStorage.setItem('refreshToken',res.data.refreshToken)
        console.log('refresh token updated : ' + res.data.refreshToken)
        return res.data
    } catch (err){
        alert("vous avez était déconnecter pour inactivité !")
        localStorage.clear()
        window.location.reload()
        console.log(err)
    }
}

axiosInstance.interceptors.request.use( async (config)=>{
    const currentDate = Math.ceil(Date.now())
    const decodedToken = jwt_decode(localStorage.getItem('accessToken'))
    if(decodedToken.exp * 1000 < currentDate){
        const data = await refreshToken();
        config.headers['x-access-token'] = data.accessToken
    }
    return config;
},(error)=>{
    return Promise.reject(error)
});   

export default axiosInstance