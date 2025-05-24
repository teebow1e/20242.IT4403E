import { Outlet } from 'react-router-dom';
import Header from './setup/Header';
import Footer from './setup/Footer';
import WaiterHeader from './setup/WaiterHeader';
import AdminHeader from './setup/AdminHeader';

const Layout = (prop) => (
  <>
    {(prop.page == 'waiter') 
      ? <WaiterHeader /> 
      : (prop.page == 'admin') 
        ? <AdminHeader />
        : <Header menuPage={prop.menuPage} />}
    <Outlet /> {/* This is where HomeScreen will render */}
    <Footer />
  </>
);

export default Layout;
