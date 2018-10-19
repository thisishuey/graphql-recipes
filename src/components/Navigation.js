import React from "react";
import { NavLink } from "react-router-dom";
import { createStyles, withStyles } from "@material-ui/core/styles";
import AlarmIcon from "@material-ui/icons/Alarm";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

const styles = theme =>
  createStyles({
    alarmIcon: {
      marginRight: theme.spacing.unit
    },
    appBar: {
      position: "sticky"
    },
    grow: {
      flexGrow: 1
    },
    navButton: {
      marginRight: theme.spacing.unit,
      "&.active": {
        backgroundColor: "rgba(255, 255, 255, 0.2)"
      }
    }
  });

function Navigation(props) {
  const { classes } = props;
  const HomeLink = props => <NavLink exact to="/" {...props} />;
  const ListRecipesLink = props => <NavLink exact to="/recipes" {...props} />;
  const AddRecipeLink = props => <NavLink exact to="/recipes/add" {...props} />;
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <AlarmIcon className={classes.alarmIcon} />
        <Typography className={classes.grow} color="inherit" variant="h6">
          Recipes App
        </Typography>
        <nav>
          <Button
            color="inherit"
            className={classes.navButton}
            component={HomeLink}
          >
            Home
          </Button>
          <Button
            color="inherit"
            className={classes.navButton}
            component={ListRecipesLink}
          >
            List Recipes
          </Button>
          <Button
            color="inherit"
            className={classes.navButton}
            component={AddRecipeLink}
          >
            Add Recipe
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Navigation);
