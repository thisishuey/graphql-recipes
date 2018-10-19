import React from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";

const styles = theme =>
  createStyles({
    card: {
      marginBottom: theme.spacing.unit * 2
    },
    cardHeader: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "dark" ? 900 : 200]
    },
    ingredients: {
      marginBottom: theme.spacing.unit * 2
    }
  });

function Recipe(props) {
  const { classes, recipe } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={recipe.name || "New Recipe"}
      />
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
  );
}

export default withStyles(styles)(Recipe);
