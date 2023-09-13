import Game from "./components/Game/Game";
import "./App.css";
import Keyboard from "./components/Keyboard/Keyboard";
import Footer from "./components/Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "./context/GameContext";
import { Alert, Snackbar } from "@mui/material";

function App() {
  const {
    lose,
    win,
    answer,
    size,
    notFound,
  } = useContext(GameContext);

  const [notFound2, setNotFound2] = useState(false);
  const [size2, setSize2] = useState(false);

  useEffect(() => {
    if (notFound) {
      setNotFound2(true);
    }
    if (size) {
      setSize2(true);
    }
  }, [notFound, size]);

  return (
    <div className="App">
      <Game />
      <Keyboard />
      <Footer />
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
        open={size2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1500}
        onClose={() => setSize2(false)}
      >
        <Alert severity="info" variant="filled">
          Not enough letters!
        </Alert>
      </Snackbar>
      <Snackbar
        open={notFound2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1500}
        onClose={() => setNotFound2(false)}
      >
        <Alert severity="info" variant="filled">
          Champion doesn't exist!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
