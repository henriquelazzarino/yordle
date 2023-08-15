import { useEffect, useState } from "react";
import champions from "./data/champions.txt"

function App() {
  const [answer, setAnswer] = useState();

  useEffect(()=>{
    fetch(champions)
    .then(res => res.json())
    .then(res => {
      const firstItem = res;
      console.log(firstItem);
    });
  }, [])

  useEffect(()=>{
    console.log(answer)
  }, [answer])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
