import { Button, Input } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";

const Login = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const [state, setState] = useState({ username: "", password: "" });

  function setValue(e) {
    const value = e.target.value;
    setState({
      ...state,

      [e.target.name]: value,
    });
  }
  const onLogin = async () => {
    const { username, password } = state;
    console.log(username);
    try {
      const response = await publicAxios.post("/login", {
        username,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;
      console.log(refreshToken, username);

      const authenticated = user.authenticated;
      console.log(authContext);

      authContext.setAuthState({
        accessToken,
        refreshToken,
        username,
        authenticated,
      });
      console.log(authContext.authState);

      // // console.log(43 + authContext.authState.token);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", authContext.authState.refreshToken);
      localStorage.setItem("authenticated", true);
    } catch (error) {
      if (error.response.status === 400) {
        alert("Login Failed", error.response.data.message);
      }
      alert("Login Failed", error.response.data.message);
    }
  };
  return (
    <div>
      <Input name="username" onChange={(e) => setValue(e)} placeholder="username" />
      <Input name="password" onChange={(e) => setValue(e)} placeholder="password" />
      <Button type="button" title="button" onClick={() => onLogin()}>
        Login
      </Button>
    </div>
  );
};

export default Login;
