export const apiUrls = {
  baseUrl: 'https://api.escuelajs.co/api/v1',
  withBaseUrl: (url: string) => `${apiUrls.baseUrl}${url}`,
  products: {
    list: `/products`,
    detail: (id: number) => `/products/${id}`,
  },
  categories: {
    list: () => '/categories',
  },
};
