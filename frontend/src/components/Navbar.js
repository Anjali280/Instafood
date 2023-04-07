import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import Badge from "react-bootstrap/Badge";
import Cart from "../screens/Cart";
import Modal from "../Modals";
import { useCart } from "./ContextReducer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const items = useCart();
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
                    to="/myOrder"
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
                  <div
                    className="btn bg-white text-success mx-2 "
                    onClick={() => {
                      setCartView(true);
                    }}
                  >
                    <Badge color="secondary" badgeContent={items.length}>
                      <ShoppingCartIcon />
                    </Badge>

                    {/* <ShoppingCartIcon />
                    <Badge pill bg="danger">
                      {items.length}
                    </Badge> */}
                  </div>

                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                  ) : (
                    ""
                  )}

                  <button
                    className="btn text-white bg-danger"
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
