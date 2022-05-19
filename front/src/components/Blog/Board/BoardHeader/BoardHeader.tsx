import BlogAPI from "assets/API/BlogAPI";
import heart from "assets/png/heart.png";
import { useMutation } from "react-query";

interface IBoardHeader {
  idx: string;
  title: string;
  profile: string;
  name: string;
  regdate: string;
}

const BoardHeader = ({ idx, title, profile, name, regdate }: IBoardHeader) => {
  const { clickLike } = new BlogAPI();
  const mutation = useMutation(
    ({ idx, isLike }: { idx: number; isLike: boolean }) =>
      clickLike(idx, isLike)
  );

  return (
    <>
      <div className="title">{title}</div>
      <div className="info">
        <div className="profil">
          <img className="profilImg" src={profile} alt="" />
          <h4>{name}</h4>
          <p>{regdate}</p>
        </div>
        <img
          src={heart}
          alt=""
          onClick={() => {
            idx && mutation.mutate({ idx: +idx, isLike: false });
          }}
        />
      </div>
    </>
  );
};

export default BoardHeader;
