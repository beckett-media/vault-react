import React from 'react';
import Header from './app/components/Generic/Header';
import Footer from './app/components/Generic/Footer';
import Frequently from './app/components/Generic/Frequently';
import Privacy from './app/components/Generic/Privacy';
import Support from './app/components/Generic/Support';
import Terms from './app/components/Generic/Terms';
import Homepage from './app/components/Homepage/Homepage';
import Submission from './app/components/Submission/Submission';
import Gallery from './app/components/Gallery/Gallery';
import Item from './app/components/Item/Item';
import Withdraw from './app/components/Withdraw/Withdraw';
import Market from './app/components/Market/Market';
import Profile from './app/components/Profile/Profile';
import Cart from './app/components/Cart/Cart';
import About from './app/components/About/About';
import SignIn from './app/components/SignIn/SignIn';
import Landing from './app/components/Homepage/Landing';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.scss';

import AuthProvider, { PrivateRoute } from './app/contexts/auth';
// chakra uses a default theme, this will remove it.
const emptyChakraTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '',
        color: 'white',
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
                <Route path='/withdraw' element={<Withdraw />} />
                <Route path='/cart' element={<Cart />} />
                <Route exact path='/profile' element={<Profile />} />
                <Route path='/support' element={<Support />} />
                <Route path='/' element={<Homepage />} />
              </Route>
              <Route path='/frequently' element={<Frequently />} />
              <Route path='/privacy' element={<Privacy />} />
              <Route path='/terms' element={<Terms />} />
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
