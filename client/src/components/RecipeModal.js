import React from "react";
import {
  Button,
  Modal,
  Typography,
  CardMedia,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const RecipeModal = ({
  open,
  handleClose,
  recipe,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          margin: "10%",
          backgroundColor: "#777777",
          padding: "20px",
          overflowY: "auto",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          style={{
            color: "#DDDDDD",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <CloseIcon />
        </IconButton>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            style={{ color: "#DDDDDD", marginBottom: "20px" }}
          >
            {recipe.recipeName}
          </Typography>
          <Typography
            variant="caption"
            style={{ color: "#DDDDDD", marginBottom: "20px" }}
          >
            Last Modified: {new Date(recipe.lastModified).toLocaleString()}
          </Typography>
          <CardMedia
            component="img"
            style={{
              height: "150px",
              width: "80%",
              marginBottom: "20px",
              objectFit: "contain",
              objectPosition: "center",
            }}
            image={`data:image/png;base64,${recipe.recipeImage}`}
          />

          <Typography
            variant="body1"
            style={{ color: "#DDDDDD", marginTop: "20px" }}
          >
            Ingredients: {recipe.ingredients.join(", ")}
          </Typography>
          <Typography
            variant="body1"
            style={{ color: "#DDDDDD", marginTop: "20px" }}
          >
            Instructions: {recipe.instructions}
          </Typography>
        </div>

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
    </Modal>
  );
};

export default RecipeModal;
