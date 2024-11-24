import React, { useState,useEffect } from "react";
import Navbar from "../../components/Navbar.js";
import BannerBackground from "../../assets/home-banner-background.png";
import BannerImage from "../../assets/Hero Image.png";
import { FiArrowRight } from "react-icons/fi";
import "./Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const [businesses, setBusinesses] = useState([]);
  const fetchBusinesses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/business");
      setBusinesses(response.data);

      // Set the initial map state to the first business's location
      if (response.data.length > 0) {
        const firstBusiness = response.data[0];
        setMapState({
          latitude: firstBusiness.location.x,
          longitude: firstBusiness.location.y,
          zoom: 15,
        });
        setSelectedBusiness(firstBusiness);
      }
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);
  return (
    <div className="App">
      <div className="home-container">
      <Navbar onSubmitSuccess={fetchBusinesses} />
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">
              Discover and Pinpoint Local Businesses Near You
            </h1>
            <p className="primary-text">
              Discover local businesses effortlessly—add, locate, and explore
              with just a few clicks on the map.
            </p>
            <Link to="/businesses">
              <button className="secondary-button">
                View Businesses <FiArrowRight />
              </button>
            </Link>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
