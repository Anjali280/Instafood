import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;
const Image = styled.img``;
const Details = styled.div``;

const Button = styled.button`
  width: 150px;
  border: none;
  padding: 10px 20px;
  background-color: #00acac;
  color: white;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 15px;
`;

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    //event.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const url = await fetch("http://localhost:4000/api/auth/loggedInUser", {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const res = await url.json();
    setUser(res.payload);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div
    //   style={{
    //     backgroundImage:
    //       'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    //     height: "100vh",
    //     backgroundSize: "cover",
    //   }}
    >
      <div>
        <Navbar />
      </div>
      {/* <Container>
        <Image src={user.avatar} alt="cat" width="400px" height="300px" />
        <Details>{user.userName}</Details>
        <Details>{user.fullName}</Details>
        <Details>{user.email}</Details>
        <Button
          onClick={() => {
            navigate("/updateProfile");
          }}
        >
          Update Profile
        </Button>
        <hr />
        <div>
          <Button
            onClick={() => {
              navigate("");
            }}
          >
            Terms & Condition
          </Button>{" "}
          <span></span>
          <Button
            onClick={() => {
              navigate("/changePassword");
            }}
          >
            Change Password
          </Button>
        </div>
      </Container> */}

      <div class="container">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-12 col-xl-4">
            <div class="card">
              <div class="card-body text-center">
                <div class="mt-3 mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    class="rounded-circle img-fluid"
                    alt=""
                  />
                </div>
                <h4 class="mb-2">Julie L. Arsenault</h4>
                <p class="text-muted mb-4">
                  @Programmer <span class="mx-2">|</span>{" "}
                  <a href="#!">mdbootstrap.com</a>
                </p>

                <button
                  type="button"
                  class="btn btn-primary btn-rounded btn-lg"
                >
                  Message now
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
