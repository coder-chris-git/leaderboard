import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const GameContext = createContext(null);
const { Provider } = GameContext;

const GameProvider = ({ children }) => {
  const [gameState, setGamesState] = useState({
    players: [],
    rounds: [],
    eliminated: [],
    winner: {},
  });

  return (
    <Provider
      value={{
        gameState,
        setGamesState,
      }}
    >
      {children}
    </Provider>
  );
};

export { GameContext, GameProvider };
