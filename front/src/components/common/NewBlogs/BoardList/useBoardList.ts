import { useEffect, useState } from "react";
import { blog } from "types/BlogTypes/type";

const useBoardList = () => {
  const [flex, setFlex] = useState(0);
  const [flexData, setFlexData] = useState<blog[][]>([[]]);

  const getFlex = (breakpoints: number[]) => {
    const { innerWidth: width } = window;
    let flex = 1;
    breakpoints.map((point, index) => {
      if (point <= width) flex = index + 2;
    });
    console.log(flex);

    setFlex(flex);
    return flex;
  };

  const flexBlog = (blogList: blog[]) => {
    if (flex) {
      const flexBlogs = [];
      for (let i = 0; i < Math.floor(blogList.length / flex); i++) {
        flexBlogs.push(blogList.slice(i * flex, flex * (i + 1)));
      }
      setFlexData(flexBlogs);
    }
  };

  const handleResize = () => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  };

  return { getFlex, flexBlog, flexData, flex };
};

export default useBoardList;
