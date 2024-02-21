import React from 'react';
import './App.css'; // Assuming you have an App.css file for styling
import Login from './login';
import Signup from './Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// New component
function AppWrapper({ children }) {
  return (
    <div style={{ backgroundColor: '', display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
      <h1 style={{ fontFamily: 'Oswald', fontSize: '80px' }}>Puzzlex</h1>
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper></AppWrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;