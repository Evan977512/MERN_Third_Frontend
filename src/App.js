import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import UpdatePlace from "./places/pages/UpdatePlace";
import AuthContext from "./shared/context/auth-context";

/**
  Redirect component leads to the default path
  Switch component will match the exact component that you want to redirect
*/
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
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
            <Route path="/auth" component={Auth}></Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
