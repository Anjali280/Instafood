import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const fetchUser = async (event) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const url = await fetch(
      "https://instafood-85uo.onrender.com/api/getDetails",
      {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await url.json();
    setUser(res.payload);
    console.log(res.payload);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg?cs=srgb&dl=pexels-cats-coming-1907227.jpg&fm=jpg")',
        height: "100vh",
        backgroundSize: "cover",
      }}

      // style={{ backgroundColor: "#B46060" }}
    >
      <div>
        <Navbar />
      </div>

      <div class="container" style={{ height: "500px", marginTop: "50px" }}>
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-12 col-xl-4">
            <div class="card ">
              <div
                class="card-body text-center"
                style={{ height: "500px", backgroundColor: "#f0ffe0" }}
              >
                <div
                  class="mt-3 mb-4"
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={user.avatar}
                    height="400px"
                    width="400px"
                    alt="pic"
                  />
                </div>
                <h4 class="mb-2">{user.name}</h4>
                <h5 class="text-black mb-3">
                  <a href="#!" style={{ color: "#198754" }}>
                    {user.email}
                  </a>
                </h5>
                <h5 class="mb-3 text-black">{user.location}</h5>

                <button
                  type="button"
                  class="btn btn-rounded btn-lg"
                  style={{ backgroundColor: "#198754", color: "white" }}
                  onClick={() => {
                    navigate("/password");
                  }}
                >
                  CHANGE PASSWORD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
