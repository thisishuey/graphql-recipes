import React, { Component, Fragment } from "react";
import { graphql } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import CreateRecipeMutation from "../../graphql/mutations/CreateRecipe";
import ListRecipesQuery from "../../graphql/queries/ListRecipes";
import Recipe from "../../components/recipes/Recipe";

const styles = theme => ({
  hero: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px`
  },
  paper: {
    padding: theme.spacing.unit * 2
  }
});

class AddRecipe extends Component {
  state = {
    ingredient: "",
    ingredients: [],
    instruction: "",
    instructions: [],
    name: ""
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleAddIngredientClick = () => {
    if (this.state.ingredient === "") return;
    const { ingredient, ingredients } = this.state;
    this.setState({
      ingredient: "",
      ingredients: [...ingredients, ingredient]
    });
  };

  handleAddInstructionClick = () => {
    if (this.state.instruction === "") return;
    const { instruction, instructions } = this.state;
    this.setState({
      instruction: "",
      instructions: [...instructions, instruction]
    });
  };

  handleAddRecipeClick = () => {
    const { ingredients, instructions, name } = this.state;
    const { handleAddRecipe } = this.props;
    handleAddRecipe({ ingredients, instructions, name });
    this.setState({
      ingredient: "",
      ingredients: [],
      instruction: "",
      instructions: [],
      name: ""
    });
  };

  render() {
    const {
      ingredient,
      ingredients,
      instruction,
      instructions,
      name
    } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.hero}>
          <Typography align="center" color="primary" variant="h2">
            Add Recipe
          </Typography>
        </div>
        <Recipe recipe={{ ingredients, instructions, name }} />
        <Paper className={classes.paper}>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            onChange={event => this.handleChange("name", event.target.value)}
            value={name}
          />
          <TextField
            fullWidth
            label="Ingredient"
            onChange={event =>
              this.handleChange("ingredient", event.target.value)
            }
            value={ingredient}
          />
          <Button
            color="secondary"
            onClick={this.handleAddIngredientClick}
            variant="contained"
          >
            Add Ingredient
          </Button>
          <TextField
            fullWidth
            label="Instruction"
            multiline
            onChange={event =>
              this.handleChange("instruction", event.target.value)
            }
            value={instruction}
          />
          <Button
            color="secondary"
            onClick={this.handleAddInstructionClick}
            variant="contained"
          >
            Add Instruction
          </Button>
          <div>
            <Button
              color="primary"
              onClick={this.handleAddRecipeClick}
              variant="contained"
            >
              Add Recipe
            </Button>
          </div>
        </Paper>
      </Fragment>
    );
  }
}

export default graphql(CreateRecipeMutation, {
  props: props => ({
    handleAddRecipe: recipe =>
      props.mutate({
        variables: recipe,
        optimisticResponse: {
          __typename: "Mutation",
          createRecipe: { ...recipe, __typename: "Recipe" }
        },
        update: (proxy, { data: { createRecipe } }) => {
          const data = proxy.readQuery({ query: ListRecipesQuery });
          data.listRecipes.items.push(createRecipe);
          proxy.writeQuery({ query: ListRecipesQuery, data });
        }
      })
  })
})(withStyles(styles)(AddRecipe));
