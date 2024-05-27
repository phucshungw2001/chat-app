import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../FireBase/config";
import { createContext, useEffect } from "react";
import { Spin } from "antd";
import { set } from "firebase/database";

export const AuthContext = createContext();

function Auth({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setIsLoading(false);
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        navigate("/chatroom");
      } else {
        setIsLoading(false);
        navigate("/");
      }
    });
    return () => {
      unsubribed();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}

export default Auth;
