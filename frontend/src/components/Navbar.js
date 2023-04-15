import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../screens/Cart";
import Modal from "../Modals";
import { useCart } from "./ContextReducer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Avatar from "@mui/material/Avatar";

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAccount = () => {
    navigate("/profile");
  };

  const [user, setUser] = useState({});

  const fetchUser = async (event) => {
    // event.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const url = await fetch("http://localhost:4000/api/getDetails", {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const res = await url.json();
    setUser(res.payload);
    console.log(res.payload);
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

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
                  <div style={{ display: "flex" }}>
                    <div
                      className="btn bg-white text-success mx-2 "
                      onClick={() => {
                        setCartView(true);
                      }}
                    >
                      <Badge color="secondary" badgeContent={items.length}>
                        <ShoppingCartIcon />
                      </Badge>
                    </div>

                    {cartView ? (
                      <Modal onClose={() => setCartView(false)}>
                        <Cart />
                      </Modal>
                    ) : (
                      ""
                    )}

                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          <Avatar
                            variant="contained"
                            {...bindTrigger(popupState)}
                            alt={user.name}
                            src={user.avatar}
                          />
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={handleAccount}>
                              My account
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                navigate("/myOrder");
                              }}
                            >
                              My Orders
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  </div>
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
