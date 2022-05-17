import axios, { AxiosError } from "axios";

class AuthAPI {
  async Login(id: string, pwd: string) {
    try {
      const result = await axios.post("login", { id, password: pwd });
      if (result.status === 200) {
        localStorage.setItem("AccessToken", result.data.data.token);
        axios.defaults.headers.common["Authorization"] = result.data.data.token;
      }
      return result;
    } catch (e) {
      const err = e as AxiosError;
      console.log(err.response?.status);
    }
  }

  async GetUser2Id() {
    try {
      const result = await axios.get("user");
      return result;
    } catch (e) {
      const err = e as AxiosError;
      console.log(err.response?.status);
    }
  }

  async Join(id: string, pwd: string, name: string) {
    try {
      const result = await axios.post("join", { id, password: pwd, name });
      return result.status;
    } catch (e) {
      const err = e as AxiosError;
      console.log(err.response?.status);
    }
  }
}

export default AuthAPI;
