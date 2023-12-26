import {
  FaRegBell,
  FaArrowRotateLeft,
  FaAnglesLeft,
  FaAnglesRight,
  FaUserLarge,
  FaReceipt,
  FaTruckFast,
  FaHeart,
  FaStar,
  FaEnvelopeOpenText,
  FaReadme,
  FaUserTag,
  FaGears,
  FaUsersLine,
  FaHeadset,
  FaPepperHot,
} from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserProfile from "./DashBordPage/UserProfile";
import Orders from "./DashBordPage/Orders";
import Delivery from "./DashBordPage/Delivery";
import Favorites from "./DashBordPage/Favorites";
import RatingsAndReviews from "./DashBordPage/RatingsAndReviews";
import Feedback from "./DashBordPage/Feedback";
import Menu from "./DashBordPage/Menu";
import Promotions from "./DashBordPage/Promotions";
import Settings from "./DashBordPage/Settings";
import Communication from "./DashBordPage/Communication";
import HelpAndFAQ from "./DashBordPage/HelpAndFAQ";

// Styled components for building the UI
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  background-color: #0b1320;
  color: white;
  padding: 10px 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
`;

const Sidebar = styled.div`
  width: 250px;
  ${"" /* width:${({ isOpen }) => (isOpen ? '50px' : '250px')}; */}
  height: 100vh;
  display: flex;
  display: ${({ isOpen }) => (isOpen ? `none` : "flex")};
  overflow-x: hidden;
  transition: 0.5s ease-in-out;
  background-color: #0b1320;
  color: white;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px 0px 0px 15px;
  li {
    display: flex;
    gap: 15px;
    padding: 10px 7px;
    font-size: auto;
    font-weight: 600;
    cursor: pointer;
    svg {
      font-size: 22.5px;
    }
    &:hover {
      background: #fff;
      border-radius: 15px;
      color: #0b1320;
      font-weight: 700;
    }
  }
`;

const ContentSection = styled.div`
  flex: 1;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 5px;
  margin-bottom: 20px;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #292c35 transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #292c35;
    border: 3px solid transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #292c35;
  }
`;

// UserDashboard component
const UserDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("Profile");

  const fetchLoginUser = () => {
    const data = JSON.parse(sessionStorage.getItem("userData"));
    return `${data.userId}MirchMasala${data.username}`;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/mirchmasala/user?id=${fetchLoginUser()}`
      );
      const data = await response.json();
      if (response.status === 200) {
        setUserData(data);
        // console.log(data);
      } else {
        console.error("Data fetching failed:", data.message);
      }
    } catch (error) {
      console.error("Error during data fetching:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (currentComponent) {
      case "Profile":
        return <UserProfile />;
      case "Orders":
        return <Orders />;
      case "Delivery":
        return <Delivery />;
      case "Favorites":
        return <Favorites />;
      case "Reviews":
        return <RatingsAndReviews />;
      case "Feedback":
        return <Feedback />;
      case "Menu":
        return <Menu />;
      case "Promotions":
        return <Promotions />;
      case "Settings":
        return <Settings />;
      case "Communication":
        return <Communication />;
      case "HelpAndFAQ":
        return <HelpAndFAQ />;
      default:
        return <UserProfile />;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardContainer>
      <Navbar>
        <h3 style={{ fontSize: "auto", fontWeight: "auto" }}>
          {userData.Username
            ? `Hello ${userData.Username.split("_")
                .map((word) => word.replace(/\d/g, "")) // Remove numeric characters
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}`
            : "Mirch Masala"}
        </h3>
        <div style={{ display: "flex", gap: "16.5px" }}>
          {isSidebarOpen ? (
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              style={{ color: "#fff", fontWeight: 600 }}
            >
              <FaAnglesLeft />
            </button>
          ) : (
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              style={{ color: "#fff", fontWeight: 600 }}
            >
              <FaAnglesRight />
            </button>
          )}
          <button style={{ color: "#fff", fontWeight: 600 }}>
            <FaRegBell fontSize={24} />
            <span>2</span>
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{ color: "#fff", fontWeight: 600 }}
          >
            <FaArrowRotateLeft fontSize={24} />
          </button>
        </div>
      </Navbar>
      <MainContent>
        <Sidebar isOpen={isSidebarOpen}>
          <ul>
            <li onClick={() => setCurrentComponent("Profile")}>
              <FaUserLarge />
              Profile
            </li>
            <li onClick={() => setCurrentComponent("Orders")}>
              <FaReceipt />
              Orders
            </li>
            <li onClick={() => setCurrentComponent("Delivery")}>
              <FaTruckFast />
              Delivery
            </li>
            <li onClick={() => setCurrentComponent("Favorites")}>
              <FaHeart />
              Favorites
            </li>
            <li onClick={() => setCurrentComponent("Reviews")}>
              <FaStar />
              Reviews
            </li>
            <li onClick={() => setCurrentComponent("Feedback")}>
              <FaEnvelopeOpenText />
              Feedback
            </li>
            <li onClick={() => setCurrentComponent("Menu")}>
              <FaReadme />
              Menu
            </li>
            <li onClick={() => setCurrentComponent("Promotions")}>
              <FaUserTag />
              Promotions
            </li>
            <li onClick={() => setCurrentComponent("Settings")}>
              <FaGears />
              Settings
            </li>
            <li onClick={() => setCurrentComponent("Communication")}>
              <FaUsersLine />
              Communication
            </li>
            <li onClick={() => setCurrentComponent("HelpAndFAQ")}>
              <FaHeadset />
              HelpAndFAQ
            </li>
          </ul>
          {isSidebarOpen ? (
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              style={{
                color: "#fff",
                fontWeight: 600,
                float: "right",
                marginBottom: "10px",
              }}
            >
              <FaAnglesLeft />
            </button>
          ) : (
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              style={{
                color: "#fff",
                fontWeight: 600,
                float: "right",
                marginBottom: "10px",
              }}
            >
              <FaPepperHot style={{ marginRight: "10px" }} /> Mirch Masalapx
            </button>
          )}
        </Sidebar>
        <ContentSection>{renderContent()}</ContentSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default UserDashboard;
