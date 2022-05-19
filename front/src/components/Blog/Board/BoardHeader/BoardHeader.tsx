import heart from "assets/png/heart.png";

interface IBoardHeader {
  title: string;
  profile: string;
  name: string;
  regdate: string;
}

const BoardHeader = ({ title, profile, name, regdate }: IBoardHeader) => {
  return (
    <>
      <div className="title">{title}</div>
      <div className="info">
        <div className="profil">
          <img className="profilImg" src={profile} alt="" />
          <h4>{name}</h4>
          <p>{regdate}</p>
        </div>
        <img src={heart} alt="" />
      </div>
    </>
  );
};

export default BoardHeader;
