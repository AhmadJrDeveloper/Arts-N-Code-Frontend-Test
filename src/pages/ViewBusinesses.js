import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Navbar from "../components/Navbar";

const ViewBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [mapState, setMapState] = useState({
    latitude: 40.73061, // Default initial latitude
    longitude: -73.935242, // Default initial longitude
    zoom: 15, // Default zoom level
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [businessesPerPage] = useState(6);

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

  // Pagination logic
  const indexOfLastBusiness = currentPage * businessesPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  const currentBusinesses = businesses.slice(
    indexOfFirstBusiness,
    indexOfLastBusiness
  );

  // Function to handle marker click and zoom to the selected business
  const handleMarkerClick = (business) => {
    setSelectedBusiness(business);
    setMapState({
      latitude: business.location.x,
      longitude: business.location.y,
      zoom: 18,
    });
  };

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box
      sx={{
        padding: 2,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar onSubmitSuccess={fetchBusinesses} />
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Business List */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ padding: 2, height: "100%", overflowY: "auto" }}
          >
            <Typography variant="h6" gutterBottom>
              Business List
            </Typography>
            <List>
              {currentBusinesses.map((business) => (
                <ListItem
                  key={business.id}
                  sx={{
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                    backgroundColor:
                      selectedBusiness?.id === business.id
                        ? "#f0f0f0"
                        : "inherit",
                  }}
                  onClick={() => handleMarkerClick(business)}
                >
                  <ListItemText
                    primary={business.name}
                    secondary={`Type: ${business.type_name}`}
                  />
                </ListItem>
              ))}
            </List>
            {/* Pagination Buttons */}
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <Button
                variant="outlined"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                sx={{
                  borderColor: "#fe9e0d",
                  color: "#fe9e0d",
                  "&:hover": {
                    borderColor: "#fe9e0d",
                    backgroundColor: "rgba(254, 158, 13, 0.1)",
                  },
                }}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastBusiness >= businesses.length}
                sx={{
                  borderColor: "#fe9e0d",
                  color: "#fe9e0d",
                  marginLeft: 2,
                  "&:hover": {
                    borderColor: "#fe9e0d",
                    backgroundColor: "rgba(254, 158, 13, 0.1)",
                  },
                }}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Map Section */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              border: "4px solid #fe9e0d",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
              <Map
                viewState={{
                  latitude: mapState.latitude,
                  longitude: mapState.longitude,
                  zoom: mapState.zoom,
                }}
                mapStyle="roadmap"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "300px",
                }}
              >
                {businesses.map((business) => (
                  <Marker
                    key={business.id}
                    position={{
                      lat: business.location.x,
                      lng: business.location.y,
                    }}
                    onClick={() => handleMarkerClick(business)}
                    options={{
                      label: {
                        text: business.name,
                        fontSize: "12px",
                      },
                      icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                      },
                    }}
                  />
                ))}
              </Map>
            </APIProvider>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewBusinesses;
