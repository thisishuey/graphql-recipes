import React, { Component } from "react";
import { graphql } from "react-apollo";
import ListRecipesQuery from "../../graphql/queries/ListRecipes";

class ListRecipes extends Component {
  render() {
    const { recipes } = this.props;
    return (
      <div>
        <h1>List Recipes</h1>
        {recipes.map((recipe, i) => {
          return (
            <div key={i}>
              <h4>Recipe Name: {recipe.name}</h4>
              <div>
                <p>Ingredients</p>
                {recipe.ingredients.map((ingredient, j) => (
                  <p key={j}>{ingredient}</p>
                ))}
              </div>
              <div>
                <h4>Instructions</h4>
                {recipe.instructions.map((instruction, k) => (
                  <p key={k}>{instruction}</p>
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
