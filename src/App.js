import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdatePlace from "./places/pages/UpdatePlace";

/**
  Redirect component leads to the default path
  Switch component will match the exact component that you want to redirect
*/
const App = () => {
  return (
    <div>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" component={Users} exact />
            <Route path="/:userId/Places" exact>
              <UserPlaces />
            </Route>
            <Route path="/places/new" component={NewPlace} exact />
            <Route path="/places/:placeId" component={UpdatePlace}></Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
