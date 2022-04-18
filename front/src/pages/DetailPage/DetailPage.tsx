import React from "react";
import Header from "components/header";
import {
  DetailPageContainer,
  DetailPageContent,
  DetailCommentsList,
} from "./DetailPageStyle";
import heart from "assets/png/heart.png";
import Comment from "components/Comment";
import { MainPageContainer } from "pages/MainPage/MainPageStyle";
import BoardItem from "components/BoardItem";
import { CommentInput } from "components/common/InputStyle";
import { WriteButton } from "components/common/ButtonStyle";

const DetailPage = () => {
  return (
    <>
      <Header />
      <DetailPageContainer>
        <img
          className="banner"
          src="https://4.bp.blogspot.com/-Q4xvnaN8nRA/XQSar7IrP4I/AAAAAAAABFM/4snWrZNx_18pgJKIJJHczXMIPtpfCznpACLcBGAs/s1600/fromis-20190614-224241-001.jpg"
          alt=""
        />
        <DetailPageContent>
          <div className="title">제에에에에목</div>
          <div className="info">
            <div className="profil">
              <img
                className="profilImg"
                src="https://thumbs.gfycat.com/UnluckyQualifiedArabianwildcat-size_restricted.gif"
                alt=""
              />
              <p>2022.02.03</p>
            </div>
            <img src={heart} alt="" />
          </div>
          <div className="content">sss</div>
          <DetailCommentsList>
            <div className="commentForm">
              <div>
                <img
                  className="profilImg"
                  src="https://thumbs.gfycat.com/UnluckyQualifiedArabianwildcat-size_restricted.gif"
                  alt=""
                />
                <CommentInput placeholder="댓글을 입력해 주세요" />
              </div>
              <div>
                <WriteButton>작성하기</WriteButton>
              </div>
            </div>
            <p>
              <div></div>ㅈ<text>{4}개의 댓글</text>
            </p>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <p>
              <div></div>
              <text>다른 게시글</text>
            </p>
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
      </DetailPageContainer>
    </>
  );
};

export default DetailPage;
