import axios, { AxiosResponse } from "axios";
import useBlog from "hooks/blog";
import { board } from "pages/DetailPage/type";

class BlogAPI {
  async getBlog() {
    try {
      const result = await axios.get("/");
      if (result.status === 200) {
        return result;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getBoard(idx: string | undefined) {
    try {
      const result: AxiosResponse<board, any> = await axios.get(
        `/blog/board?idx=${idx}`
      );
      if (result.status === 200) {
        return result;
      }
    } catch (e) {
      console.log(e);
    }
  }
  async postBoard(data: any) {
    try {
      const result = await axios.post(`/blog/post`, data);
      if (result.status === 200) {
        return result;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default BlogAPI;
