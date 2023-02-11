import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";

{
  /**
  Redirect component leads to the default path
  Switch component will match the exact component that you want to redirect
*/
}
const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Users} exact />
          <Route path="/places/new" component={NewPlace} exact />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
