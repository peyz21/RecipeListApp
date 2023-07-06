import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AddRecipeModal from "./components/AddRecipeModal";
import EditRecipeModal from "./components/EditRecipeModal";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import RecipeModal from "./components/RecipeModal";
import {
  Button,
  Grid,
  Container,
  ThemeProvider,
  Box,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import theme from "./theme";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [page, setPage] = useState(1);
  const [isEndOfRecipes, setIsEndOfRecipes] = useState(false);
  const limit = 50;
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/recipes?skip=${
            (page - 1) * limit
          }&limit=${limit}&search=${filter}`
        );
        
        if (response.data.length < limit) {
          setIsEndOfRecipes(true);
        }

        if (page > 1) {
          setRecipes((prev) => [...prev, ...response.data]);
        } else {
          setRecipes(response.data);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, [page, filter]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      setShowRecipeModal(false);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleSearch = async (searchText) => {
    clearTimeout(searchTimeoutRef.current);
    setIsLoading(true);

    searchTimeoutRef.current = setTimeout(async () => {
      setFilter(searchText);
      setPage(1);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/recipes?skip=0&limit=${limit}&search=${searchText}`
        );

        if (response.data.length < limit) {
          setIsEndOfRecipes(true);
        } else {
          setIsEndOfRecipes(false);
        }
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    }, 1250);
  };

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
          {recipes.map((recipe, index) => (
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
        </Grid>
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
          {isLoading ? ( 
            <CircularProgress />
          ) : !isEndOfRecipes ? (
            <Button variant="outlined" onClick={loadMore}>
              Load More
            </Button>
          ) : (
            <>
              <p>That's all the recipes! add more If you'd like.</p>
              <Button variant="outlined" onClick={scrollToTop} sx={{ mt: 2 }}>
                Back to top
              </Button>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
