import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CreateIcon from "@mui/icons-material/Create";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useNavigate } from "react-router-dom";
import { Routes } from "./nav.util";

export default function Nav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(Routes[newValue], { replace: true });
        }}
      >
        <BottomNavigationAction label="Create" icon={<CreateIcon />} />
        <BottomNavigationAction label="List" icon={<ViewListIcon />} />
      </BottomNavigation>
    </Box>
  );
}
