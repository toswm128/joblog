import axios from "axios";
import useBlog from "hooks/blog";

class BlogAPI {
  async getBlog() {
    try {
      const result = await axios.get("/");
      if (result.status === 200) {
        console.log(result);
        return result;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default BlogAPI;
