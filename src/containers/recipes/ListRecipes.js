import React, { Component, Fragment } from "react";
import { graphql } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import ListRecipesQuery from "../../graphql/queries/ListRecipes";
import OnCreateRecipeSubscription from "../../graphql/subscriptions/OnCreateRecipe";

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2
  },
  cardHeader: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "dark" ? 900 : 200]
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px`
  },
  ingredients: {
    marginBottom: theme.spacing.unit * 2
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
        <div className={classes.heroContent}>
          <Typography align="center" color="primary" variant="h2">
            List Recipes
          </Typography>
        </div>
        {recipes.map((recipe, i) => (
          <Card className={classes.card} key={i}>
            <CardHeader className={classes.cardHeader} title={recipe.name} />
            <CardContent>
              <div className={classes.ingredients}>
                <Typography variant="h6">Ingredients</Typography>
                {recipe.ingredients.map((ingredient, j) => (
                  <Typography key={j}>{ingredient}</Typography>
                ))}
              </div>
              <div className={classes.instructions}>
                <Typography variant="h6">Instructions</Typography>
                {recipe.instructions.map((instruction, k) => (
                  <Typography key={k}>
                    {k + 1}. {instruction}
                  </Typography>
                ))}
              </div>
            </CardContent>
          </Card>
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
