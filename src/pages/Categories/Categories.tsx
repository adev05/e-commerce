import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Text from '@components/Text';
import { CategoryItem } from '@store/models/Catalog';
import CategoryStore from '@store/CategoryStore';
import { routerUrls } from '@config/routerUrls';
import { CATEGORY_ID } from '@store/CatalogStore';
import imageNotFound from '@assets/images/image-not-found.svg';
import s from './Categories.module.scss';

const categoryStore = new CategoryStore();

const Categories: React.FC = observer(() => {
    const navigate = useNavigate();

    useEffect(() => {
        categoryStore.getCategories();
    }, []);

    const handleCategoryClick = (category: CategoryItem) => {
        const searchParams = new URLSearchParams();
        searchParams.set(CATEGORY_ID, String(category.id));
        navigate({
            pathname: routerUrls.catalog.create(),
            search: searchParams.toString()
        });
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = imageNotFound;
    };

    return (
        <div className={s.categories}>
            <Text view="title" tag="h1" className={s.categories__title}>
                Категории
            </Text>
            <div className={s.categories__grid}>
                {categoryStore.list.map((category) => (
                    <div
                        key={category.id}
                        className={s.categories__item}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className={s.categories__imageWrapper}>
                            <img
                                src={category.image}
                                alt={category.name}
                                className={s.categories__image}
                                onError={handleImageError}
                            />
                        </div>
                        <Text
                            view="p-18"
                            tag="h2"
                            className={s.categories__name}
                        >
                            {category.name}
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Categories;