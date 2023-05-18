import { useState } from 'react';
import { Input, Modal,  } from 'antd';

import { Btn } from '../../styles/GlobalStyled';
import {SigninForm} from 

import NavbarStyled from './navbar.styled';

const { Search } = Input;

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <NavbarStyled>
        <h1 className='logo'>Recipify</h1>
        <div className='menu'>
          <span className='menu__item'>Explore</span>

          <div className='divider'></div>

          <Btn onClick={toggleModal} type='primary'>
            Sign In
          </Btn>
          <Btn onClick={toggleModal} type='default'>
            Join Us
          </Btn>
        </div>
      </NavbarStyled>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
      >
        <Input placeholder='Email Address' />
        <Input.Password placeholder='Password' />
      </Modal>
    </>
  );
};

export default Navbar;
