import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Input,
  Typography,
} from "@mui/material";

const EditRecipeModal = ({ open, handleClose, recipe, handleUpdate }) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [recipeImage, setRecipeImage] = useState("");

  useEffect(() => {
    if (recipe) {
      setRecipeName(recipe.recipeName);
      setIngredients(recipe.ingredients.join(", "));
      setInstructions(recipe.instructions);
      setDifficulty(recipe.difficulty);
      setRecipeImage(recipe.recipeImage);
    }
  }, [recipe]);

  const handleImageChange = (e) => {
    setRecipeImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate({
      recipeName,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions,
      difficulty,
      recipeImage,
    });
    handleClose();
  };

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
            Edit Recipe
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
              src={recipeImage}
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
          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Update
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditRecipeModal;
