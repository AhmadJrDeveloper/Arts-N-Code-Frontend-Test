import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";
import CustomModal from "./CustomModal";
import UpdateModal from "./UpdateModal";
import Swal from "sweetalert2";
export const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [paginatedBusinesses, setPaginatedBusinesses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [businessesPerPage] = useState(7);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/business");
      setBusinesses(response.data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    // Calculate the businesses to display based on the current page
    const indexOfLastBusiness = currentPage * businessesPerPage;
    const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
    setPaginatedBusinesses(businesses.slice(indexOfFirstBusiness, indexOfLastBusiness));
  }, [businesses, currentPage]);

  const handleAddBusiness = () => {
    setSelectedBusinessId(null);
    setIsAddModalOpen(true);
  };

  const handleEditBusiness = (id) => {
    setSelectedBusinessId(id);
    setIsEditModalOpen(true);
  };

  const handleDeleteBusiness = async (id) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
  
    if (confirmation.isConfirmed) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`http://localhost:4000/business/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBusinesses((prev) => prev.filter((business) => business.id !== id));
        Swal.fire("Deleted!", "The business has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting business:", error);
        Swal.fire("Error!", "An error occurred while deleting the business.", "error");
      }
    }
  };

  const handleUpdateSuccess = () => {
    fetchBusinesses();
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Title and Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Businesses List</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#fe9e0d" }}
          onClick={handleAddBusiness}
        >
          Add New Business
        </Button>
      </Box>

      {/* Businesses List */}
      <Box sx={{ marginTop: 2 }}>
        <List>
          <ListItem
            sx={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ListItemText primary="Business Name" sx={{ flex: 2, textAlign: "left" }} />
            <ListItemText primary="Type Name" sx={{ flex: 1, textAlign: "center" }} />
            <ListItemText
              primary="Actions"
              sx={{ flex: 1, textAlign: "right", marginRight: "1rem" }}
            />
          </ListItem>
          {paginatedBusinesses.map((business) => (
            <ListItem
              key={business.id}
              divider
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText
                primary={business.name}
                sx={{ flex: 2, textAlign: "left" }}
              />
              <ListItemText
                primary={business.type_name || "N/A"}
                sx={{ flex: 1, textAlign: "center" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <IconButton
                  sx={{ color: "#FE9E0D", marginRight: 1 }}
                  onClick={() => handleEditBusiness(business.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteBusiness(business.id)}
                  sx={{ color: "red" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={Math.ceil(businesses.length / businessesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#fe9e0d",
                  color: "#fff",
                },
                "&:hover": {
                  backgroundColor: "#fe9e0d",
                },
              }}
            />
          )}
        />
      </Box>

      {/* Add Business Modal */}
      <CustomModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmitSuccess={fetchBusinesses}
      />

      {/* Edit Business Modal */}
      <UpdateModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        businessId={selectedBusinessId}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </Box>
  );
};

export default Businesses;
