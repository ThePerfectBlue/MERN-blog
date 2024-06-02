import axios from "axios";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { baseurl } from "../../baseurl";

const Login = () => {
  const initialData = {
    username: "",
    password: "",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState(initialData);
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const newData = {
      username: username,
      password: password,
    };
    setLoginData(newData);

    try {
      const response = await axios.post(
        `${baseurl}/api/v1/user/login`,
        newData,
        { withCredentials: true }
      );

      // =>>>> consoling login response <<<<
      console.log(response);

      if (response.status === 200) {
        setUser(response.data.user);
        setRedirect(true);
        alert("Logged in successfully");
      }
    } catch (error) {
      alert(error.response.data);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div id="login">
      <div className="container align-form">
        <form className="login-form" action="#" onSubmit={handleLogin}>
          <h2 className="page-title">Login Here</h2>
          <label htmlFor="username">Username </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            type="text"
            id="username"
          />
          <label htmlFor="password">Password </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            id="password"
          />
          <button className="btn-login" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
