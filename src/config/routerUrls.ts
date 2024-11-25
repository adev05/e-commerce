export const routerUrls = {
  root: {
    mask: '/',
    create: () => '/',
  },
  aboutUs: {
    mask: '/about-us',
    create: () => '/about-us',
  },
  catalog: {
    mask: '/catalog',
    create: () => '/catalog',
  },
  productDetail: {
    mask: '/product/:id',
    create: (id: number) => `/product/${id}`,
  },
  categories: {
    mask: '/categories',
    create: () => '/categories',
  },
  cart: {
    mask: '/cart',
    create: () => '/cart',
  },
  notFound: {
    mask: '/not-found',
    create: () => '/not-found',
  },
};
