export type CategoryItemApi = {
  id: number;
  name: string;
  image: string;
};

export type CategoryItem = {
  id: number;
  name: string;
  image: string;
};

export const normalizeCategoryItem = (from: CategoryItemApi): CategoryItem => ({
  id: from.id,
  name: from.name,
  image: from.image,
});
