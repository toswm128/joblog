import BlogAPI from "assets/API/BlogAPI";
import heart from "assets/png/heart.png";
import unHeart from "assets/png/unHeart.png";
import useUser from "hooks/user";
import { likes } from "pages/Blog/BoardPage/type";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

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
  const { user } = useUser();
  const [isLike, setIsLike] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ idx, isLike }: { idx: number; isLike: boolean }) =>
      clickLike(idx, isLike)
  );
  const isUserLike = useCallback(() => {
    return likes.some(({ userIdx }) => userIdx === user.userId);
  }, [likes, user.userId]);
  console.log(likes);
  useEffect(() => {
    setIsLike(isUserLike());
  }, [likes, setIsLike, user.userId]);

  const onClickLike = () => {
    idx &&
      mutation.mutate(
        { idx: +idx, isLike },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(`board/${idx}`);
            setIsLike(!isLike);
          },
        }
      );
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
