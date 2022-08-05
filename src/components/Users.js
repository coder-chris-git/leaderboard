import React, { useState, useEffect, useContext, useCallback } from "react";
import { Input, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";

const Users = () => {
  const authContext = useContext(AuthContext);

  const { players } = authContext.game.gameState;
  console.log(players);

  const [list, setList] = useState([...players]);
  const [username, setUsername] = useState("");
  const [newScore, setNewScore] = useState({});
  const [showAddUserInput, setShowAddUserInput] = useState(false);

  const onSetNewScore = (value, user_name) => {
    const scores = { ...newScore };
    if (value === "") {
      setNewScore({});
    }

    if (!Number(value) || isNaN(Number(value))) {
      const newText = value.slice(0, -1);

      value = newText;
    } else if (isNaN(Number(value))) {
      const newText = value.slice(0, -1);

      value = newText;
    } else {
      scores[user_name] = value;

      setNewScore(scores);
    }
  };
  const setScore = (e, user_name, math_function) => {
    const items = [...list];

    const index = items.findIndex((object) => {
      return object.name === user_name;
    });
    console.log(index);

    const score = Number(newScore[user_name]);
    if (!score) {
      return;
    }

    const item = items[index];
    console.log(item);

    item.pastScore = item.currentScore;
    if (math_function === "+") {
      item.currentScore = item.currentScore + score;
    } else {
      item.currentScore = item.currentScore - score;
    }

    items[index] = item;
    setList(items);
    newScore[user_name] = "";
  };

  // useEffect(() => {
  //   const setContext = async () => {
  //     await authContext.setGame({
  //       ...authContext.game.gameState,
  //       ["players"]: list,
  //     });
  //     await localStorage.setItem(
  //       "game",
  //       JSON.stringify({
  //         num: list.length,
  //         players: [...list],
  //         winners: [],
  //       }),
  //     );
  //   };

  //   setContext();
  // }, [newScore]);

  const undo = (e, user_name) => {
    const items = [...list];

    const index = items.findIndex((object) => {
      return object.name === user_name;
    });

    const item = items[index];

    const score = item.pastScore;

    item.currentScore = item.pastScore;

    items[index] = item;
    newScore[user_name] = "";

    setList(items);
  };

  // const redo = (e, user_name) => {
  //   const items = [...list];

  //   const index = list.findIndex((object) => {
  //     console.log("redo" + user_name);
  //     return object.name === user_name;
  //   });

  //   const item = items[index];
  //   console.log(item.futureScore.length - 1);

  //   const { score, math_function } = item.futureScore[item.futureScore.length - 1];
  //   console.log(score, math_function);
  //   console.log(score);
  //   if (math_function == "-") {
  //     item.pastScore.push({ score: score, math_function: "+" });

  //     item.currentScore = item.currentScore - item.futureScore.pop().score;
  //   } else if (math_function == "+") {
  //     item.pastScore.push({ score: score, math_function: "-" });
  //     item.currentScore = item.currentScore + item.futureScore.pop().score;
  //   } else if (math_function == "/") {
  //     item.pastScore.push({ score: score, math_function: "*" });
  //     item.currentScore = item.currentScore / item.futureScore.pop().score;
  //   } else {
  //     item.pastScore.push({ score: score, math_function: "/" });
  //     item.currentScore = item.currentScore * item.futureScore.pop().score;
  //   }

  //   items[index] = item;

  //   setList(items);
  //   setNewScore({});

  //   // };
  // };

  // const userInput = showAddUserInput ? (
  //   <div>
  //     <Input title="username" placeholder="name" value={username} onChange={(e) => setUsername(e.target.value)} />
  //     <Button onClick={(e) => addUser(e)} variant="contained">
  //       Add User
  //     </Button>
  //     <Button title="addUser" name="addUser" variant="contained" onClick={() => setShowAddUserInput(false)}>
  //       exit
  //     </Button>
  //   </div>
  // ) : (
  //   <div>
  //     <Button title="addUser" name="addUser" variant="contained" onClick={() => setShowAddUserInput(true)}>
  //       ADD PLAYERS
  //     </Button>
  //   </div>
  // );

  // useEffect(() => {
  //   const setContext = async () => {
  //     await authContext.setGameState({
  //       ...authContext.gameState,
  //       ["players"]: list,
  //     });

  //     await localStorage.setItem(
  //       "game",
  //       JSON.stringify({
  //         num: list.length,
  //         players: [...list],
  //         winners: [],
  //       }),
  //     );
  //   };

  //   setContext();
  // }, [list]);
  useEffect(() => {
    const setContext = async () => {
      await authContext.setGameState({
        ...authContext.gameState,
        ["players"]: list,
      });
      await localStorage.setItem(
        "game",
        JSON.stringify({
          num: list.length,
          players: [...list],
          winners: [],
        }),
      );
    };

    setContext();
  }, [list]);
  const users = [...list] || [];

  const listAllUser = users.map((item, i) => (
    <div key={item.name}>
      <div marigin="10px">
        {String(i + 1).slice(-1) == "1" ? (
          <li>{i + 1}st</li>
        ) : String(i + 1).slice(-1) == "2" ? (
          <li>{i + 1}nd</li>
        ) : String(i + 1).slice(-1) === "3" ? (
          <li>{i + 1}rd</li>
        ) : (
          <li>{i + 1}th</li>
        )}

        <li>{item.name}</li>
        <li>{item.currentScore}</li>
      </div>

      <div>
        <Input
          id={newScore + item.name}
          value={newScore[item.name] || ""}
          onChange={(e) => onSetNewScore(e.target.value, item.name)}
        />
      </div>

      <div flexdirection={"row"}>
        <Button type="number" onClick={(e) => setScore(e, item.name, "+")}>
          ADD
        </Button>
        <Button onClick={(e) => setScore(e, item.name, "-")}>SUBTRACT</Button>
      </div>
      <div>
        {item.pastScore ? (
          <Button title="undo" name="undo" value="undo" onClick={(e) => undo(e, item.name)}>
            undo
          </Button>
        ) : null}
        {/* {item.futureScore.length > 0 ? <Button title="redo" onPress={(e) => redo(e, item.name)} /> : null} */}
      </div>
    </div>
  ));

  return (
    <>
      <div>
        <Button onClick={(e) => authContext.logout(e)}>Logout</Button>
        {listAllUser}
      </div>
    </>
  );
};

export default Users;
