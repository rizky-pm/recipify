import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { User as UserIcon } from "@icon-park/react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

import { getFirebase } from "../../firebase";
import { Btn } from "../../styles/GlobalStyled";
import NavbarStyled from "./navbar.styled";
import SigninModal from "../SigninModal";
import SignupModal from "../SignupModal";

const Navbar = () => {
  const [showSigninModal, setShowSigninModal] = useState<boolean>(false);
  const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { auth } = getFirebase();

  const toggleModal = (target: "signin-modal" | "signup-modal") => {
    if (target === "signin-modal") {
      setShowSigninModal(!showSigninModal);
    } else {
      setShowSignupModal(!showSignupModal);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: <span>Profile</span>,
      key: "profile",
    },
    {
      label: <span>Setting</span>,
      key: "setting",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Btn
          onClick={() => {
            signOut(auth);
            localStorage.removeItem("user");
          }}
          type="primary"
        >
          Sign out
        </Btn>
      ),
      key: "sign-out",
    },
  ];

  onAuthStateChanged(auth, (result) => {
    if (result) {
      setCurrentUser(result);
    } else {
      setCurrentUser(null);
    }
  });

  return (
    <NavbarStyled>
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="logo"
        role="button"
      >
        Recipify
      </h1>
      <div className="menu">
        <span className="menu__item">Explore</span>
        {!currentUser ? (
          <>
            <div className="divider"></div>

            <Btn
              onClick={() => {
                toggleModal("signin-modal");
              }}
              type="primary"
            >
              Sign In
            </Btn>
            <Btn
              onClick={() => {
                toggleModal("signup-modal");
              }}
              type="default"
            >
              Sign Up
            </Btn>
          </>
        ) : (
          <>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <div className="user__icon">
                  <UserIcon theme="outline" size={18} />
                </div>
              </a>
            </Dropdown>
            {/* <Btn
              onClick={() => {
                signOut(auth);
              }}
              type="primary"
            >
              Sign out
            </Btn> */}
          </>
        )}
      </div>

      <SigninModal
        showSigninModal={showSigninModal}
        setShowSigninModal={setShowSigninModal}
      />

      <SignupModal
        showSignupModal={showSignupModal}
        setShowSignupModal={setShowSignupModal}
      />
    </NavbarStyled>
  );
};

export default Navbar;
