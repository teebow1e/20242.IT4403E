import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => (
  <>
    <Header />
    <Outlet /> {/* This is where HomeScreen will render */}
    <Footer />
  </>
);

export default Layout;
