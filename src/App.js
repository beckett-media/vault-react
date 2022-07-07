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
import About from './app/components/About/About';
import Account from './app/components/Account/Account';
import SignIn from './app/components/SignIn/SignIn';
import Landing from './app/components/Homepage/Landing';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.scss';

import AuthProvider, { PrivateRoute } from './app/contexts/auth';
//chakra uses a default theme, this will remove it.
const emptyChakraTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '',
      },
    }),
  },
});

function App() {
  return (
    <>
      <AuthProvider>
        <ChakraProvider theme={emptyChakraTheme}>
          <Header />
          <main className=''>
            <Routes>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route path='/submission' element={<Submission />} />
                <Route path='/about' element={<About />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/item/:id' element={<Item />} />
                <Route path='/market' element={<Market />} />
                <Route path='/account' element={<Account />} />
                <Route path='/cart' element={<Cart />} />
                <Route exact path='/profile' element={<Profile />} />
                <Route path='/' element={<Homepage />} />
              </Route>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/landing' element={<Landing />} />
              <Route path='*' element={<Homepage />} />
            </Routes>
          </main>
          <Footer />
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default App;
