import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import styles from './styles/slideshow.module.scss';

type Props = {
  className?: string;
  previewImage?: { link: string; alt: string };
  images: { link: string; alt: string }[];
};
export function Slideshow({ className, previewImage, images }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevSlideIndex, setprevSlideIndex] = useState(0);
  const [swapAnimationInProgress, setSwapAnimationInProgress] = useState(false);

  const swapSlide = (direction: 'prev' | 'next') => {
    if (swapAnimationInProgress) return;

    setCurrentImageIndex((state) => {
      let newState;

      if (direction === 'prev') newState = state > 0 ? state - 1 : state;
      else newState = state < images.length - 1 ? state + 1 : state;

      if (newState !== state) {
        setSwapAnimationInProgress(true);
        setprevSlideIndex(state);
      }
      return newState;
    });
  };

  const onSwapAnimationEnd = () => {
    setSwapAnimationInProgress(false);
    setprevSlideIndex(currentImageIndex);
  };

  return (
    <div className={cn(styles['slideshow'], className)}>
      {previewImage && (
        <Image
          src={previewImage.link}
          alt={previewImage.alt}
          fill
          style={{ objectFit: 'contain' }}
        />
      )}
      <div
        className={cn(styles['slideshow__slides'], {
          [styles['slideshow__slides_go-from_right']]:
            swapAnimationInProgress && prevSlideIndex < currentImageIndex,
          [styles['slideshow__slides_go-from_left']]:
            swapAnimationInProgress && prevSlideIndex > currentImageIndex,
        })}
        onAnimationEnd={onSwapAnimationEnd}
      >
        <button
          className={styles['slideshow__prev-btn']}
          onClick={() => swapSlide('prev')}
          aria-label="prev slide"
          aria-hidden
        />

        {images.map((el, i) => (
          <div
            className={cn(styles['slideshow__slide'], {
              [styles['slideshow__slide_hidden']]: i !== currentImageIndex && i !== prevSlideIndex,
            })}
            key={`${el.link}${i}`}
          >
            <Image
              src={el.link}
              alt={el.alt}
              fill
              style={{ objectFit: 'contain' }}
              loading={currentImageIndex + 1 === i ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        <button
          className={styles['slideshow__next-btn']}
          onClick={() => swapSlide('next')}
          aria-label="next slide"
          aria-hidden
        />
      </div>
    </div>
  );
}
