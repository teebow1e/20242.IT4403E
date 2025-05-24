import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPassScreen';
import SignupScreen from './screens/SignupScreen';
import MenuScreen from './screens/MenuScreen';
import FeaturedScreen from './screens/FeaturedScreen';
import ProtectedRoute from './ProtectedRoute';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import WaiterScreen from './screens/WaiterScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
import UnauthorizedScreen from './screens/UnauthorizedScreen';
import ManangeUsersScreen from './screens/ManageUsersScreen';
import { auth } from './firebase';
import { getDatabase, ref, onValue } from "firebase/database";
import { login, logout, selectUser } from './features/UserSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

import HotCoffee from './screens/menu/hotcoffee/HotCoffee';
import HotTea from './screens/menu/hottea/HotTea';
import Refreshers from './screens/menu/refresher/Refreshers';
import Frappuccino from './screens/menu/frappuccino/Frappuccino';
import ColdCoffee from './screens/menu/coldcoffee/ColdCoffee';
import IcedEnergy from './screens/menu/icedenergy/IcedEnergy';
import ColdTea from './screens/menu/coldtea/ColdTea';
import BreakFast from './screens/menu/breakfast/Breakfast';
import Bakery from './screens/menu/bakery/Bakery';
import Snacks from './screens/menu/snacks/Snacks';
import Treats from './screens/menu/treats/Treats';
import Lunch from './screens/menu/lunch/Lunch';
import WholeBean from './screens/menu/wholebean/WholeBean';
import ViaInstant from './screens/menu/viainstant/ViaInstant';
import Bag from './screens/menu/bag/Bag';

import { getRedirectByRole } from './utils/RoleBasedRedirect';


function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                const db = getDatabase();
                const uid = userAuth.uid;
                const userRef = ref(db, `users/${uid}`);
                const unsubscribeDB = onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    const shouldUpdate =
                        !user ||
                        user.uid !== userAuth.uid ||
                        user.role !== data.role;

                    if (shouldUpdate) {
                        dispatch(login({
                            email: userAuth.email,
                            uid: userAuth.uid,
                            displayName: userAuth.displayName,
                            role: data.role,
                        }));
                    }
                });

                return () => {
                    // Hủy đăng ký onValue khi component unmount
                    unsubscribeDB();
                }

            } else {
                // User is signed out
                dispatch(logout());
            }
        });

        return () => unsubscribeAuth();
            // Hủy đăng ký onAuthStateChanged khi component unmount
    }, [dispatch, user]);
    
    return (
        <Router>
            <Routes>
                {/* Unauthorized route */}
                <Route path="unauthorized" element={<UnauthorizedScreen />} />

                {/* Admin routes */}
                <Route path="admin" element={
                    <Layout page={"admin"} />
                } >
                    <Route path="manage-users" element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <ManangeUsersScreen/>
                        </ProtectedRoute>
                    }/>
                </Route>

                {/* Waiter routes */}
                <Route path="waiter" element={
                      <ProtectedRoute allowedRoles={["waiter"]}>
                            <Layout page={"waiter"} />
                      </ProtectedRoute> 
                    }>  
                    <Route index element={<WaiterScreen />} />  
                </Route>

                {/* Nesting routes inside Layout so they share Header, Footer, and Outlet */}
                <Route path="/" element={<Layout menuPage={false} /> }>
                    <Route index element={<HomeScreen />} />
                    {/* User Authentication routes */}
                    <Route
                        path="account/signin"
                        element={user ? <Navigate to={getRedirectByRole(user.role)} replace /> : <LoginScreen />
                        }  
                    />
                    <Route
                        path="account/create"
                        element={user ? <Navigate to={getRedirectByRole(user.role)} replace /> : <SignupScreen />}
                    />
                    <Route
                        path="account/forgot-password"
                        element={user ? <Navigate to={getRedirectByRole(user.role)} replace /> : <ForgotPasswordScreen />}
                    />
                    <Route
                        path="account/logout"
                        element={<Navigate to="/" replace />}
                    />
                    <Route 
                        path="/account/verify-email" 
                        element={<VerifyEmailScreen />} 
                    />

                    {/* Cart and checkout routes - protected by auth */}
                    
                    <Route path="cart" element={
                        <ProtectedRoute allowedRoles={["customer"]}>
                            <CartScreen />
                        </ProtectedRoute>
                    } />
                    <Route path="checkout" element={
                        <ProtectedRoute allowedRoles={["customer"]}>
                            <CheckoutScreen />
                        </ProtectedRoute>
                    } />
                    <Route path="order-confirmation" element={
                        <ProtectedRoute allowedRoles={["customer"]}>
                            <OrderConfirmationScreen />
                        </ProtectedRoute>
                    } />
                    
                </Route>

                {/* Menu routes */}
                <Route 
                    path="/menu" 
                    element={
                      <ProtectedRoute allowedRoles={["customer"]}>
                          <Layout menuPage={true}/>
                      </ProtectedRoute> 
                    }
                >   
                    <Route index element={<MenuScreen />} />
                    <Route
                        path="featured"
                        element={<FeaturedScreen />}
                    />
                    <Route
                        path="drinks/hot-coffees"
                        element={<HotCoffee />}
                    />
                    <Route
                        path="drinks/hot-teas"
                        element={<HotTea />}
                    />
                    <Route
                        path="drinks/refreshers"
                        element={<Refreshers />}
                    />
                    <Route
                        path="drinks/frappuccino-blended-beverages"
                        element={<Frappuccino />}
                    />
                    <Route
                        path="drinks/cold-coffees"
                        element={<ColdCoffee />}
                    />
                    <Route
                        path="drinks/iced-energy"
                        element={<IcedEnergy />}
                    />
                    <Route
                        path="drinks/cold-teas"
                        element={<ColdTea />}
                    />
                    <Route
                        path="food/breakfast"
                        element={<BreakFast />}
                    />
                    <Route
                        path="food/bakery"
                        element={<Bakery />}
                    />
                    <Route
                        path="food/snacks"
                        element={<Snacks />}
                    />
                    <Route
                        path="food/treats"
                        element={<Treats />}
                    />
                    <Route
                        path="food/lunch"
                        element={<Lunch />}
                    />
                    <Route
                        path="at-home-coffee/whole-bean"
                        element={<WholeBean />}
                    />
                    <Route
                        path="at-home-coffee/via-instant"
                        element={<ViaInstant />}
                    />
                    <Route
                        path="at-home-coffee/shopping-bag"
                        element={<Bag />}
                    />                    
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
