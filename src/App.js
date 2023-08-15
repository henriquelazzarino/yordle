import { useContext, useEffect, useState } from "react";
import { GameContext } from "./context/GameContext";
import Game from "./components/Game";

function App() {
  return <div className="App">
    <Game />
  </div>;
}

export default App;
