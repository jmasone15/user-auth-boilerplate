import Router from "./Router";
import React from "react";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
