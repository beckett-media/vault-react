import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import './Nav.scss';
import SubmitButton from './SubmitButton';
import { AuthStatus, AuthContext } from '../../contexts/auth';
import { useCartContext } from '../../contexts/cart';
import { Link } from 'react-router-dom';

const TopNav = () => {
  const authContext = useContext(AuthContext);
  const cartItemsLength = useCartContext().items.length;
  return (
    <Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>
            <img src='/images/beckett-logo.svg' />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            {authContext.authStatus === AuthStatus.SignedIn && (
              <>
                <Link to='/about' className='about-nav m-2'>
                  About Vault
                </Link>
                <Link to='/gallery' className='gallery-nav m-2'>
                  My Collection
                </Link>
                <Link to='/market' className='market-nav m-2'>
                  Marketplace
                </Link>
              </>
            )}
          </Nav>
          <Nav className='ml-auto'>
            {authContext.authStatus === AuthStatus.SignedIn && (
              <Link to='/submission'>
                <SubmitButton size='sm' title='Submit Item' className='submit-nav' bg='primary' />
              </Link>
            )}
            <NavDropdown title={<i className='fa-solid fa-user'></i>} id='basic-nav-dropdown'>
              {authContext.authStatus === AuthStatus.SignedIn ? (
                <>
                  <NavDropdown.Item>
                    <Link to='/profile'>Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to='/history'>History</Link>
                  </NavDropdown.Item>
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
                <NavDropdown.Item>
                  <Link to='/login'>Login</Link>
                </NavDropdown.Item>
              )}
            </NavDropdown>
            {cartItemsLength ? (
              <Link to='/cart'>
                <i className='fa-solid fa-cart-shopping mt-2 p-1'></i>
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
