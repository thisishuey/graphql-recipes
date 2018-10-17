import React, { Component, Fragment } from "react";
import { graphql } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from "@material-ui/core";
import ListRecipesQuery from "../../graphql/queries/ListRecipes";

const styles = theme => ({
  paper: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit
  },
  card: {
    minWidth: 275
  }
});

class ListRecipes extends Component {
  render() {
    const { classes, recipes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.paper}>
          <Typography color="primary" variant="h2">
            List Recipes
          </Typography>
          {recipes.map((recipe, i) => (
            <Card className={classes.card} key={i}>
              <CardContent>
                <Typography color="secondary" variant="h4">
                  {recipe.name}
                </Typography>
                <div>
                  <Typography variant="h6">Ingredients</Typography>
                  <List>
                    {recipe.ingredients.map((ingredient, j) => (
                      <ListItem key={j}>
                        <ListItemText>{ingredient}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </div>
                <div>
                  <Typography variant="h6">Instructions</Typography>
                  <List>
                    {recipe.instructions.map((instruction, k) => (
                      <ListItem key={k}>
                        <ListItemText>{instruction}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </CardContent>
            </Card>
          ))}
        </Paper>
      </Fragment>
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
})(withStyles(styles)(ListRecipes));
