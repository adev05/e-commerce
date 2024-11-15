import { CategoryItemApi, CategoryItemModel } from './CategoryItem';

export type ProductItemApi = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: CategoryItemApi;
};

export type ProductItemModel = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: CategoryItemModel;
};

export const normalizeProductItem = (from: ProductItemApi): ProductItemModel => ({
  id: from.id,
  title: from.title,
  price: from.price,
  description: from.description,
  images: from.images,
  category: from.category,
});

export const getInitialProductItemModel = (): ProductItemModel => ({
  id: 0,
  images: [],
  category: {
    id: 0,
    name: '',
    image: '',
  },
  title: '',
  description: '',
  price: 0,
});
