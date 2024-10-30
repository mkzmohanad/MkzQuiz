import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

function QuizInfoAndRules({settings}) {
    const { questionDuration, numberOfQuestions , numberOfTopPlayers , numberOfMinimumAnsweredQuestionsToWin } = settings.data;

    const eachSwiperStyle = "bg-darkColor flex items-center justify-center font-bold text-3xl text-center px-10 md:px-0"

  return (
    <div className="container">
      <h1 className="heading"></h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 'auto' },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >

        <SwiperSlide className={eachSwiperStyle}>Each question has a duration of {questionDuration} seconds.</SwiperSlide>
        <SwiperSlide className={eachSwiperStyle}>There are a total number of questions equal to {numberOfQuestions}.</SwiperSlide>
        <SwiperSlide className={eachSwiperStyle}>The highest {numberOfTopPlayers} scores will be added to the leaderboard.</SwiperSlide>
        <SwiperSlide className={eachSwiperStyle}>All questions will be about different topics of a different aspects.</SwiperSlide>
        <SwiperSlide className={eachSwiperStyle}>Once you have completed a question and confirmed it you cant change it.</SwiperSlide>
        <SwiperSlide className={eachSwiperStyle}>You will need to correctly answer at least {numberOfMinimumAnsweredQuestionsToWin} questions to consider this match as a win.</SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"><FaArrowCircleLeft /></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"><FaArrowCircleRight /></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
        
      </Swiper>
    </div>
  );
}
export default QuizInfoAndRules;