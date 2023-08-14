import Logo from "../../images/logo.png";
import { useContext } from "react";
import { SearchContext } from "../../context/search";
import "./style.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user";

const Navbar = () => {
  const { typeValue, setTypeValue } = useContext(SearchContext);
  const { userInfo } = useContext(UserContext);
  const searchQuery = (e) => {
    setTypeValue(e.target.value);
  };
  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("avatar");
    window.location.reload(); //
  };
  return (
    <nav className="container-navbar fixed-top">
      <ul className="nav" id="navId">
        <li className="nav-item">
          <Link to="/">
            <img className="nav-logo" src={Logo} alt="" width={100} />
          </Link>
        </li>
        <li className="nav-item1">
          <input
            type="text"
            className="search-item-nav"
            placeholder="Find Video..."
            onChange={searchQuery}
            value={typeValue}
          />
        </li>
        <li className="nav-item2">
          <div className="user-information">
            <img src={userInfo.avatar} alt="" width={30} />
            <h6 style={{ color: "white" }}>{userInfo.username}</h6>
            {userInfo.username && (
              <button className="logoutButton" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
