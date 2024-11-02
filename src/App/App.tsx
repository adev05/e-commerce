import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Product from './pages/Product';
import { routerUrls } from '../config/routes';
import Catalog from './pages/Catalog';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={routerUrls.catalog.mask} element={<Catalog />} />
        <Route path={routerUrls.productDetail.mask} element={<Product />} />
        <Route path="*" element={<Navigate to={routerUrls.catalog.create()} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
