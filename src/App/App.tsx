import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Product from '../pages/Product';
import { routerUrls } from '../config/routerUrls';
import Catalog from '../pages/Catalog';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import React from 'react';
import AboutUs from '@pages/AboutUs';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={routerUrls.root.mask} element={<Home />} />
        <Route path={routerUrls.aboutUs.mask} element={<AboutUs />} />
        <Route path={routerUrls.catalog.mask} element={<Catalog />} />
        <Route path={routerUrls.productDetail.mask} element={<Product />} />
        <Route path={routerUrls.notFound.mask} element={<NotFound />} />
        <Route path="*" element={<Navigate to={routerUrls.notFound.create()} replace />} />
      </Routes>
    </>
  );
};

export default App;
