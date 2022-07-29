import { Button, Input } from "@mui/material";
import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";

function SignUp() {
  const [state, setState] = useState({ username: "", email: "", password: "", authenticated: false });
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  function setValue(e) {
    const value = e.target.value;
    setState({
      ...state,

      [e.target.name]: value,
    });
  }

  const onSignUp = async () => {
    const { username, email, password, authenticated } = state;
    try {
      const response = await publicAxios.post("/register", {
        username,
        email,
        password,
        authenticated,
      });
      // navigation.navigate("ConfirmUser", { params: { email: email } });

      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const styles = {
    row: {
      display: "flex",

      flexDirection: "column",
      padding: 0,
      height: "600",
    },
  };
  return (
    <div style={styles.row}>
      <Input name="username" onChange={(e) => setValue(e)} placeholder="username" />
      <Input name="email" onChange={(e) => setValue(e)} placeholder="email" />
      <Input name="password" onChange={(e) => setValue(e)} placeholder="password" />
      <Button type="button" title="button" onClick={(e) => onSignUp(e)}>
        Sign Up
      </Button>
    </div>
  );
}

export default SignUp;
