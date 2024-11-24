import React, { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UpdateModal = ({ open, onClose, businessId, onUpdateSuccess }) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [types, setTypes] = useState([]);
  const [markerLocation, setMarkerLocation] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch business types
        const typesResponse = await axios.get("http://localhost:4000/type");
        setTypes(typesResponse.data);

        // Fetch the business details if the modal is open
        if (businessId) {
          const businessResponse = await axios.get(
            `http://localhost:4000/business/${businessId}`
          );
          const businessData = businessResponse.data;
          setBusinessName(businessData.name);
          setBusinessType(businessData.type_id);
          
          // Update markerLocation with the business location
          setMarkerLocation({
            lat: businessData.location.x,
            lng: businessData.location.y,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [businessId, open]);

  const handleMapClick = (event) => {
    if (event.detail?.latLng) {
      const { lat, lng } = event.detail.latLng;
      setMarkerLocation({ lat, lng });
    } else {
      console.error("latLng is undefined in the event:", event);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: businessName,
      type_id: businessType,
      location: {
        x: markerLocation.lat,
        y: markerLocation.lng,
      },
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:4000/business/${businessId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Business updated successfully!");
      onClose();
      setBusinessName("");
      setMarkerLocation({ lat: 51.509865, lng: -0.118092 });
      setBusinessType("");
      onUpdateSuccess();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred.");
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("Error updating business:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fe9e0d",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#fe9e0d",
                },
              },
            }}
          />
          <FormControl
            fullWidth
            margin="normal"
            required
            sx={{
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#fe9e0d",
                },
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fe9e0d",
                },
              },
            }}
          >
            <InputLabel>Business Type</InputLabel>
            <Select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              label="Business Type"
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fe9e0d",
                },
              }}
            >
              {types.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div style={{ margin: "20px 0" }}>
            <APIProvider apiKey={apiKey}>
              <Map
                style={{
                  borderRadius: "10px",
                  height: "300px",
                  width: "100%",
                }}
                defaultZoom={13}
                defaultCenter={markerLocation}
                gestureHandling="greedy"
                disableDefaultUI
                onClick={handleMapClick}
              >
                <Marker position={markerLocation} />
              </Map>
            </APIProvider>
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#fe9e0d",
              "&:hover": {
                backgroundColor: "#e48f0f",
              },
            }}
          >
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
