import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import AlarmIcon from "@material-ui/icons/Alarm";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  alarmIcon: {
    textAlign: "center",
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
      <div>
        <AppBar position="static">
          <Toolbar>
            <AlarmIcon className={classes.alarmIcon} />
            <Typography variant="h6" className={classes.grow}>
              Recipes App
            </Typography>
            <Button component={HomeLink}>Home</Button>
            <Button component={ListRecipesLink}>List Recipes</Button>
            <Button component={AddRecipeLink}>Add Recipe</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
