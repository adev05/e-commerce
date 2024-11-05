import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Product from './pages/Product';
import { routerUrls } from '../config/routes';
import Catalog from './pages/Catalog';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={routerUrls.root.mask} element={<Home />} />
        <Route path={routerUrls.catalog.mask} element={<Catalog />} />
        <Route path={routerUrls.productDetail.mask} element={<Product />} />
        <Route path="*" element={<Navigate to={routerUrls.root.create()} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
