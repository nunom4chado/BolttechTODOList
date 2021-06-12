import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";

import authService from "../services/authService";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      authStorage.storeData(response);
      setUser(response);
    } catch (error) {
      // show error
      console.log("error while loggin in");
    }
  };

  const logout = () => {
    setUser(null);
    authStorage.removeData();
  };

  return { user, login, logout };
};

export default useAuth;
