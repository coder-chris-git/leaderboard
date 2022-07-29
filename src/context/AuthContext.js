import React, { createContext, useState } from "react";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});
  const [gameState, setGameState] = useState({});
  const [playerState, setPlayerState] = useState({});

  const logout = async (e) => {
    console.log(e);
    localStorage.clear();

    setAuthState({
      accessToken: "",
      refreshToken: "",
      authenticated: "",
    });

    setGameState({
      players: [],
      rounds: [],
      eliminated: [],
      winner: {},
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };
  const getPlayers = () => {
    return gameState.players;
  };
  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        gameState,
        setGameState,
        setAuthState,
        logout,
        getPlayers,
        playerState,
        setPlayerState,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
