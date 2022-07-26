import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap';
import './Nav.scss';
import { AuthContext } from '../../contexts/auth';
import { useCartContext } from '../../contexts/cart';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const TopNav = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const cartItemsLength = useCartContext().items.length;
  return (
    <Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>
            <img src={require('../../assets/beta-logo.png')} className='nav_logo' />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            {authContext.isSignedIn && (
              <>
                {/* <NavLink to='/about' className={({ isActive }) => (isActive ? 'active-nav m-2' : 'm-2')}>
                  About Vault
                </NavLink> */}
                <NavLink to='/collection' className={({ isActive }) => (isActive ? 'active-nav m-2' : 'm-2')}>
                  My Collection
                </NavLink>
                <NavLink to='/market' className={({ isActive }) => (isActive ? 'active-nav m-2' : 'm-2')}>
                  Marketplace
                </NavLink>
              </>
            )}
          </Nav>
          <Nav className='ml-auto'>
            {authContext.isSignedIn && (
              <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                placement='bottom'
              >
                <Button size='sm' className='bg submit-nav' variant='primary'>
                  Submit Item
                </Button>
              </OverlayTrigger>
            )}
            <NavDropdown title={<i className='fa-solid fa-user'></i>} id='basic-nav-dropdown'>
              {authContext.isSignedIn ? (
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
                      navigate('/');
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item>
                  <Link to='/signin'>Login</Link>
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
