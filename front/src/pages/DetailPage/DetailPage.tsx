import React, { useState } from "react";
import Header from "components/header";
import {
  DetailPageContainer,
  DetailPageContent,
  DetailCommentsList,
} from "./DetailPageStyle";
import heart from "assets/png/heart.png";
import Comment from "components/Comment";
import { MainPageContainer } from "pages/MainPage/MainPageStyle";
import { CommentInput } from "components/common/InputStyle";
import { WriteButton } from "components/common/ButtonStyle";
import { useQuery, useQueryClient } from "react-query";
import BlogAPI from "assets/API/BlogAPI";
import { useParams } from "react-router-dom";
import BoardContext from "components/BoardContext";
import ReactTextareaAutosize from "react-textarea-autosize";
import { board } from "./type";

const DetailPage = () => {
  const { idx } = useParams();
  const { getBoard } = new BlogAPI();
  const [commentText, setCommentText] = useState("");
  const { isFetched, data: { data: board } = {} } = useQuery(
    "Detail/board",
    () => getBoard(idx),
    {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 0,
    }
  );
  console.log(board);

  return (
    <>
      <Header />
      <DetailPageContainer>
        {isFetched && board ? (
          <>
            <img className="banner" src={board.data.blog.banner} alt="" />
            <DetailPageContent>
              <div className="title">{board.data.blog.title}</div>
              <div className="info">
                <div className="profil">
                  <img
                    className="profilImg"
                    src="https://thumbs.gfycat.com/UnluckyQualifiedArabianwildcat-size_restricted.gif"
                    alt=""
                  />
                  <p>{board.data.blog.regdate}</p>
                </div>
                <img src={heart} alt="" />
              </div>
              <div className="content">
                <BoardContext context={board.data.blog.context} />
              </div>
              <DetailCommentsList>
                <div className="commentForm">
                  <div>
                    <img
                      className="profilImg"
                      src="https://thumbs.gfycat.com/UnluckyQualifiedArabianwildcat-size_restricted.gif"
                      alt=""
                    />
                    <ReactTextareaAutosize
                      className="commentTextarea"
                      spellCheck={false}
                      minRows={2}
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="댓글을 입력해 주세요"
                    />
                  </div>
                  <div>
                    <WriteButton>작성하기</WriteButton>
                  </div>
                </div>
                <div className="listTtile">
                  <p></p>
                  <span>{board.data.comments.length}개의 댓글</span>
                </div>
                {board.data.comments.map(comment => (
                  <Comment text={comment.text} />
                ))}
                <div className="listTtile">
                  <p></p>
                  <span>다른 게시글</span>
                </div>
              </DetailCommentsList>
            </DetailPageContent>
            <MainPageContainer>
              {/* <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem /> */}
            </MainPageContainer>
          </>
        ) : (
          <>
            <img className="banner" style={{ backgroundColor: "#c4c4c4" }} />
            <DetailPageContent>
              <div className="title"></div>
              <div className="info">
                <div className="profil">
                  <img
                    className="profilImg"
                    style={{ backgroundColor: "#c4c4c4" }}
                  />
                  <p></p>
                </div>
                <img src={heart} alt="" />
              </div>
              <div className="content"></div>
              <DetailCommentsList>
                <div className="commentForm">
                  <div>
                    <img
                      className="profilImg"
                      style={{ backgroundColor: "#c4c4c4" }}
                    />
                    <CommentInput placeholder="댓글을 입력해 주세요" />
                  </div>
                  <div>
                    <WriteButton>작성하기</WriteButton>
                  </div>
                </div>
                <div className="listTtile">
                  <p></p>
                  <span>{0}개의 댓글</span>
                </div>
                <div className="listTtile">
                  <p></p>
                  <span>다른 게시글</span>
                </div>
              </DetailCommentsList>
            </DetailPageContent>
          </>
        )}
        <MainPageContainer>
          {/* <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem /> */}
        </MainPageContainer>
      </DetailPageContainer>
    </>
  );
};

export default DetailPage;
