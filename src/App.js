import React, { useEffect } from 'react';
import Header from './app/components/Generic/Header';
import Footer from './app/components/Generic/Footer';
import Homepage from './app/components/Homepage/Homepage';
import Submission from './app/components/Submission/Submission';
import Gallery from './app/components/Gallery/Gallery';
import Item from './app/components/Item/Item';
import Market from './app/components/Market/Market';
import Profile from './app/components/Profile/Profile';
import Cart from './app/components/Cart/Cart';
import SignIn from './app/components/SignIn/SignIn';
import { Routes, Route, Router } from 'react-router-dom';
import './index.scss';

import AuthProvider, {
  PrivateRoute,
  AuthIsSignedIn,
  AuthIsNotSignedIn,
} from './app/contexts/auth';
import { ChakraProvider } from '@chakra-ui/react';

const SignInRoute = () => (
  <Routes>
    <Route exact path='/' element={<PrivateRoute />}>
      <Route exact path='/profile' element={<Profile />} />
    </Route>
    <Route path='/signin' element={<SignIn />} />
    {/* <Route path="/signup" component={SignUp} />
      <Route path="/verify" component={VerifyCode} />
      <Route path="/requestcode" component={RequestCode} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/" component={Landing} /> */}
  </Routes>
);

function App() {
  return (
    <>
      <AuthProvider>
        <AuthIsSignedIn>
          <Header />
          <main className=''>
            <Routes>
              <Route path='/submission' element={<Submission />} />
              <Route path='/about' element={<About />} />
              <Route path='/gallery' element={<Gallery />} />
              <Route path='/item/:id' element={<Item />} />
              <Route path='/market' element={<Market />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/account' element={<Account />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<Homepage />} />
            </Routes>
          </main>
          <Footer />
        </AuthIsSignedIn>
        <AuthIsNotSignedIn>
          <ChakraProvider>
            <SignInRoute />
          </ChakraProvider>
        </AuthIsNotSignedIn>
      </AuthProvider>
    </>
  );
}

export default App;
