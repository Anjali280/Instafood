import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/icons-material/Badge";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { IconButton } from "@mui/material";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            InstaFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5 mx-3 active"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div>
              {!localStorage.getItem("token") ? (
                <form className="d-flex">
                  <Link className="btn bg-white text-success mx-1 " to="/login">
                    Login
                  </Link>
                  <Link
                    className="btn bg-white text-success mx-1"
                    to="/createuser"
                  >
                    Signup
                  </Link>
                </form>
              ) : (
                <div>
                  {/* <div className="btn bg-white text-success mx-2 ">My Cart</div> */}
                  {/* <div className="btn bg-white text-success mx-2 ">
                    <Badge color="secondary" badgeContent={10}>
                      <ShoppingCartIcon />
                    </Badge>
                    Cart
                  </div> */}
                  <IconButton aria-label="cart">
                    <Badge badgeContent={4} color="secondary">
                      <ShoppingCartSharpIcon />
                    </Badge>
                  </IconButton>

                  <button
                    className="btn bg-white text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
