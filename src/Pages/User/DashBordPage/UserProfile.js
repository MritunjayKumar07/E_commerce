import React from "react";
import styled from "styled-components";

const UserProfile = () => {
  const BgColor = "#0B1320";

  return <Wrapper BgColor={BgColor}>UserDashboard</Wrapper>;
};

const Wrapper = styled.div`
  max-width: 960px;
  margin: auto;
  padding: 48px 24px;
  background-color: ${({ BgColor }) => BgColor};
  color: #fff;
  border-radius: 16px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

export default UserProfile;
