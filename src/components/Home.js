import React, { Fragment } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
const styles = theme =>
  createStyles({
    hero: {
      maxWidth: 600,
      margin: "0 auto",
      padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px`
    }
  });
function Home(props) {
  const { classes } = props;
  return (
    <Fragment>
      <div className={classes.hero}>
        <Typography align="center" color="primary" gutterBottom variant="h2">
          Welcome to My Recipe App!
        </Typography>
        <Typography gutterBottom>
          Through this interface, you can add recipes to the database and then
          browse the recipes that have already been added.
        </Typography>
      </div>
    </Fragment>
  );
}
export default withStyles(styles)(Home);
