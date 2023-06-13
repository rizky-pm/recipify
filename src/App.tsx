import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { getFirebase } from "./firebase";
import router from "./routes";

function App() {
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

  return <RouterProvider router={router} />;
}

export default App;
