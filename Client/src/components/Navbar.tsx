import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const onLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between bg-white px-6 py-2 drop-shadow">
      <h2 className="cursor-pointer py-2 text-xl font-semibold text-black">
        Notee
      </h2>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo onLogout={onLogout} />
    </div>
  );
}

export default Navbar;
