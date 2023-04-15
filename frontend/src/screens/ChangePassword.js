import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 15px;

  border-bottom: 2px solid #00acac;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: #198754;
`;

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });
  const { OldPassword, NewPassword, ConfirmPassword } = formFields;

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handlePassword = async (event) => {
    if (NewPassword !== ConfirmPassword) {
      alert("new and confirm password do not match");
      return;
    }
    const token = JSON.parse(localStorage.getItem("token"));
    event.preventDefault();
    const url = await fetch(
      "https://instafood-85uo.onrender.com/api/changePassword",
      {
        method: "PATCH",
        body: JSON.stringify({
          oldPassword: OldPassword,
          newPassword: NewPassword,
        }),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await url.json();
    console.log(res);

    if (res.type === "failure") {
      alert(res.message);
    } else {
      alert(res.message);
      navigate("/profile");
    }
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg?cs=srgb&dl=pexels-cats-coming-1907227.jpg&fm=jpg")',
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div>
        <Navbar />
      </div>
      <Container>
        <Wrapper>
          <Form>
            <Input
              placeholder="Old Password"
              name="OldPassword"
              type="password"
              value={OldPassword}
              onChange={handleChange}
            />

            <Input
              placeholder="New Password"
              name="NewPassword"
              type="password"
              value={NewPassword}
              onChange={handleChange}
            />
            <Input
              placeholder="Confirm Password"
              name="ConfirmPassword"
              type="password"
              value={ConfirmPassword}
              onChange={handleChange}
            />

            <Button onClick={handlePassword}>CHANGE PASSWORD</Button>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
};

export default ChangePassword;
