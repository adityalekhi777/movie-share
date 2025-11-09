import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useMovies } from '../context/MovieContext';
import styles from './Slider.module.css';

const Slider = () => {
  const { popularMovies } = useMovies();
    const placeholder = "https://placehold.co/600x400";

  console.log(popularMovies)

  if (!popularMovies || popularMovies.length === 0) {
    return <div className={styles.slider}>Loading popular movies...</div>;
  }

  
  const getImageUrl = (images) => {
    if (images && images.fanart && images.fanart.length > 0) {
      const url = images.fanart[0];
      return url.startsWith("http") ? url : `https://${url}`;
    }
    return placeholder;
  };


  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        effect='card'
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        {popularMovies.map(movie => {
          
          return (
            <SwiperSlide key={movie.ids.trakt}>
              <img className={styles.slideImage}  src={getImageUrl(movie.images)} alt={movie.title} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
