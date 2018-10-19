import React, { Component, Fragment } from "react";
import { graphql } from "react-apollo";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import CreateRecipeMutation from "../../graphql/mutations/CreateRecipe";
import ListRecipesQuery from "../../graphql/queries/ListRecipes";
import Recipe from "../../components/recipes/Recipe";

const styles = theme =>
  createStyles({
    gutterBottom: {
      marginBottom: theme.spacing.unit * 2
    },
    hero: {
      maxWidth: 600,
      margin: "0 auto",
      padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px`
    },
    paper: {
      marginBottom: theme.spacing.unit * 2,
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
      ingredients: [...ingredients, ...ingredient.split("\n")]
    });
  };

  handleAddInstructionClick = () => {
    if (this.state.instruction === "") return;
    const { instruction, instructions } = this.state;
    this.setState({
      instruction: "",
      instructions: [...instructions, ...instruction.split("\n")]
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
            className={classes.gutterBottom}
            fullWidth
            label="Name"
            onChange={event => this.handleChange("name", event.target.value)}
            value={name}
          />
          <TextField
            className={classes.gutterBottom}
            fullWidth
            helperText="Mutliple lines will be converted into individual ingredients."
            label="Ingredient"
            multiline
            onChange={event =>
              this.handleChange("ingredient", event.target.value)
            }
            value={ingredient}
          />
          <Button
            className={classes.gutterBottom}
            color="secondary"
            onClick={this.handleAddIngredientClick}
          >
            Add Ingredient
          </Button>
          <TextField
            className={classes.gutterBottom}
            fullWidth
            helperText="Multiple lines will be converted into individual instructions."
            label="Instruction"
            multiline
            onChange={event =>
              this.handleChange("instruction", event.target.value)
            }
            value={instruction}
          />
          <Button
            className={classes.gutterBottom}
            color="secondary"
            onClick={this.handleAddInstructionClick}
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
