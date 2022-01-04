import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.component';
import LoginPage from './pages/LoginPage/LoginPage.component';
import SignupPage from './pages/SignupPage/SignupPage.component';
import Navigation from './components/Navigation/Navigation.component';

const App: React.FC = () => {
  const [height, setHeight] = useState<number>(67);

  return (
    <div className="App" style={{ overflowX: "hidden" }}>
      <Navigation sendHeight={setHeight} />
      <Routes>
        <Route path='/' element={<HomePage navHeight={height} />} />
        <Route path='/signup' element={<SignupPage navHeight={height} />} />
        <Route path='/login' element={<LoginPage navHeight={height} />} />
      </Routes>
    </div>
  );
};

export default App;
