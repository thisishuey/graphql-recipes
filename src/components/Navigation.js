import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import AlarmIcon from "@material-ui/icons/Alarm";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 8
  },
  grow: {
    flexGrow: 1
  },
  alarmIcon: {
    marginRight: theme.spacing.unit
  }
});

class Navigation extends Component {
  render() {
    const { classes } = this.props;
    const HomeLink = props => <Link to="/" {...props} />;
    const ListRecipesLink = props => <Link to="/recipes" {...props} />;
    const AddRecipeLink = props => <Link to="/recipes/add" {...props} />;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <AlarmIcon className={classes.alarmIcon} />
            <Typography variant="h6" className={classes.grow} color="inherit">
              Recipes App
            </Typography>
            <Button component={HomeLink} color="inherit">
              Home
            </Button>
            <Button component={ListRecipesLink} color="inherit">
              List Recipes
            </Button>
            <Button component={AddRecipeLink} color="inherit">
              Add Recipe
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
