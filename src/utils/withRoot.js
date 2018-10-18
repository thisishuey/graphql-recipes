import React from "react";
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  jssPreset
} from "@material-ui/core/styles";
import primary from "@material-ui/core/colors/blue";
import secondary from "@material-ui/core/colors/pink";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: primary,
    secondary: secondary
  },
  typography: {
    useNextVariants: true
  }
});

const jss = create(jssPreset());
const generateClassName = createGenerateClassName();

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }
  return WithRoot;
}

export default withRoot;
