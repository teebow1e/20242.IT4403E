import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import MenuScreen from './MenuScreen';
import './App.css';

const user = null; // or use state/context to manage login

function App() {
  return (
    <Router>
      <Routes>
        {/* Main layout with home screen */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
        </Route>

        {/* Sign in route with redirect if logged in */}
        <Route
          path="/account/signin"
          element={
            user ? <Navigate to="/menu" replace /> : <LoginScreen />
          }
        />

        {/* Sign up route with redirect if logged in */}
        <Route
          path="/account/create"
          element={
            user ? <Navigate to="/menu" replace /> : <SignupScreen />
          }
        />

        {/* Menu page only for logged-in users */}
        <Route
          path="/menu"
          element={
            user ? (
              <Layout>
                <MenuScreen />
              </Layout>
            ) : (
              <Navigate to="/account/signin" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
