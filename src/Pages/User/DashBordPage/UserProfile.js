import React from "react";
import styled from "styled-components";
import img from "../../../assets/images/logo/logo.png";

const UserProfile = () => {
  const BgColor = "#0B1320";

  return (
    <Wrapper BgColor={BgColor}>
      <Selection>
        <h3>User Profile :</h3>
        <Profile>
          <img src={img} alt="user image" width={150} height="auto" />
          <ul>
            <li>
              <strong>User Name</strong>
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
        <EditProfile>
          <strong>Edit Profile:</strong>
        </EditProfile>
        <div>
          <button>Add anothe account</button>
          <button>Logout</button>
        </div>
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

`;

export default UserProfile;
