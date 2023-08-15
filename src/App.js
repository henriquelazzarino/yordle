import { useEffect, useState } from "react";
import champions from "./data/champions.txt"

function App() {
  const [answer, setAnswer] = useState(null);

  useEffect(()=>{
    if (answer==null) { 
      fetch(champions)
      .then(res => res.text())
      .then(res2 => {
        const array = res2.split(/\r?\n/)
        setAnswer(array[Math.floor(Math.random()*array.length)])
      })
    }
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
