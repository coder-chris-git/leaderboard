import { Button, Input } from "@mui/material";
import React, { Component, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";

function AddPlayers() {
  const [name, setName] = useState("");
  const authContext = useContext(AuthContext);
  const { players } = authContext.game.gameState || [];
  const [showAddUserInput, setShowAddUserInput] = useState(false);

  const [list, setList] = useState([...players]);

  const addUser = async (e) => {
    if (!name) {
      return alert("user must have a name");
    }
    const userObject = { name: name, currentScore: 0, pastScore: 0, futureScore: 0 };

    const items = [...list];

    if (items.length > 0) {
      const index = items.findIndex((object) => {
        return object.name === userObject.name;
      });
      if (index !== -1) {
        return alert("user exists");
      }
    }

    setList((list) => [...list, userObject]);

    setName("");
  };

  useEffect(() => {
    const setContext = async () => {
      await authContext.setGame({
        ...authContext.game.gameState,
        ["players"]: list,
      });

      await localStorage.setItem(
        "game",
        JSON.stringify({
          ...authContext.game.gameState,

          ["players"]: [...list],
        }),
      );
    };
    setContext();
  }, [list]);

  console.log(authContext.game.gameState);

  return (
    <>
      {showAddUserInput ? (
        <div>
          <Input title="username" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Button onClick={(e) => addUser(e)} variant="contained">
            Add User
          </Button>
          <Button title="addUser" name="addUser" variant="contained" onClick={() => setShowAddUserInput(false)}>
            exit
          </Button>
        </div>
      ) : (
        <div>
          <Button title="addUser" name="addUser" variant="contained" onClick={() => setShowAddUserInput(true)}>
            ADD PLAYERS
          </Button>
        </div>
      )}
    </>
  );
}

export default AddPlayers;
