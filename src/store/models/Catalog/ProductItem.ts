import { CategoryItemApi, CategoryItem, normalizeCategoryItem } from './CategoryItem';

export type ProductItemApi = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: CategoryItemApi;
};

export type ProductItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: CategoryItem;
};

export const normalizeProductItem = (from: ProductItemApi): ProductItem => ({
  id: from.id,
  title: from.title,
  price: from.price,
  description: from.description,
  images: from.images,
  category: normalizeCategoryItem(from.category),
});

export const getInitialProductItem = (): ProductItem => ({
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
