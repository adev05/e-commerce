import React from 'react';
import s from './ImageCarousel.module.scss';
import cn from 'classnames';
import Button from '@components/Button';
import imageNotFound from '@assets/images/image-not-found.svg';

interface ImageCarouselProps {
    images: string[];
    className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [imageSrc, setImageSrc] = React.useState(images[currentIndex]);

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    const handleError = () => {
        setImageSrc(imageNotFound);
    };

    React.useEffect(() => {
        setImageSrc(images[currentIndex]);
    }, [currentIndex, images]);

    if (!images.length) {
        return (
            <div className={cn(s.carousel, className)}>
                <img src={imageNotFound} alt="Not Found" className={s.carousel__image} />
            </div>
        );
    }

    return (
        <div className={cn(s.carousel, className)}>
            <img src={imageSrc} alt="Product" className={s.carousel__image} onError={handleError} />

            {images.length > 1 && (
                <>
                    <Button
                        className={cn(s.carousel__button, s.carousel__button_prev)}
                        onClick={handlePrev}
                        variant="secondary"
                    >
                        ←
                    </Button>
                    <Button
                        className={cn(s.carousel__button, s.carousel__button_next)}
                        onClick={handleNext}
                        variant="secondary"
                    >
                        →
                    </Button>
                    <div className={s.carousel__dots}>
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={cn(s.carousel__dot, {
                                    [s.carousel__dot_active]: index === currentIndex,
                                })}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageCarousel;