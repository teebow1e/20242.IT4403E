import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import HomeScreen from './HomeScreen';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Header></Header>
              <HomeScreen></HomeScreen>
			        <Footer></Footer>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
