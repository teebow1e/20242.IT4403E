import { Outlet } from 'react-router-dom';
import Header from './setup/Header';
import Footer from './setup/Footer';

const Layout = (prop) => (
  <>
    <Header menuPage={prop.menuPage}/>
    <Outlet /> {/* This is where HomeScreen will render */}
    <Footer />
  </>
);

export default Layout;
