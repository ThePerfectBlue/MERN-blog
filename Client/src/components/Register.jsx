import axios from "axios";
import { useState } from "react";

const Register = () => {
  const initialData = {
    username: "",
    email: "",
    password: "",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      username: username,
      email: email,
      password: password,
    };

    setData(newData);

    // axios request
    try {
      // axios request
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        newData
      );

      if (response.status === 201) {
        alert("User registered successfully");
      }
      console.log("This is the response: ", response);
    } catch (error) {
      // Handle error
      console.log("Error:", error);
      alert("User registration failed");
    }
  };

  return (
    <div id="register">
      <h2 className="page-title">Registration Form</h2>
      <div className="container align-form">
        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="email">Email </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            type="email"
            id="email"
          />

          <label htmlFor="username">Username </label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name="username"
            type="text"
            id="username"
          />

          <label htmlFor="password">Password </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            type="password"
            id="password"
          />

          <button className="btn-register" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
