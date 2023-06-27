// App.js
import React, { useState, useEffect } from "react";
import AddRecipeModal from "./components/AddRecipeModal";
import EditRecipeModal from "./components/EditRecipeModal";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import RecipeModal from "./components/RecipeModal";
import { Grid, Container, ThemeProvider, Box, CssBaseline  } from "@mui/material";
import theme from "./theme";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  const handleAddRecipe = (newRecipe) => {
    const newRecipes = [...recipes, newRecipe];
    setRecipes(newRecipes);
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    setShowAddModal(false);
  };
  
  const handleUpdateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map(recipe =>
      recipe.recipeName === currentRecipe.recipeName ? { ...updatedRecipe, lastModified: new Date() } : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setCurrentRecipe(updatedRecipe);
    setShowEditModal(false);
  };

  const handleDeleteRecipe = () => {
    const updatedRecipes = recipes.filter(recipe =>
      recipe.recipeName !== currentRecipe.recipeName
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setShowRecipeModal(false);
  };

  const handleSearch = (searchText) => {
    setFilter(searchText);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipeName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar handleOpenModal={() => setShowAddModal(true)} />
      <Container>
        {showAddModal && (
          <AddRecipeModal
            handleCloseModal={() => setShowAddModal(false)}
            handleAddRecipe={handleAddRecipe}
          />
        )}
        {showRecipeModal && (
          <RecipeModal
            open={showRecipeModal}
            handleClose={() => setShowRecipeModal(false)}
            recipe={currentRecipe}
            handleEdit={() => { setShowRecipeModal(false); setShowEditModal(true); }}
            handleDelete={handleDeleteRecipe}
          />
        )}
        {showEditModal && (
          <EditRecipeModal
            open={showEditModal}
            handleClose={() => setShowEditModal(false)}
            recipe={currentRecipe}
            handleUpdate={handleUpdateRecipe}
          />
        )}
        <Box mt={2}>
          <SearchBar handleSearch={handleSearch} />
        </Box>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {filteredRecipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <RecipeCard 
                recipe={recipe} 
                onClick={() => { setCurrentRecipe(recipe); setShowRecipeModal(true); }} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
