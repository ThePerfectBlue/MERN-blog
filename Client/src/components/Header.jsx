import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { baseurl } from "../../baseurl";
import KeepAlive from "../../keep-alive";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/v1/user/profile`, {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post(
        `${baseurl}/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("User logged out");
        setUser(null);
      }
    } catch (error) {
      console.log("Error logging out ", error);
    }
  };

  return (
    <header>
      <KeepAlive />
      <Link to="/" className="logo">
        <img className="logo-img" src="/r.png" alt="logo" />
      </Link>
      <nav>
        {user && (
          <>
            <Link to="/create">Create Post</Link>
            <Link className="link-logout" to="/" onClick={logout}>
              {" "}
              Logout "{user.username}"
            </Link>
          </>
        )}{" "}
        {!user && (
          <>
            <Link className="login-btn" to="/login">
              Login
            </Link>
            <Link className="register-btn" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
