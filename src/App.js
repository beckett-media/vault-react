import React, { useEffect, useMemo, useState } from 'react';
import Header from './app/components/Generic/Header';
import Footer from './app/components/Generic/Footer';
import Homepage from './app/components/Homepage/Homepage';
import Submission from './app/components/Submission/Submission';
import Gallery from './app/components/Gallery/Gallery';
import Item from './app/components/Item/Item';
import Market from './app/components/Market/Market';
import Profile from './app/components/Profile/Profile';
import Cart from './app/components/Cart/Cart';
import Account from './app/components/Account/Account';
import About from './app/components/About/About';
import { Routes, Route } from 'react-router-dom';
import './index.scss';
import Settings from './app/components/Settings/Settings';
import { Container } from 'react-bootstrap';
import { UserContext } from './app/components/Context/UserContext';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <>
      <UserContext.Provider value={userValue}>
        <Header />
        <main className=''>
          <Container>
            <Routes>
              <Route path='/submission' element={<Submission />} />
              <Route path='/about' element={<About />} />
              <Route path='/gallery' element={<Gallery />} />
              <Route path='/item/:id' element={<Item />} />
              <Route path='/market' element={<Market />} />
              {/* PrivateRoute */}
              <Route path='/profile' element={<Profile />} />
              <Route path='/account' element={<Account />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<Homepage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
