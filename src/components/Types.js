import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Types = () => {
  const [types, setTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newType, setNewType] = useState("");
  const [editingType, setEditingType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [typesPerPage] = useState(7);
  const [paginatedTypes, setPaginatedTypes] = useState([]);

  const fetchTypes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/type");
      setTypes(response.data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    // Calculate the types to display based on the current page
    const indexOfLastType = currentPage * typesPerPage;
    const indexOfFirstType = indexOfLastType - typesPerPage;
    setPaginatedTypes(types.slice(indexOfFirstType, indexOfLastType));
  }, [types, currentPage]);

  const handleAddType = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:4000/type",
        { name: newType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTypes((prev) => [...prev, response.data]);
      setNewType("");
      setIsModalOpen(false);
      toast.success("Type added successfully!"); // Toast notification
    } catch (error) {
      console.error("Error adding type:", error);
      toast.error(error.response.data.message); // Error Toast notification
    }
  };

  const handleUpdateType = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:4000/type/${editingType.id}`,
        { name: editingType.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTypes((prev) =>
        prev.map((type) =>
          type.id === response.data.id ? response.data : type
        )
      );
      setEditingType(null);
      toast.success("Type updated successfully!"); 
    } catch (error) {
      console.error("Error updating type:", error);
      toast.error(error.response.data.message); 
    }
  };

  const handleDeleteType = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        const token = localStorage.getItem("authToken");
        await axios.delete(`http://localhost:4000/type/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setTypes((prev) => prev.filter((type) => type.id !== id));
        Swal.fire("Deleted!", "The type has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting type:", error);
      Swal.fire("Error!", error.response.data.message, "error");
    }
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
        <Typography variant="h5">Types List</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#fe9e0d" }}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Type
        </Button>
      </Box>

      {/* List Headers */}
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
            <ListItemText primary="Type Name" />
            <ListItemText
              primary="Actions"
              sx={{ textAlign: "right", paddingRight: "1.5rem" }}
            />
          </ListItem>
          {paginatedTypes.map((type) => (
            <ListItem
              key={type.id}
              divider
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText primary={type.name} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => setEditingType(type)}
                  sx={{ color: "#FE9E0D", marginRight: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteType(type.id)}
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
          count={Math.ceil(types.length / typesPerPage)}
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

      {/* Add Type Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            maxWidth: 400,
            margin: "auto",
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <TextField
            label="Type Name"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            fullWidth
            margin="normal"
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
          <Button
            variant="contained"
            onClick={handleAddType}
            sx={{
              marginTop: 2,
              backgroundColor: "#fe9e0d",
              "&:hover": {
                backgroundColor: "#e48f0f",
              },
            }}
          >
            Add Type
          </Button>
        </Box>
      </Modal>

      {/* Edit Type Modal */}
      {editingType && (
        <Modal open={Boolean(editingType)} onClose={() => setEditingType(null)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              maxWidth: 400,
              margin: "auto",
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <TextField
              label="Edit Type Name"
              value={editingType.name}
              onChange={(e) =>
                setEditingType((prev) => ({ ...prev, name: e.target.value }))
              }
              fullWidth
              margin="normal"
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
            <Button
              variant="contained"
              onClick={handleUpdateType}
              sx={{
                marginTop: 2,
                backgroundColor: "#fe9e0d",
                "&:hover": {
                  backgroundColor: "#e48f0f",
                },
              }}
            >
              Update Type
            </Button>
          </Box>
        </Modal>
      )}

      <ToastContainer />
    </Box>
  );
};

export default Types;
