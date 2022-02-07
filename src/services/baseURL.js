import axios from "axios";

const http =  axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json"
  }
});

http.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${(JSON.parse(localStorage.getItem('profile')).token)}`
  }
  return req;
})

export default http;