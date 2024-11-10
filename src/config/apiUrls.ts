export const apiUrls = {
  baseUrl: 'https://api.escuelajs.co/api/v1',
  products: {
    list: (offset: number, limit: number) => `/products?offset=${offset}&limit=${limit}`,
    detail: (id: number) => `/products/${id}`,
  },
};
