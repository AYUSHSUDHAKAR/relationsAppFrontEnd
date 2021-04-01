import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Connections from "./core/Connections";
import Home from "./core/Home";
import Relations from "./core/Relations";

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/connection" exact component={Connections} />
        <Route path="/relations" exact component={Relations} />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
