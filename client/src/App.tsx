import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.component';
import LoginPage from './pages/LoginPage/LoginPage.component';
import SignupPage from './pages/SignupPage/SignupPage.component';
import Navigation from './components/Navigation/Navigation.component';

const App: React.FC = () => (
  <div className="App">
    <Navigation />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  </div>
);

export default App;
