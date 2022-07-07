import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import './Nav.scss';
import SubmitButton from './SubmitButton';
import { AuthStatus, AuthContext } from '../../contexts/auth';

const TopNav = () => {
  const authContext = useContext(AuthContext);
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
            {authContext.authStatus === AuthStatus.SignedIn && (
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
            {authContext.authStatus === AuthStatus.SignedIn && (
              <Nav.Link href='/submission'>
                <SubmitButton
                  size='sm'
                  title='Submit Item'
                  className='submit-nav'
                  bg='primary'
                />
              </Nav.Link>
            )}
            <NavDropdown
              title={<i className='fa-solid fa-user'></i>}
              id='basic-nav-dropdown'
            >
              {authContext.authStatus === AuthStatus.SignedIn ? (
                <>
                  <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                  <NavDropdown.Item href='/account'>Account</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={async () => {
                      authContext.signOut();
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item href='/signin'>Login</NavDropdown.Item>
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
