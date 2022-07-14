import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import './Nav.scss';
import SubmitButton from './SubmitButton';
import { AuthStatus, AuthContext } from '../../contexts/auth';
import { useCartContext } from '../../contexts/cart';
import { Link } from 'react-router-dom';

const TopNav = () => {
  const authContext = useContext(AuthContext);
  const cartItemsLength = useCartContext().items.length
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
                <Link to='/about' className='about-nav'>
                  About Vault
                </Link>
                <Link to='/gallery' className='gallery-nav'>
                  My Collection
                </Link>
                <Link to='/market' className='market-nav'>
                  Marketplace
                </Link>
              </>
            )}
          </Nav>
          <Nav className='ml-auto'>
            {authContext.authStatus === AuthStatus.SignedIn && (
              <Link to='/submission'>
                <SubmitButton
                  size='sm'
                  title='Submit Item'
                  className='submit-nav'
                  bg='primary'
                />
              </Link>
            )}
            <NavDropdown
              title={<i className='fa-solid fa-user'></i>}
              id='basic-nav-dropdown'
            >
              {authContext.authStatus === AuthStatus.SignedIn ? (
                <>
                  <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                  <NavDropdown.Item href='/history'>History</NavDropdown.Item>
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
            {cartItemsLength || window.localStorage.getItem('cartItemId') ? (
              <Link to='/cart'>
                <i className='fa-solid fa-cart-shopping'></i>
              </Link>
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
