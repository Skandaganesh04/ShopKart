import { CommonProvider } from './contexts/common/commonContext';
import { CartProvider } from './contexts/cart/cartContext';
import Header from './components/common/Header';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import { FiltersProvider } from './contexts/filters/filtersContext';
import { useEffect, useState } from 'react';


const App = () => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const email = localStorage.getItem("token");
    if(email){
      setAuth(true);
    }
  },[]);
  return (
    <>
      <CommonProvider>
        <FiltersProvider>
          <CartProvider>
            <Header auth={auth} setAuth={setAuth} />
            <RouterRoutes auth={auth} />
            <Footer />
            <BackTop />
          </CartProvider>
        </FiltersProvider>
      </CommonProvider>
    </>
  );
};

export default App;
