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

  const GetUser2UserIdx = async (userIdx: string | undefined) => {
    const result = await axios.get(`user?userIdx=${userIdx}`);
    return result;
  };

  const PatchMyProfile = async (file: FormData) => {
    const result = await axios.patch("user/profile", file);
    return result;
  };

  const PatchMyName = async (name: string) => {
    const result = await axios.patch("user/name", { name });
    return result;
  };

  return { Login, GetUser, Join, GetUser2UserIdx, PatchMyProfile, PatchMyName };
};

export default useAuthAPI;
