import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrder";
import Profile from "./screens/Profile";
import ChangePassword from "./screens/ChangePassword";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
          <Route path="/myOrder" element={<MyOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<ChangePassword />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
