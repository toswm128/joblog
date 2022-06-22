import { Link } from "react-router-dom";
import MyProfileImg from "./MyProfileImg";

interface IProfile {
  isMe: boolean;
  idx: number;
  name?: string;
  src: string;
  regdate?: string;
}

const Profile = ({ isMe, idx, name, src, regdate }: IProfile) => {
  return (
    <div className="profil">
      {isMe ? (
        <MyProfileImg src={src} />
      ) : (
        <Link to={`/user/${idx}`} className="profil">
          <img className="profilImg" src={src} alt="" />
          <div>
            <h4>{name}</h4>
            <p>{regdate}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Profile;
