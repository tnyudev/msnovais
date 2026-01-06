import { content } from '@/config/content';
import { Star, Quote } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const { testimonials } = content;
  const [emblaRef] = useEmblaCarousel(
    { loop: true, duration: 50 }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={i < rating ? "text-secondary fill-secondary" : "text-gray-300"}
        aria-hidden="true"
      />
    ));
  };

  return (
    <section id="depoimentos" className="py-24 bg-primary relative overflow-hidden" aria-labelledby="testimonials-title">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            id="testimonials-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-montserrat text-white mb-6"
          >
            {testimonials.title}
          </motion.h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-8 rounded-full"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto font-roboto text-lg"
          >
            {testimonials.subtitle}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto" ref={emblaRef}>
          <div className="flex">
            {testimonials.items.map((item) => (
              <div key={item.id} className="flex-[0_0_100%] min-w-0 px-4">
                <article
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 text-center relative hover:bg-white/15 transition-colors duration-300"
                >
                  <Quote className="absolute top-8 left-8 text-secondary/20 rotate-180" size={64} aria-hidden="true" />

                  <div className="flex justify-center mb-6 relative z-10" aria-label={`Avaliação: ${item.rating} de 5 estrelas`}>
                    {renderStars(item.rating)}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-white font-roboto italic mb-8 relative z-10 leading-relaxed">
                    "{item.text}"
                  </blockquote>

                  <footer className="relative z-10">
                    <cite className="not-italic">
                      <h4 className="text-xl font-bold font-montserrat text-secondary mb-1">
                        {item.author}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {new Date(item.date).toLocaleDateString('pt-BR')}
                      </p>
                    </cite>
                  </footer>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
