import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import ListRecipes from "./recipes/ListRecipes";
import AddRecipe from "./recipes/AddRecipe";
import Navigation from "../components/Navigation";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/recipes" component={ListRecipes} />
              <Route path="/recipes/add" component={AddRecipe} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
