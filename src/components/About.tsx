import { content } from '@/config/content';
import { motion } from 'framer-motion';

const About = () => {
  const { about } = content;

  return (
    <section id="sobre" className="py-24 bg-background overflow-hidden" aria-labelledby="about-title">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={about.image}
                alt="Equipe MS Novais em obra"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary rounded-2xl -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl hidden md:block z-20 border-l-4 border-secondary">
              <p className="font-montserrat font-bold text-primary text-lg">{about.badge}</p>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 bg-secondary/20 text-primary font-bold rounded-full text-sm mb-4">
              {about.title}
            </div>
            <h2 id="about-title" className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat text-primary mb-8 leading-tight">
              {about.headline}
            </h2>

            <div className="space-y-6 text-muted-foreground font-roboto text-lg mb-10">
              {about.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {about.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center text-center p-4 rounded-xl bg-muted hover:bg-background hover:shadow-lg transition-all border border-transparent hover:border-border"
                  >
                    <div className="bg-primary/5 p-4 rounded-full mb-4 text-secondary">
                      <Icon size={32} aria-hidden="true" />
                    </div>
                    <h4 className="font-montserrat font-bold text-primary">{feature.title}</h4>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
