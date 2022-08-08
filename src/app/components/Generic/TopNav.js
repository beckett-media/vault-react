import React, { useContext, createRef, useCallback } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

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

  const checkboxRef = createRef();

  const toggleCheckbox = useCallback(
    (bool) => {
      checkboxRef.current.checked = bool;
    },
    [checkboxRef],
  );

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
            <div className='nav_center-wrapper'>
              {authContext.isSignedIn && (
                <>
                  <NavLink to='/my-collection' className={({ isActive }) => (isActive ? 'nav_link--active' : 'nav_link')}>
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
                <Link to='/submission'>
                  <div className='nav_button'>Add Item</div>
                </Link>
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
            {authContext.isSignedIn && (
              <div className='nav_mobile'>
                <input type='checkbox' className='nav_mobile-checkbox' id='navi-toggle' ref={checkboxRef} />
                <label htmlFor='navi-toggle' className='nav_mobile-hamburger-wrapper'>
                  <div className='nav_mobile-hamburger'></div>
                </label>
                <div className='nav_mobile-bg'></div>
                <div className='nav_mobile-menu'>
                  <NavLink to='/my-collection' onClick={() => toggleCheckbox(false)} className='nav_mobile-menu-item'>
                    My Collection
                  </NavLink>
                  <NavLink to='/market' onClick={() => toggleCheckbox(false)} className='nav_mobile-menu-item'>
                    Marketplace
                  </NavLink>
                  <NavLink to='/profile' onClick={() => toggleCheckbox(false)} className='nav_mobile-menu-item'>
                    Profile
                  </NavLink>
                  <NavLink to='/history' onClick={() => toggleCheckbox(false)} className='nav_mobile-menu-item'>
                    History
                  </NavLink>
                  <Link to='/submission'>
                    <div className='nav_button' onClick={() => toggleCheckbox(false)}>
                      Add Item
                    </div>
                  </Link>
                  <NavLink
                    to='/'
                    onClick={async () => {
                      authContext.signOut();
                      navigate('/');
                    }}
                    className='nav_mobile-menu-item'
                  >
                    Logout
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
