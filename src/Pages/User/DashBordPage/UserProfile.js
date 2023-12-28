import React, { useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/images/logo/logo.png";

const UserProfile = ({ userData }) => {
  const {logout } = useAuth0();
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [editedUserData, setEditedUserData] = useState();
  const BgColor = "#0B1320";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const openEdit = () => {
    setEditProfile((prevEditProfile) => !prevEditProfile);
    setEditedUserData(userData); // Now this will be executed after setEditProfile is completed
    console.log(editedUserData);
  };

  return (
    <Wrapper BgColor={BgColor}>
      <Selection>
        <h3>User Profile :</h3>
        <Profile>
          <img src={img} alt="user image" width={150} height="auto" />
          <ul>
            <li>
              <strong>
                {userData.Username
                  ? `${userData.Username.split("_")
                      .map((word) => word.replace(/\d/g, "")) // Remove numeric characters
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}`
                  : "Mirch Masala"}
              </strong>
            </li>
            <li>
              <p>Golden user</p>
            </li>
            <li>
              <p>Loran hipsan text to show the use to.</p>
            </li>
          </ul>
        </Profile>
      </Selection>
      <Selection>
        <h3>Account's:</h3>
        {editProfile ? (
          <EditProfile>
            <Form>
              <InputBox>
                <input
                  type="text"
                  value={editedUserData.firstName}
                  name="firstName"
                  onChange={handleInputChange}
                />
                <span>First Name</span>
              </InputBox>
              <InputBox>
                <input
                  type="text"
                  value={editedUserData.lastName}
                  name="lastName"
                  onChange={handleInputChange}
                />
                <span>Last Name</span>
              </InputBox>
              <InputBox>
                <input
                  type="text"
                  value={editedUserData.email}
                  name="email"
                  onChange={handleInputChange}
                />
                <span>Email</span>
              </InputBox>
              <InputBox>
                <input
                  type="text"
                  value={editedUserData.contactNumber}
                  name="contactNumber"
                  onChange={handleInputChange}
                />
                <span>Contact</span>
              </InputBox>
              <button onClick={openEdit}>Save Changes</button>
            </Form>
          </EditProfile>
        ) : (
          <div>
            <button>Add another account</button>
            <button onClick={openEdit}>Edit Profile</button>
            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                logout();
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </Selection>
      <Selection>
        <h3>Detail's:</h3>
      </Selection>
      <Selection>
        <h3>Danger Zone:</h3>
        <div>
          <button style={{ background: "#DC143C" }}>Delete Account</button>
        </div>
      </Selection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 960px;
  margin: auto;
  padding: 48px 24px;
  background-color: ${({ BgColor }) => BgColor};
  color: #fff;
  border-radius: 16px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Selection = styled.section`
  background: #282c34;
  color: #d9d9d9;
  border: 0.2px solid #fff;
  border-radius: 8px;
  min-height: 150px;
  height: auto;
  padding: 10px;
  div {
    button {
      background: #fff;
      color: #000;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      cursor: pointer;
      margin: 15px;
      padding: 8px 5px;
      border-radius: 5px;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      letter-spacing: 1px;
    }
    button:hover {
      background: #000000;
      color: #fff;
    }
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 25px;
  img {
    object-fit: fit;
    border-radius: 50%;
  }
  ul {
    margin-top: 8px;
  }
  li {
    margin-top: 5x;
  }
`;

const EditProfile = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 30vh;
  flex-direction: column;
  gap: 30px;
`;

const Form = styled.form`
  position: relative;
  margin-top: 45px;
  width: 80%;
`;

const InputBox = styled.div`
  width: 100%;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ffffff;
    background: #212121;
    border-radius: 5px;
    outline: none;
    color: #ffffff;
    font-size: 1em;

    &:focus + span,
    &:valid + span {
      top: -47px;
      background: #ffffff;
      border-radius: 5px;
      padding: 3px 8px;
      color: #000000;
      transform: translateX(10px) translateY(-14px);
      font-size: 0.8em;
    }
  }

  span {
    position: relative;
    top: -47px;
    left: 0;
    padding: 10px;
    text-align: center;
    min-width: 140px;
    pointer-events: none;
    font-size: 0.9em;
    font-weight: 600;
    color: #ffffff;
    text-transform: uppercase;
    transition: 0.5s;
  }
`;

export default UserProfile;
