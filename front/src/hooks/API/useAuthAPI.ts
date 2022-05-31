import axios from "axios";

const useAuthAPI = () => {
  const Login = async (id: string, pwd: string) => {
    const result = await axios.post("login", { id, password: pwd });
    return result;
  };

  const GetUser = async () => {
    const result = await axios.get("user");
    return result;
  };

  const Join = async (id: string, pwd: string, name: string) => {
    const result = await axios.post("join", { id, password: pwd, name });
    return result.status;
  };

  return { Login, GetUser, Join };
};

export default useAuthAPI;
