import { IUser } from "@/types/user.interface";
import { getInitials } from "@/utils/helper";
import { Link } from "react-router-dom";

function ProfileInfo({
  userInfo,
  onLogout,
}: {
  userInfo: IUser;
  onLogout: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {userInfo ? (
        <>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-950">
            {getInitials(userInfo.fullName)}
          </div>
          <div>
            <p className="text-sm font-semibold">{userInfo.fullName}</p>
            <button
              className="text-sm text-slate-700 underline"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <button className="btn-primary px-7">
          <Link to="/login">Login</Link>
        </button>
      )}
    </div>
  );
}

export default ProfileInfo;
