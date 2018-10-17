import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Typography } from "@material-ui/core";
import ListRecipesQuery from "../../graphql/queries/ListRecipes";

class ListRecipes extends Component {
  render() {
    const { recipes } = this.props;
    return (
      <div>
        <Typography variant="h2">List Recipes</Typography>
        {recipes.map((recipe, i) => {
          return (
            <div key={i}>
              <Typography variant="h4">Recipe Name: {recipe.name}</Typography>
              <div>
                <Typography variant="h6">Ingredients</Typography>
                {recipe.ingredients.map((ingredient, j) => (
                  <Typography key={j}>{ingredient}</Typography>
                ))}
              </div>
              <div>
                <Typography variant="h6">Instructions</Typography>
                {recipe.instructions.map((instruction, k) => (
                  <Typography key={k}>{instruction}</Typography>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default graphql(ListRecipesQuery, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: props => ({
    recipes: props.data.listRecipes ? props.data.listRecipes.items : []
  })
})(ListRecipes);
