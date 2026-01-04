import React, { useState } from 'react';
import bannerImgage from '../../assets/banner-image.svg';
import bannerImgage2 from '../../assets/banner-image-2.svg';
import bannerImgage3 from '../../assets/banner-image-3.svg';
import { Link } from 'react-router';

const BannerCarousel = () => {
  const slides = [
    {
      id: 1,
      title: 'Take Control of Your Finances',
      subtitle:
        'Start your journey towards financial freedom. Save smart, invest wisely, and watch your money grow with FinEase.',
      image: bannerImgage,
    },
    {
      id: 2,
      title: 'Plan Your Budget Wisely',
      subtitle:
        'Track expenses, save more, and reach your financial goals faster with smart planning tools.',
      image: bannerImgage2,
    },
    {
      id: 3,
      title: 'Invest in Your Future',
      subtitle:
        'Make your money work for you. Learn investment strategies and grow wealth over time.',
      image: bannerImgage3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="shrink-0 w-full flex flex-col lg:flex-row-reverse gap-10 p-0 xl:justify-between items-center"
          >
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="md:max-w-lg lg:max-w-sm xl:max-w-lg"
            />

            {/* Text */}
            <div className="flex flex-col items-center text-center lg:items-start lg:pr-20 lg:text-left xl:max-w-1/2">
              <h1 className="mb-4 text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-primary dark:text-base-100">
                {slide.title.split(' ').map((word, i) =>
                  ['Finances', 'Budget', 'Future'].includes(word) ? (
                    <span key={i} className="text-accent">{word} </span>
                  ) : (
                    word + ' '
                  )
                )}
              </h1>
              <p className="py-2 leading-relaxed md:max-w-xl text-secondary dark:text-base-200">
                {slide.subtitle}
              </p>
              <Link
                to="/"
                className="btn btn-hover mt-3"
                aria-label={`Learn more about ${slide.title}`}
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute flex justify-center gap-4 bottom-5 left-1/2 transform -translate-x-1/2">
        <button
          onClick={prevSlide}
          className="btn btn-circle btn-hover"
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle btn-hover"
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>
    </section>
  );
};

export default BannerCarousel;


// import React from 'react';
// import bannerImgage from '../../assets/banner-image.svg';
// import { Link } from 'react-router';

// const Banner = () => {
//   return (
//     <section>
//        <div className="hero-content flex-col lg:flex-row-reverse gap-10 p-0 xl:justify-between">
//         {/* Right side image */}
//         <img
//           src={bannerImgage}
//           alt="Financial Growth"
//           className="md:max-w-lg lg:max-w-sm xl:max-w-lg"
//         />

//         {/* Left side text */}
//         <div className='flex flex-col items-center text-center lg:items-start lg:pr-20 lg:text-justify xl:max-w-1/2'>
//           <h1 className="mb-4 text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
//             Take Control of <span className='text-accent'>Your Finances</span>
//           </h1>
//           <p className="py-2 leading-relaxed md:max-w-xl">
//             Start your journey towards financial freedom. Save smart, invest wisely, 
//             and watch your money grow with <span className="font-semibold text-primary">FinEase</span>.
//           </p>
//           <Link to="/" className="btn btn-hover mt-3">
//             Learn More
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;