import { getInitials } from "@/utils/helper";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

function ProfileInfo({ onLogout }: { onLogout: () => void }) {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-950">
            {getInitials(user?.fullName)}
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.fullName}</p>
            <button
              className="text-sm text-slate-700 underline"
              onClick={handleLogout}
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
