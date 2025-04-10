import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MenuScreen from './screens/MenuScreen';
import FeaturedScreen from './screens/FeaturedScreen';
import {selectUser} from './features/UserSlice';
import {auth} from './firebase';
import {login, logout} from './features/UserSlice'; 
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is signed in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName
        }));
      } else {
        // User is signed out
        dispatch(logout());
      }
    }
    );
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Nesting routes inside Layout so they share Header, Footer, and Outlet */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route
            path="account/signin"
            element={user ? <Navigate to="/menu" replace /> : <LoginScreen />}
          />
          <Route
            path="account/create"
            element={user ? <Navigate to="/menu" replace /> : <SignupScreen />}
          />
          <Route
            path="menu"
            element={user ? <MenuScreen /> : <Navigate to="/account/signin" replace />}
          />
          <Route 
            path="menu/featured"
            element={<FeaturedScreen/>}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
