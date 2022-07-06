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
import './index.scss';

import AuthProvider, {
  PrivateRoute,
} from './app/contexts/auth';


function App() {
  return (
    <>
      <AuthProvider>
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
              <Route path='/' element={<Landing />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='*' element={<Homepage />} />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
    </>
  );
}

export default App;
