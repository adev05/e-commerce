export const apiUrls = {
  baseUrl: 'https://api.escuelajs.co/api/v1',
  products: {
    list: `/products`,
    detail: (id: number) => `/products/${id}`,
  },
  categories: {
    list: () => '/categories',
  },
};
