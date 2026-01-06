import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { content } from '@/config/content';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = content.hero.slides;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(content.hero.cta.link);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative h-[90vh] min-h-[600px] overflow-hidden bg-primary" aria-label="Banner principal">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover opacity-70"
            loading="eager"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-primary/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center z-10">
        <motion.div
          key={`text-${currentSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-montserrat mb-2 text-white leading-tight">
            {slides[currentSlide].title}
          </h1>
          {slides[currentSlide].subtitle && (
            <h2 className="text-2xl md:text-4xl font-light font-montserrat text-secondary mb-6">
              {slides[currentSlide].subtitle}
            </h2>
          )}
          <p className="text-lg md:text-2xl mb-10 font-roboto text-gray-200 border-l-4 border-secondary pl-6 max-w-2xl">
            {slides[currentSlide].description}
          </p>

          <motion.a
            href={content.hero.cta.link}
            onClick={handleCtaClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-secondary hover:bg-secondary/90 text-primary font-bold py-4 px-10 rounded-full font-montserrat inline-flex items-center shadow-lg hover:shadow-secondary/50 transition-all"
            aria-label="Entrar em contato"
          >
            {content.hero.cta.text} <ChevronRight className="ml-2" size={24} />
          </motion.a>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-20" role="tablist" aria-label="Slides do banner">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-12 bg-secondary' : 'w-3 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
            aria-selected={currentSlide === index}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
