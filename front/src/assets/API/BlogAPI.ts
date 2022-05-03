import axios, { AxiosResponse } from "axios";
import useBlog from "hooks/blog";
import { board } from "pages/DetailPage/type";
import { UserStateType } from "Store/UserStore/type";
import { banner } from "Store/WriteEditorStore/type";

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
  async postBoard(dom: any, title: string, banner: banner) {
    const formData = new FormData();
    formData.append("context", JSON.stringify(dom).replaceAll("\\n", "\\\\n"));
    formData.append("title", title);
    banner && formData.append("banner", banner);
    try {
      const result = await axios.post(`/blog/post`, formData);
      if (result.status === 200) {
        return result;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async postComment(blogId: number, text: string) {
    try {
      const result: AxiosResponse<board, any> = await axios.post(
        `/blog/comment`,
        {
          blogId,
          text,
        }
      );
      if (result.status === 200) {
        return result;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default BlogAPI;
