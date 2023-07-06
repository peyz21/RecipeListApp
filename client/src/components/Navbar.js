import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = ({ handleOpenModal }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe App
          </Typography>
          <Button
            color="inherit"
            onClick={handleOpenModal}
            sx={{
              backgroundColor: "#4D85D1",
              marginLeft: "20px",
              borderRadius: "5px",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#3A6FAE",
              },
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            Add Recipe
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
