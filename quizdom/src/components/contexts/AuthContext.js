import { createContext } from "react";

const AuthContext = createContext({
  auth: false,
  toggleAuthentication: () => {},
});

export default AuthContext;
