import axios, { AxiosError, AxiosResponse } from "axios";
import { user, UserType } from "types/UserTypes/type";

class AuthAPI {
  async Login(id: string, pwd: string) {
    const result = await axios.post("login", { id, password: pwd });
    return result;
  }

  async GetUser() {
    const result = await axios.get("user");
    return result;
  }

  async Join(id: string, pwd: string, name: string) {
    const result = await axios.post("join", { id, password: pwd, name });
    return result.status;
  }
}

export default AuthAPI;
