import React, { Component, Fragment } from "react";
import { graphql } from "react-apollo";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ListRecipesQuery from "../../graphql/queries/ListRecipes";
import OnCreateRecipeSubscription from "../../graphql/subscriptions/OnCreateRecipe";
import Recipe from "../../components/recipes/Recipe";

const styles = theme =>
  createStyles({
    hero: {
      maxWidth: 600,
      margin: "0 auto",
      padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px`
    }
  });

class ListRecipes extends Component {
  componentWillMount() {
    this.props.subscribeToOnCreateRecipe();
  }
  render() {
    const { classes, recipes } = this.props;
    return (
      <Fragment>
        <div className={classes.hero}>
          <Typography align="center" color="primary" variant="h2">
            List Recipes
          </Typography>
        </div>
        {recipes.map((recipe, i) => (
          <Recipe recipe={recipe} key={i} />
        ))}
      </Fragment>
    );
  }
}

export default graphql(ListRecipesQuery, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: props => ({
    recipes: props.data.listRecipes ? props.data.listRecipes.items : [],
    subscribeToOnCreateRecipe: params => {
      props.data.subscribeToMore({
        document: OnCreateRecipeSubscription,
        updateQuery: (
          previous,
          {
            subscriptionData: {
              data: { onCreateRecipe }
            }
          }
        ) => ({
          ...previous,
          listRecipes: {
            __typename: "RecipeConnection",
            items: [
              onCreateRecipe,
              ...previous.listRecipes.items.filter(
                recipe => recipe.id !== onCreateRecipe.id
              )
            ]
          }
        })
      });
    }
  })
})(withStyles(styles)(ListRecipes));
