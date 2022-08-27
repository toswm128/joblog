/* eslint-disable react-hooks/exhaustive-deps */
import useAuthAPI from "hooks/API/useAuthAPI";
import useBlogAPI from "assets/API/useBlogAPI";
import { likes } from "pages/Blog/BoardPage/type";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Profile from "components/common/Profile";
import LikeButton from "components/common/Buttons/LikeButton";
import KebabButton from "components/common/Buttons/KebabButton";

interface IBoardHeader {
  idx: string;
  title: string;
  userIdx: number;
  profile: string;
  name: string;
  regdate: string;
  likes: likes;
  isMyBoard: boolean;
}

const BoardHeader = ({
  idx,
  userIdx,
  title,
  profile,
  name,
  regdate,
  likes,
  isMyBoard,
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
      <div className="title">
        {title}
        {isMyBoard && (
          <KebabButton>
            <h1>aa</h1>
          </KebabButton>
        )}
      </div>
      <div className="info">
        <Profile
          isMe={false}
          idx={userIdx}
          name={name}
          src={profile}
          regdate={regdate}
        />
        <LikeButton
          isLike={isLike}
          onClick={onClickLike}
          likes={likes.length}
        />
      </div>
    </>
  );
};

export default BoardHeader;
