import { User } from 'firebase/auth';
import { auth } from './firebase/firebase.util';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ITPage from './pages/ITPage/ITPage.component';
import HomePage from './pages/HomePage/HomePage.component';
import LoginPage from './pages/LoginPage/LoginPage.component';
import SignupPage from './pages/SignupPage/SignupPage.component';
import Navigation from './components/Navigation/Navigation.component';
import { checkUserType } from './pages/LoginPage/LoginPage.component';
import PendingStudents from './pages/PendingStudents/PendingStudents.component';

const App: React.FC = () => {
  const [height, setHeight] = useState<number>(67);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<number>(-1);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async user => {
      setUser(user);
      if (user) {
        setUserType(await checkUserType(user.email));
      }
      else {
        setUserType(-1);
      }
    });
    return unsub;
  }, []);

  return (
    <div className="App" style={{ overflowX: "hidden" }}>
      <Navigation
        overallHeight={214}
        sendHeight={setHeight}
        homeNav={(user !== null) && (userType !== -1) ? false : true}
        userEmail={(user !== null) ? user.email : null}
        userType={userType}
      />
      <Routes>
        <Route path='/' element={<HomePage navHeight={height} />} />
        <Route path='/signup' element={<SignupPage navHeight={height} />} />
        <Route path='/login' element={<LoginPage navHeight={height} />} />
        <Route path='/it' element={<ITPage />} />
        <Route path='/it/pending' element={<PendingStudents />} />
      </Routes>
    </div>
  );
};

export default App;
