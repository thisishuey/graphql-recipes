import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AlarmIcon from "@material-ui/icons/Alarm";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

const styles = theme => ({
  alarmIcon: {
    marginRight: theme.spacing.unit
  },
  appBar: {
    position: "sticky"
  },
  grow: {
    flexGrow: 1
  }
});

class Navigation extends Component {
  render() {
    const { classes } = this.props;
    const HomeLink = props => <Link to="/" {...props} />;
    const ListRecipesLink = props => <Link to="/recipes" {...props} />;
    const AddRecipeLink = props => <Link to="/recipes/add" {...props} />;
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <AlarmIcon className={classes.alarmIcon} />
          <Typography className={classes.grow} color="inherit" variant="h6">
            Recipes App
          </Typography>
          <nav>
            <Button color="inherit" component={HomeLink}>
              Home
            </Button>
            <Button color="inherit" component={ListRecipesLink}>
              List Recipes
            </Button>
            <Button color="inherit" component={AddRecipeLink}>
              Add Recipe
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navigation);
