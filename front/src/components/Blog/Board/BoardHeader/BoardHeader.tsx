import useAuthAPI from "hooks/API/useAuthAPI";
import useBlogAPI from "assets/API/useBlogAPI";
import heart from "assets/png/heart.png";
import unHeart from "assets/png/unHeart.png";
import { likes } from "pages/Blog/BoardPage/type";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Profile from "components/common/Profile";

interface IBoardHeader {
  idx: string;
  title: string;
  userIdx: number;
  profile: string;
  name: string;
  regdate: string;
  likes: likes;
}

const BoardHeader = ({
  idx,
  userIdx,
  title,
  profile,
  name,
  regdate,
  likes,
}: IBoardHeader) => {
  const { clickLike } = useBlogAPI();
  const { GetUser } = useAuthAPI();
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
        <Profile
          userIdx={userIdx}
          name={name}
          profile={profile}
          regdate={regdate}
        />
        <div className="heart">
          <img src={isLike ? heart : unHeart} alt="" onClick={onClickLike} />
          <div>{likes.length}</div>
        </div>
      </div>
    </>
  );
};

export default BoardHeader;
