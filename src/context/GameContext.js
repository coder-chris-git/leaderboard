import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const GameContext = createContext(null);
const { Provider } = GameContext;

const GameProvider = ({ children }) => {
  const [game, setGame] = useState({
    _id: "",
    gameState: {
      players: [],
      rounds: [],
      eliminated: [],
      winner: {},
    },
    title: "",
  });

  return (
    <Provider
      value={{
        game,
        setGame,
      }}
    >
      {children}
    </Provider>
  );
};

export { GameContext, GameProvider };
