import Game from "./components/Game/Game";
import "./App.css";
import Keyboard from "./components/Keyboard/Keyboard";
import Footer from "./components/Footer/Footer";
import { useContext } from "react";
import { GameContext } from "./context/GameContext";
import { Alert, Snackbar } from "@mui/material";

function App() {
  const {
    lose,
    win,
    answer,
    size,
    notFound,
    setWin,
    setLose,
    setNotFound,
    setSize,
  } = useContext(GameContext);

  return (
    <div className="App">
      <Game />
      <Keyboard />
      {/* <Footer /> */}
      <Snackbar
        open={lose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">
          Game Over! The answer was {answer}
        </Alert>
      </Snackbar>
      <Snackbar
        open={win}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          You Win!
        </Alert>
      </Snackbar>
      <Snackbar
        open={size}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1500}
        onClose={() => setSize(false)}
      >
        <Alert severity="info" variant="filled">
          Not enough letters!
        </Alert>
      </Snackbar>
      <Snackbar
        open={notFound}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1500}
        onClose={() => setNotFound(false)}
      >
        <Alert severity="info" variant="filled">
          Champion doesn't exist!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
