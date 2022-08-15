import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import * as cognito from '../libs/cognito';
import { getAdminUserGroups } from '../services/user';

export const AuthStatus = {
  Loading: 'Loading',
  SignedIn: 'SignedIn',
  SetPassword: 'SetPassword',
  SignedOut: 'SignedOut',
};

const defaultState = {
  sessionInfo: {},
  isAdmin: false,
  adminGroups: [],
  authStatus: AuthStatus.Loading,
};

export const AuthContext = React.createContext(defaultState);

export const Loading = () => <div>Loading...</div>;

export const PrivateRoute = () => {
  const { authStatus } = useContext(AuthContext);

  if (authStatus === AuthStatus.Loading) {
    return <Loading />;
  }

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return authStatus === AuthStatus.SignedIn ? <Outlet /> : <Navigate to='/signin' replace={true} />;
};

export const AdminRoute = () => {
  const { isAdmin, authStatus } = useContext(AuthContext);

  if (authStatus === AuthStatus.Loading) {
    return <Loading />;
  }

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAdmin ? <Outlet /> : <Navigate to='/signin' replace={true} />;
};

export const OnlyUnathenticated = () => {
  const { authStatus } = useContext(AuthContext);
  if (authStatus === AuthStatus.Loading) {
    return <Loading />;
  }

  return [AuthStatus.SignedOut, AuthStatus.SetPassword].includes(authStatus) ? (
    <Outlet />
  ) : (
    <Navigate to='/' replace={true} />
  );
};

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
  const [adminGroups, setAdminGroups] = useState([]);
  const [sessionInfo, setSessionInfo] = useState({});
  const [attrInfo, setAttrInfo] = useState([]);

  useEffect(() => {
    getSessionInfo();
  }, []);

  async function getSessionInfo() {
    setAuthStatus(AuthStatus.Loading);

    try {
      const session = await getSession();
      setSessionInfo({
        accessToken: session.accessToken.jwtToken,
        refreshToken: session.refreshToken.token,
      });
      window.localStorage.setItem('accessToken', `${session.accessToken.jwtToken}`);
      window.localStorage.setItem('refreshToken', `${session.refreshToken.token}`);

      const attr = await getAttributes();
      setAttrInfo(attr);

      try {
        const data = await getAdminUserGroups(session.accessToken.jwtToken);
        setAdminGroups(data.groups || []);
      } catch (err) {
        setAdminGroups([]);
        console.error('getAdminUserGroups', err);
      }

      setAuthStatus(AuthStatus.SignedIn);
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut);
    }
  }

  async function signInWithEmail(username, password, setPassword = null) {
    try {
      const [status, res] = await cognito.signInWithEmail(username, password, setPassword);
      if (status !== 'NEW_PASSWORD') {
        getSessionInfo();
      }
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut);
      throw err;
    }
  }

  async function signUpWithEmail(username, email, password) {
    try {
      await cognito.signUpUserWithEmail(username, email, password);
    } catch (err) {
      throw err;
    }
  }

  async function signUpUser(username, password, preferred_username, email, phone_number, given_name, family_name) {
    try {
      await cognito.signUpUser(username, password, preferred_username, email, phone_number, given_name, family_name);
    } catch (err) {
      throw err;
    }
  }

  function signOut() {
    cognito.signOut();
    setAuthStatus(AuthStatus.SignedOut);
    setAdminGroups([]);
    setSessionInfo({});
  }

  async function verifyCode(username, code) {
    try {
      await cognito.verifyCode(username, code);
    } catch (err) {
      throw err;
    }
  }

  async function getSession() {
    try {
      const session = await cognito.getSession();
      return session;
    } catch (err) {
      throw err;
    }
  }

  async function getAttributes() {
    try {
      const attr = await cognito.getAttributes();
      return attr;
    } catch (err) {
      throw err;
    }
  }

  async function setAttribute(attr) {
    await setAttributes([attr]);
  }

  async function setAttributes(attrs) {
    try {
      const res = await cognito.setAttributes(attrs);
      return res;
    } catch (err) {
      throw err;
    }
  }

  async function sendCode(username) {
    try {
      await cognito.sendCode(username);
    } catch (err) {
      throw err;
    }
  }

  async function forgotPassword(username, code, password) {
    try {
      await cognito.forgotPassword(username, code, password);
    } catch (err) {
      throw err;
    }
  }

  async function changePassword(oldPassword, newPassword) {
    try {
      await cognito.changePassword(oldPassword, newPassword);
    } catch (err) {
      throw err;
    }
  }

  const state = {
    authStatus,
    adminGroups,
    sessionInfo,
    attrInfo,
    isSignedIn: authStatus === AuthStatus.SignedIn,
    isAdmin: (adminGroups || []).includes('admin'),
    signUpUser,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    verifyCode,
    getSession,
    sendCode,
    forgotPassword,
    changePassword,
    getAttributes,
    setAttribute,
    setAttributes,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
