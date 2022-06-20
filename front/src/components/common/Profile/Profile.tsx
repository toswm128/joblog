import { Link } from "react-router-dom";

interface IProfile {
  userIdx: number;
  name: string;
  profile: string;
  regdate: string;
}

const Profile = ({ userIdx, name, profile, regdate }: IProfile) => {
  return (
    <div className="profil">
      <Link to={`/user/${userIdx}`} className="profil">
        <img className="profilImg" src={profile} alt="" />
        <div>
          <h4>{name}</h4>
          <p>{regdate}</p>
        </div>
      </Link>
    </div>
  );
};

export default Profile;
