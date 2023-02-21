// 'context' is some behind the scenes data transfer mechanism
// and it's built in the React

import { createContext } from "react";

const AuthContext = createContext({ isLoggedIn: false, login: () => {}, logout: () => {} });

export default AuthContext;
