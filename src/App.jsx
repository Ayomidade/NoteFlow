import { useState } from "react";
import Route_ from "./routes/Route_";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Route_ />
    </>
  );
}

export default App;
