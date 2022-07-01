import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown, Button, Container } from 'react-bootstrap';
import './Nav.scss';
import { UserContext } from '../Context/UserContext';
import { getUser } from '../../services/user';
import SubmitButton from './SubmitButton';

const TopNav = (props) => {
  const { user, setUser } = useContext(UserContext);
  // todo: get this from redux
  // TODO highlight current page
  const cart = [];
  return (
    <Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
      <Container>
        <Navbar.Brand href='/'>
          <img src='/images/beckett-logo.svg' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            {user && (
              <>
                <Nav.Link href='/about' className='about-nav'>
                  About Vault
                </Nav.Link>
                <Nav.Link href='/gallery' className='gallery-nav'>
                  My Collection
                </Nav.Link>
                <Nav.Link href='/market' className='market-nav'>
                  Marketplace
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className='ml-auto'>
            {user && (
              <Nav.Link href='/submission'>
                <SubmitButton size='sm' title='Submit Item' className='submit-nav' bg='primary' />
              </Nav.Link>
            )}
            <NavDropdown
              title={<i className='fa-solid fa-user'></i>}
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
              <NavDropdown.Item href='/account'>Account</NavDropdown.Item>
              <NavDropdown.Divider />
              {user ? (
                <NavDropdown.Item
                  onClick={async () => {
                    localStorage.setItem('user', null);
                    setUser(null);
                  }}
                >
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item
                  onClick={async () => {
                    const newUser = await getUser();
                    localStorage.setItem('user', JSON.stringify(newUser));
                    setUser(newUser);
                  }}
                >
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
            {cart.length ? (
              <Nav.Link href='/cart'>
                <i className='fa-solid fa-cart-shopping'></i>
              </Nav.Link>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
