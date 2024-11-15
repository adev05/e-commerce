export type CategoryItemApi = {
  id: number;
  name: string;
  image: string;
};

export type CategoryItemModel = {
  id: number;
  name: string;
  image: string;
};

export const normalizeCategoryItem = (from: CategoryItemApi): CategoryItemModel => ({
  id: from.id,
  name: from.name,
  image: from.image,
});
