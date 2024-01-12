import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";

const Navbar = () => {
  const BACKEND_URL = "https://backend-booking-app.onrender.com/api";

  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`);
      dispatch({ type: "LOGOUT" });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BUKING</span>
        </Link>
        {/* {user ? user.username : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )} */}
        {user ? (
          <div className="navItems">
            <span className="username">{user.username}</span>
            {user.img && (
              <div className="profileImageContainer">
              <img src={user.img} alt="Profile" className="profileImg" />
              </div>
            )}
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to={"/register"}>
              <button className="navButton">Register</button>
            </Link>
            <Link to={"/login"}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
