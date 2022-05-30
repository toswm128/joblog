import AuthAPI from "assets/API/AuthAPI";
import BlogAPI from "assets/API/BlogAPI";
import heart from "assets/png/heart.png";
import unHeart from "assets/png/unHeart.png";
import { likes } from "pages/Blog/BoardPage/type";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface IBoardHeader {
  idx: string;
  title: string;
  profile: string;
  name: string;
  regdate: string;
  likes: likes;
}

const BoardHeader = ({
  idx,
  title,
  profile,
  name,
  regdate,
  likes,
}: IBoardHeader) => {
  const { clickLike } = new BlogAPI();
  const { GetUser } = new AuthAPI();
  const { data: { data } = {} } = useQuery("myInfo", GetUser);
  const [isLike, setIsLike] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => clickLike(+idx, isLike), {
    onSuccess: () => {
      queryClient.invalidateQueries(`board/${idx}`);
      queryClient.invalidateQueries(`getBoard`);
      setIsLike(!isLike);
    },
  });

  const isUserLike = useCallback(() => {
    return likes.some(({ userIdx }) => userIdx === data?.idx);
  }, [likes, data?.idx]);

  useEffect(() => {
    setIsLike(isUserLike());
  }, [likes, setIsLike, data?.idx]);

  const onClickLike = () => {
    idx && mutate();
  };

  return (
    <>
      <div className="title">{title}</div>
      <div className="info">
        <div className="profil">
          <img className="profilImg" src={profile} alt="" />
          <h4>{name}</h4>
          <p>{regdate}</p>
        </div>
        <img src={isLike ? heart : unHeart} alt="" onClick={onClickLike} />
        <div>{likes.length}</div>
      </div>
    </>
  );
};

export default BoardHeader;
