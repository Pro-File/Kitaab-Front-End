import http from "../baseURL";

class authServices {

  SignUp(data) {
    return http.post("/auth/signup", data);
  }

  SignIn(data) {
    return http.post("/auth/signin", data);
  }
  

}

export default new authServices();