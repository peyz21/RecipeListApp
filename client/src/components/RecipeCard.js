// RecipeCard.js
import React from 'react';
import { CardMedia, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled('div')`
  width: 100%;
  height: 100%;
  background-color: #424242;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      <CardMedia component="img" height="140" image={recipe.recipeImage} alt={recipe.recipeName} />
      <CardContent>
        <Typography variant="h5">{recipe.recipeName}</Typography>
      </CardContent>
      <Button disabled style={{ width: '100%', borderRadius: '0px', backgroundColor: '#757575', color: '#ffffff' }}>
        Difficulty: {recipe.difficulty}
      </Button>
    </StyledCard>
  );
};

export default RecipeCard;
