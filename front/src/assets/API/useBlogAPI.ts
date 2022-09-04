import axios, { AxiosError, AxiosResponse } from "axios";
import { board } from "pages/Blog/BoardPage/type";
import { banner } from "Store/WriteEditorStore/type";

const useBlogAPI = () => {
  const getBlog = async (page: number) => {
    const result = await axios.get(`/?page=${page}&limit=23`);
    console.log(result.data);
    return result.data;
  };

  const getBoard = async (idx: string | undefined) => {
    const result: AxiosResponse<any, any> = await axios.get(
      `/blog/board?idx=${idx}`
    );
    return result;
  };

  const GetBlog2UserIdx = async (userIdx: string | undefined, page: number) => {
    const result = await axios.get(
      `blog/user?userIdx=${userIdx}&page=${page}&limit=23`
    );
    return result.data;
  };
  const postImg = async (img: Blob) => {
    const formData = new FormData();
    formData.append("img", img);
    const result = await axios.post("image", formData);
    return result.data;
  };

  const postBoard = async (dom: any, title: string, banner: banner) => {
    const formData = new FormData();
    formData.append("context", JSON.stringify(dom));
    formData.append("title", title);
    formData.append("banner", banner ? banner : "");
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
  };
  const putBoard = async (
    dom: any,
    title: string,
    idx: string,
    banner: banner
  ) => {
    const formData = new FormData();
    formData.append("context", JSON.stringify(dom));
    formData.append("title", title);
    formData.append("idx", idx);
    formData.append("banner", banner ? banner : "");
    try {
      const result = await axios.put(`/blog/post`, formData);
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
  };

  const postComment = async (blogId: number, text: string) => {
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
  };

  const clickLike = async (blogId: number, isLike: boolean) => {
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
  };

  const getSearchBlog = async (title: string | undefined) => {
    const result = await axios.get(`/blog/search?title=${title}`);
    return result;
  };

  const getMyBoard = async (page: number) => {
    const result = await axios.get(`/blog/user?page=${page}&limit=23`);
    console.log(result.data);
    return result.data;
  };

  return {
    getBlog,
    getBoard,
    postBoard,
    putBoard,
    postComment,
    GetBlog2UserIdx,
    postImg,
    clickLike,
    getSearchBlog,
    getMyBoard,
  };
};

export default useBlogAPI;
