import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebase.config";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  //   const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(true);

  const authInfo = {};
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
