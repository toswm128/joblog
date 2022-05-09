import React, { useState } from "react";
import Header from "components/common/header";
import heart from "assets/png/heart.png";
import Comment from "components/Blog/Board/Comment/CommentItem";
import { CommentInput } from "components/common/styleObject/InputStyle";
import { WriteButton } from "components/common/styleObject/ButtonStyle";
import { useQuery, useQueryClient } from "react-query";
import BlogAPI from "assets/API/BlogAPI";
import { useParams } from "react-router-dom";
import BoardContext from "components/Blog/Board/Content/BoardContext";
import ReactTextareaAutosize from "react-textarea-autosize";
import Board from "components/Blog/Board";

const BlogPage = () => {
  const { idx } = useParams();

  return (
    <>
      <Header />
      <Board idx={idx} />
    </>
  );
};

export default BlogPage;
