import React from "react";
import { Button, Modal, Typography, CardMedia, Stack } from "@mui/material";

const RecipeModal = ({ open, handleClose, recipe, handleEdit, handleDelete }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          margin: "10%",
          backgroundColor: "#777777", // Set the background color to a darker grey
          padding: "20px",
          overflowY: "auto",
          maxHeight: "80vh", // Set a fixed height for the modal content
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" style={{ color: "#DDDDDD", marginBottom: "20px" }}>
            {recipe.recipeName}
          </Typography>
          <Typography variant="caption" style={{ color: "#DDDDDD", marginBottom: "20px" }}>
            Last Modified: {new Date(recipe.lastModified).toLocaleString()}
          </Typography>
          <CardMedia 
            component="img"
            style={{ 
              height: "150px", 
              width: "80%", 
              marginBottom: "20px",
              objectFit: "contain", // This will scale the image to fit its container, while maintaining its aspect ratio
              objectPosition: "center"  // This will center the image within its container
            }} 
            image={recipe.recipeImage} 
          />
          <Typography variant="body1" style={{ color: "#DDDDDD", marginTop: "20px" }}>
            Ingredients: {recipe.ingredients.join(", ")}
          </Typography>
          <Typography variant="body1" style={{ color: "#DDDDDD", marginTop: "20px" }}>
            Instructions: {recipe.instructions}
          </Typography>
          <Stack direction="row" spacing={2} marginTop={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleEdit(recipe)}
              style={{ marginTop: "20px" }}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleDelete(recipe)}
              style={{ marginTop: "20px" }}
            >
              Delete
            </Button>
          </Stack>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeModal;
