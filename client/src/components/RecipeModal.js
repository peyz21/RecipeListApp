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
  let latestTimestamp = Math.max(
    new Date(recipe.createdAt).getTime(),
    new Date(recipe.updatedAt).getTime()
  );
  let dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  let formattedTimestamp = new Date(latestTimestamp).toLocaleString(
    "en-US",
    dateOptions
  );

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
            Last Modified: {formattedTimestamp}
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
            Ingredients:
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {Array.isArray(recipe.ingredients)
              ? recipe.ingredients[0]
                  .split("\r\n")
                  .filter((item) => item.trim() !== "")
                  .map((ingredient, index) => (
                    <div key={index}>{`${index + 1} - ${ingredient}`}</div>
                  ))
              : recipe.ingredients}
          </div>

          <Typography
            variant="body1"
            style={{ color: "#DDDDDD", marginTop: "20px" }}
          >
            Instructions:
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {Array.isArray(recipe.instructions)
              ? recipe.instructions
                  .filter((instruction) => instruction.trim() !== "")
                  .map((instruction, index) => (
                    <div key={index}>{`${index + 1} - ${instruction}`}</div>
                  ))
              : recipe.instructions
                  .split("\n")
                  .filter((item) => item.trim() !== "")
                  .map((item, i) => <div key={i}>{`${i + 1} - ${item}`}</div>)}
          </div>
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
