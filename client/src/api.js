import axios from 'axios' 
import {jwtDecode} from 'jwt-decode' 


let api = axios.create({
        baseURL: "http://localhost:8000/api",
        withCredentials: true
 })

   let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
 api.interceptors.request.use(async (config)=>{

        if (config.url === '/auth/refresh') return config
        if(accessToken){ 
            console.log('i am from interceptor')
            let decoded = jwtDecode(accessToken)
            if (decoded.exp * 1000 < Date.now()) {
                console.log('i am from refresh')
                 let res = await api.post('/auth/refresh')
                 accessToken = res.data.accessToken 
                 localStorage.setItem('accessToken', JSON.stringify(accessToken))
              }
              
          config.headers.Authorization = `Bearer ${accessToken}`
          config.headers['Content-Type'] = 'multipart/form-data'
       }
       return config
  }) 

  export default api  