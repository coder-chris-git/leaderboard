import logo from "./logo.svg";
import "./App.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Users from "./components/Users";
import Login from "./components/Login";

import { AuthContext, AuthProvider } from "./context/AuthContext";
import { AxiosProvider } from "./context/AxiosContext";
import SignUp from "./components/SignUp";
import { GameContext } from "./context/GameContext";
import AddPlayers from "./components/AddPlayers";

function App() {
  const authContext = useContext(AuthContext);
  const gameContext = useContext(GameContext);
  const [status, setStatus] = useState("loading");

  const [userState, setUserState] = useState(false);
  const loadJWT = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const authenticated = localStorage.getItem("authenticated");
      const game = localStorage.getItem("game");
      authContext.setGameState(JSON.parse(game));

      await authContext.setAuthState({
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
        authenticated: authenticated || null,
      });

      setStatus("success");
      setUserState(true);
    } catch (error) {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);
  if (authContext?.authState?.authenticated) {
    return (
      <>
        <AddPlayers players={authContext.gameState} />

        {authContext?.gameState?.players !== "undefined" ? <Users /> : "no"}
      </>
    );
  } else {
    return <Login />;
  }
}

export default App;
