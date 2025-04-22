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
import './index.css';


import HotCoffee from './screens/menu/hotcoffee/HotCoffee';
import HotTea from './screens/menu/hottea/HotTea';
import Refreshers from './screens/menu/refresher/Refreshers';  
import Frappuccino from './screens/menu/frappuccino/Frappuccino';
import ColdCoffee from './screens/menu/coldcoffee/ColdCoffee';
import IcedEnergy from './screens/menu/icedenergy/IcedEnergy'; 

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
        <Route path="/" element={<Layout menuPage={false}/>}>
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
            path="account/logout"
            element={<Navigate to="/" replace />}
          />
          <Route 
            path="menu/featured"
            element={<FeaturedScreen/>}
          />
          <Route 
            path="menu/drinks/hot-coffees"
            element={<HotCoffee/>}
          />
          <Route 
            path="menu/drinks/hot-teas"
            element={<HotTea/>}
          />
          <Route 
            path="menu/drinks/refreshers"
            element={<Refreshers/>}
          />
          <Route
            path="menu/drinks/frappuccino-blended-beverages"
            element={<Frappuccino/>}
          />
          <Route
            path="menu/drinks/cold-coffees"
            element={<ColdCoffee/>}
          />
          <Route
            path="menu/drinks/iced-energy"
            element={<IcedEnergy/>} 
          />  
        </Route>

        {user ? (
          <Route path="/menu" element={<Layout menuPage={true} />}>
            <Route index element={<MenuScreen />} />
          </Route>
        ) : (
          <Route path="/menu" element={<Navigate to="/account/signin" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
