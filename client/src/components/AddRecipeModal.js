import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Input,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddRecipeModal = ({ handleCloseModal, handleAddRecipe }) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [recipeImage, setRecipeImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRecipeImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recipeName || !ingredients || !instructions || !recipeImage) {
      setError("Please fill in all fields.");
      return;
    }

    const newRecipe = {
      recipeName,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .join(","),
      instructions,
      difficulty,
      recipeImage,
    };

    handleAddRecipe(newRecipe);

    setRecipeName("");
    setIngredients("");
    setInstructions("");
    setDifficulty("Easy");
    setRecipeImage(null);
    setError("");
  };

  return (
    <Modal open={true} onClose={handleCloseModal}>
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
          onClick={handleCloseModal}
          style={{
            color: "#DDDDDD",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <CloseIcon />
        </IconButton>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            style={{ color: "#DDDDDD", marginBottom: "20px" }}
          >
            Add Recipe
          </Typography>
          <Typography variant="h6" style={{ color: "#DDDDDD" }}>
            Difficulty
          </Typography>
          <RadioGroup
            row
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
            <FormControlLabel
              value="Medium"
              control={<Radio />}
              label="Medium"
            />
            <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
          </RadioGroup>
          <Typography
            variant="h6"
            style={{ color: "#DDDDDD", marginTop: "20px" }}
          >
            Upload Image
          </Typography>
          <Input type="file" onChange={handleImageChange} />
          {recipeImage && (
            <img
              src={URL.createObjectURL(recipeImage)}
              alt="recipe preview"
              style={{
                width: "80%",
                height: "150px",
                objectFit: "contain",
                objectPosition: "center",
                marginTop: "10px",
              }}
            />
          )}
          <TextField
            style={{ marginTop: "20px", width: "80%" }}
            label="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px", width: "80%" }}
            label="Ingredients"
            multiline
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px", width: "80%" }}
            label="Instructions"
            multiline
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          {error && (
            <Typography
              variant="body1"
              style={{
                color: "pink",
                fontWeight: "bold",
                animation: "blink 1s infinite",
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddRecipeModal;
