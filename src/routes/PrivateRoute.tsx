import React, { ReactNode, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { Navigate } from "react-router-dom";

import { getFirebase } from "../firebase";

type Props = {
  children: ReactNode;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { auth } = getFirebase();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userString = JSON.stringify(user);
        localStorage.setItem("user", userString);
      } else {
        localStorage.removeItem("user");
      }
    });
  }, []);

  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to={"/signin"} replace={true} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
