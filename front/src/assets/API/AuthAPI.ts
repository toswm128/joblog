import axios from "axios";

class AuthAPI {
  async Login(id: string, pwd: string) {
    const result = await axios.post("login", { id, password: pwd });
    if (result.status === 200) {
      localStorage.setItem("AccessToken", result.data.data);
    }
    return result;
  }

  async Join(id: string, pwd: string, name: string) {
    const result = await axios.post("join", { id, password: pwd, name });
    return result.status;
  }
}

export default AuthAPI;
