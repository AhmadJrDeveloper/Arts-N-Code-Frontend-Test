import React, { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

const Navbar = ({ onSubmitSuccess }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  // Functions to handle modal open/close
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeRoundedIcon />,
      action: () => setOpenMenu(false),
      link: "/", 
    },
    {
      text: "Businesses",
      icon: <BusinessCenterRoundedIcon />, 
      action: () => setOpenMenu(false), 
      link: "/businesses", 
    },
    {
      text: "Add Business",
      icon: <AddCircleOutlineRoundedIcon />,
      action: handleOpenModal,
    },
  ];

  return (
    <nav>
      <div
        className="nav-logo-container"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <BusinessRoundedIcon style={{ fontSize: "60px" }} />
        <span style={{ fontSize: "24px", fontWeight: "bold" }}>
          Business System
        </span>
      </div>
      <div className="navbar-links-container">
        <Link to="/">Home</Link>
        <Link to="/businesses">Businesses</Link>
        <button className="primary-button" onClick={handleOpenModal}>
          Add Business
        </button>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.action}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.link ? (
                    <Link to={item.link}>
                      <ListItemText primary={item.text} />
                    </Link>
                  ) : (
                    <ListItemText primary={item.text} />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <CustomModal open={openModal} onClose={handleCloseModal} onSubmitSuccess={onSubmitSuccess} />

    </nav>
  );
};

export default Navbar;
