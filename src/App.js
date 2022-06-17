import React from 'react';
import Homepage from './app/components/Homepage/Homepage';
import Submission from './app/components/Submission/Submission';
import Gallery from './app/components/Gallery/Gallery';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/submission" element={<Submission />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default App;
