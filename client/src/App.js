import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AddRecipeModal from "./components/AddRecipeModal";
import EditRecipeModal from "./components/EditRecipeModal";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import RecipeModal from "./components/RecipeModal";
import {
  Grid,
  Container,
  ThemeProvider,
  Box,
  CssBaseline,
} from "@mui/material";
import theme from "./theme";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const bottomBoundaryRef = useRef(null);
  const limit = 100;

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/recipes?skip=${
            (page - 1) * limit
          }&limit=${limit}`
        );
        setRecipes((prevRecipes) => [...prevRecipes, ...response.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [page, filter]);

  useEffect(() => {
    const currentBoundaryRef = bottomBoundaryRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (currentBoundaryRef) {
      observer.observe(currentBoundaryRef);
    }

    return () => {
      if (currentBoundaryRef) {
        observer.unobserve(currentBoundaryRef);
      }
    };
  }, []);

  const handleAddRecipe = async (newRecipe) => {
    const formData = new FormData();

    for (const key in newRecipe) {
      formData.append(key, newRecipe[key]);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/recipes`,
        formData
      );
      setRecipes((prevRecipes) => [...prevRecipes, response.data]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleUpdateRecipe = async (updatedRecipe) => {
    const formData = new FormData();
    formData.append("recipeName", updatedRecipe.get("recipeName"));
    formData.append("ingredients", updatedRecipe.get("ingredients"));
    formData.append("instructions", updatedRecipe.get("instructions"));
    formData.append("difficulty", updatedRecipe.get("difficulty"));
    formData.append("recipeImage", updatedRecipe.get("recipeImage"));

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/recipes/${currentRecipe._id}`,
        formData
      );

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === currentRecipe._id ? response.data : recipe
        )
      );
      setCurrentRecipe(response.data);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/recipes/${currentRecipe._id}`
      );
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== currentRecipe._id)
      );
      setPage(1); // Reset the page number after a deletion.
      setShowRecipeModal(false);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleSearch = (searchText) => {
    setFilter(searchText);
    setPage(1); // Reset the page number when a new search query is entered.
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
            handleEdit={() => {
              setShowRecipeModal(false);
              setShowEditModal(true);
            }}
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
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {filteredRecipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <RecipeCard
                recipe={recipe}
                onClick={() => {
                  setCurrentRecipe(recipe);
                  setShowRecipeModal(true);
                }}
              />
            </Grid>
          ))}
          <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
