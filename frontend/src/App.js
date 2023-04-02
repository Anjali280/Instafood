import "./App.css";
import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
