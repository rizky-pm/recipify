import { ReactNode, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { getFirebase } from "../../firebase";
import StyledLoadingBoundary from "./styled";
import Navbar from "../Navbar";
import Footer from "../Footer";

type Props = {
  children: ReactNode;
};

const LoadingBoundary: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { auth } = getFirebase();

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      console.log("user >>>", user);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <StyledLoadingBoundary>
      <h1>loading ...</h1>
    </StyledLoadingBoundary>
  ) : (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default LoadingBoundary;
