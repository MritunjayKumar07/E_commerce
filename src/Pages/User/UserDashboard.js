import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  background-color: #292c35;
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
  background-color: #292c35;
  color: white;
  padding: 20px;
`;

const ContentSection = styled.div`
  flex: 1;
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 20px;
`;

const ProfileSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #888;
    margin-bottom: 20px;
  }

  button {
    background-color: #3498db;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2980b9;
    }
  }
`;

const OrderHistorySection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const CurrentOrdersSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const FavoritesAndRecommendationsSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const PromotionsSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const MenuSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const SearchSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ${"" /* // Include search input and filters as needed */}
`;

const RatingsAndReviewsSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ${"" /* // Include rating and review components */}
`;

const DeliveryTrackingSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ${"" /* // Include delivery tracking components */}
`;

const CommunicationSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ${"" /* // Include messaging and notification components */}
`;

const AccountSettingsSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ${"" /* // Include account settings components */}
`;

const FeedbackAndSurveysSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ${"" /* // Include feedback and survey components */}
`;

const SocialMediaIntegrationSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ${"" /* // Include social media integration components */}
`;

const HelpAndFAQSection = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ${"" /* // Include help and FAQ components */}
`;

// UserDashboard component
const UserDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log(data);
      } else {
        console.error("Data fetching failed:", data.message);
      }
    } catch (error) {
      console.error("Error during data fetching:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardContainer>
      <Navbar>
        <h3>
          {userData.Username
            ? userData.Username.split("_")
                .map((word) => word.replace(/\d/g, "")) // Remove numeric characters
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "Mirch Masala"}
        </h3>
      </Navbar>
      <MainContent>
        <Sidebar>
          {/* Include user profile image, quick links, or any other relevant content */}
        </Sidebar>
        <ContentSection>
          <ProfileSection>
            <h2>User Profile</h2>
            <p>Manage your account details.</p>
            <button>Edit Profile</button>
          </ProfileSection>
          <OrderHistorySection>
            <h2>Order History</h2>
            <ul>
              {/* List of past orders with details */}
              <li>Order #1234 - Date: DD/MM/YYYY - Status: Delivered</li>
              <li>Order #5678 - Date: DD/MM/YYYY - Status: In Progress</li>
              {/* Add more order entries */}
            </ul>
          </OrderHistorySection>
          <CurrentOrdersSection>
            <h2>Current Orders</h2>
            <ul>
              {/* List of ongoing orders with details */}
              <li>Order #91011 - Date: DD/MM/YYYY - Status: Pending</li>
              {/* Add more ongoing order entries */}
            </ul>
          </CurrentOrdersSection>
          <FavoritesAndRecommendationsSection>
            <h2>Favorites and Recommendations</h2>
            <ul>
              {/* List of favorite dishes and personalized recommendations */}
              <li>Favorite Dish: Pizza</li>
              <li>Recommended Dish: Chef's Special Pasta</li>
              {/* Add more favorite and recommended entries */}
            </ul>
          </FavoritesAndRecommendationsSection>
          <PromotionsSection>
            <h2>Promotions</h2>
            <ul>
              {/* List of ongoing promotions */}
              <li>Get 20% off on all orders using code: PROMO20</li>
              {/* Add more promotion entries */}
            </ul>
          </PromotionsSection>
          <MenuSection>
            <h2>Menu</h2>
            <ul>
              {/* List of menu items with details */}
              <li>Pizza - Price: $12.99</li>
              <li>Chef's Special Pasta - Price: $15.99</li>
              {/* Add more menu entries */}
            </ul>
          </MenuSection>
          <SearchSection>
            <h2>Search</h2>
            {/* Include search input and filters */}
          </SearchSection>
          <RatingsAndReviewsSection>
            <h2>Ratings and Reviews</h2>
            {/* Include rating and review components */}
          </RatingsAndReviewsSection>
          <DeliveryTrackingSection>
            <h2>Delivery Tracking</h2>
            {/* Include delivery tracking components */}
          </DeliveryTrackingSection>
          <CommunicationSection>
            <h2>Communication</h2>
            {/* Include messaging and notification components */}
          </CommunicationSection>
          <AccountSettingsSection>
            <h2>Account Settings</h2>
            {/* Include account settings components */}
          </AccountSettingsSection>
          <FeedbackAndSurveysSection>
            <h2>Feedback and Surveys</h2>
            {/* Include feedback and survey components */}
          </FeedbackAndSurveysSection>
          <SocialMediaIntegrationSection>
            <h2>Social Media Integration</h2>
            {/* Include social media integration components */}
          </SocialMediaIntegrationSection>
          <HelpAndFAQSection>
            <h2>Help and FAQ</h2>
            {/* Include help and FAQ components */}
          </HelpAndFAQSection>
          {/* Add more sections as needed */}
        </ContentSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default UserDashboard;
