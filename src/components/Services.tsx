import { content } from '@/config/content';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Services = () => {
  const { services } = content;

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(services.cta.link);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="servicos" className="py-24 bg-muted relative overflow-hidden" aria-labelledby="services-title">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-tr-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            id="services-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-montserrat text-primary mb-6"
          >
            {services.title}
          </motion.h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-8 rounded-full"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto font-roboto text-lg"
          >
            {services.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.items.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border group"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon size={32} className="text-primary group-hover:text-secondary transition-colors duration-300" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold font-montserrat text-primary mb-4 group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-roboto leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href={services.cta.link}
            onClick={handleCtaClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-10 rounded-full font-montserrat inline-flex items-center transition-all hover:shadow-lg hover:scale-105"
            aria-label="Solicitar orçamento"
          >
            {services.cta.text} <ChevronRight className="ml-2" size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
