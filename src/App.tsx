import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Supongamos que tu página principal se llama Home
import Success from './pages/Success';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
