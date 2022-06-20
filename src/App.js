import React from 'react';
import Header from './app/components/Generic/Header';
import Footer from './app/components/Generic/Footer';
import Homepage from './app/components/Homepage/Homepage';
import Submission from './app/components/Submission/Submission';
import Gallery from './app/components/Gallery/Gallery';
import Item from './app/components/Item/Item';
import Market from './app/components/Market/Market';
import Profile from './app/components/Profile/Profile';
import Cart from './app/components/Cart/Cart';
import { Routes, Route } from 'react-router-dom';
import './index.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/submission" element={<Submission />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/market" element={<Market />} />
        {/* PrivateRoute */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
