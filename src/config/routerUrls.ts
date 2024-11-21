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
  notFound: {
    mask: '/not-found',
    create: () => '/not-found',
  },
};
