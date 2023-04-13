import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
    geolocation: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://instafood-backend.onrender.com/api/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          avatar: credentials.avatar,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (json.success) {
      navigate("/login");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form className="w-50 m-auto mt-5 border bg-dark border-success rounded">
          <div className="m-4">
            <label for="name" className="form-label">
              Name
            </label>
            <input
              placeholder="Enter the Username "
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>

          <div className="m-4">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              placeholder="Enter the email "
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>

          <div className="m-4">
            <label for="exampleInputavatar" className="form-label">
              Avatar
            </label>
            <input
              placeholder="Enter the Avatar "
              type="url"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="avatar"
              value={credentials.avatar}
              onChange={onChange}
            />
          </div>

          <div className="m-4">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              placeholder="Enter the password "
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <div className="m-4">
            <label for="exampleInputPassword1" className="form-label">
              Add Address
            </label>
            <input
              placeholder="Enter the Address "
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className=" m-4 btn btn-success"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <Link to="/login" className="m-4 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
