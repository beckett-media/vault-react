import React, { useContext } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import './TopNav.scss';

import { AuthContext } from '../../contexts/auth';
import { useCartContext } from '../../contexts/cart';

const TopNav = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const cartItemsLength = useCartContext().items.length;

  const { pathname } = useLocation();

  const isSigninPage = () => {
    return pathname === '/signin';
  };

  return (
    <div className='nav_component'>
      <div className='page-padding'>
        <div className='container-large'>
          <div className='nav_layout'>
            <div className='nav_logo-wrapper'>
              <Link to='/'>
                <img src={require('../../assets/beta-logo.png')} className='nav_logo' />
              </Link>
            </div>
            {/* {!isSigninPage() && <Navbar.Toggle aria-controls='basic-navbar-nav' />} */}
            <div className='nav_center-wrapper'>
              {authContext.isSignedIn && (
                <>
                  {/* <NavLink to='/about' className={({ isActive }) => (isActive ? 'active-nav m-2' : 'm-2')}>
                  About Vault
                </NavLink> */}
                  <NavLink to='/collection' className={({ isActive }) => (isActive ? 'nav_link--active' : 'nav_link')}>
                    My Collection
                  </NavLink>
                  <NavLink to='/market' className={({ isActive }) => (isActive ? 'nav_link--active' : 'nav_link')}>
                    Marketplace
                  </NavLink>
                </>
              )}
            </div>
            <div className='nav_end-wrapper'>
              {authContext.isSignedIn && (
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='bottom'
                >
                  <div className='nav_button'>Add Item</div>
                </OverlayTrigger>
              )}
              {!isSigninPage() && (
                <div className='nav_user-dropdown'>
                  <div className='nav_user-dropdown-button'>
                    <i className='nav_user-dropdown-button-icon fa-solid fa-user'> </i>
                  </div>
                  <div className='nav_user-dropdown-list'>
                    <Link className='nav_user-dropdown-item' to='/profile'>
                      Profile
                    </Link>
                    <Link className='nav_user-dropdown-item' to='/history'>
                      History
                    </Link>
                    <hr />
                    <div
                      className='nav_user-dropdown-item'
                      onClick={async () => {
                        authContext.signOut();
                        navigate('/');
                      }}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              )}
              {cartItemsLength ? (
                <Link to='/cart'>
                  <i className='fa-solid fa-cart-shopping mt-2 p-1'></i>
                </Link>
              ) : (
                <></>
              )}
            </div>
            {!isSigninPage() && (
              <>
                <input type='checkbox' className='nav_mobile-checkbox' id='navi-toggle' />
                <label htmlFor='navi-toggle' className='nav_mobile-hamburger-wrapper'>
                  <div className='nav_mobile-hamburger'></div>
                </label>
                <div className='nav_mobile-bg'></div>
                <div className='nav_mobile-menu'></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
