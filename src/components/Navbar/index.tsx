import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Btn } from '../../styles/GlobalStyled';
import NavbarStyled from './navbar.styled';
import SigninModal from '../SigninModal';
import SignupModal from '../SignupModal';

const Navbar = () => {
  const [showSigninModal, setShowSigninModal] = useState<boolean>(false);
  const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleModal = (target: 'signin-modal' | 'signup-modal') => {
    if (target === 'signin-modal') {
      setShowSigninModal(!showSigninModal);
    } else {
      setShowSignupModal(!showSignupModal);
    }
  };

  return (
    <NavbarStyled>
      <h1
        onClick={() => {
          navigate('/');
        }}
        className='logo'
        role='button'
      >
        Recipify
      </h1>
      <div className='menu'>
        <span className='menu__item'>Explore</span>

        <div className='divider'></div>

        <Btn
          onClick={() => {
            toggleModal('signin-modal');
          }}
          type='primary'
        >
          Sign In
        </Btn>
        <Btn
          onClick={() => {
            toggleModal('signup-modal');
          }}
          type='default'
        >
          Upload Your Recipe
        </Btn>
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
