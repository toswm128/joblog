import axios, { AxiosError, AxiosResponse } from "axios";
import { board } from "pages/Blog/BoardPage/type";
import { banner } from "Store/WriteEditorStore/type";

class BlogAPI {
  async getBlog() {
    try {
      const result = await axios.get("/");
      if (result.status === 200) {
        return result;
      }
    } catch (e) {
      const err = e as AxiosError;
      console.log(err.response?.status);
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
      const err = e as AxiosError;
      console.log(err.response?.status);
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
      const err = e as AxiosError;
      const status = err.response?.status;
      switch (status) {
        case 400:
          console.log("값 부족");
          break;
        case 403:
          console.log("토큰 없음");
      }
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
      const err = e as AxiosError;
      const status = err.response?.status;
      switch (status) {
        case 400:
          console.log("값 부족");
          break;
        case 403:
          console.log("토큰 없음");
      }
    }
  }

  async clickLike(blogId: number, isLike: boolean) {
    try {
      const result = await axios.post(`/blog/likes`, { blogId, isLike });
      if (result.status === 200) {
        return result;
      }
    } catch (e) {
      const err = e as AxiosError;
      const status = err.response?.status;
      switch (status) {
        case 400:
          console.log("값 부족");
          break;
        case 403:
          console.log("토큰 없음");
      }
    }
  }
}

export default BlogAPI;
