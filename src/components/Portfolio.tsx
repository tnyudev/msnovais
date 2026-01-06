import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { content, PortfolioItem } from '@/config/content';
import { motion, AnimatePresence } from 'framer-motion';

type FilterCategory = 'Todos' | 'Construção' | 'Reforma' | 'Projeto';

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('Todos');
  const { portfolio } = content;

  const categories: FilterCategory[] = ['Todos', 'Construção', 'Reforma', 'Projeto'];

  const filteredItems = activeFilter === 'Todos' 
    ? portfolio.items 
    : portfolio.items.filter(item => item.category === activeFilter);

  const openModal = (image: PortfolioItem) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="portfolio" className="py-24 bg-background" aria-labelledby="portfolio-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            id="portfolio-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-montserrat text-primary mb-6"
          >
            {portfolio.title}
          </motion.h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-8 rounded-full"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto font-roboto text-lg mb-10"
          >
            {portfolio.subtitle}
          </motion.p>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
            role="tablist"
            aria-label="Filtrar portfólio por categoria"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                }`}
                role="tab"
                aria-selected={activeFilter === category}
                aria-controls="portfolio-grid"
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        <div 
          id="portfolio-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="tabpanel"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => openModal(item)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                    <ZoomIn className="text-secondary mb-4" size={32} aria-hidden="true" />
                    <h3 className="text-xl font-bold font-montserrat text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-secondary text-primary text-sm font-bold rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`Imagem ampliada: ${selectedImage.title}`}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-secondary transition-colors"
                aria-label="Fechar imagem"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold font-montserrat text-white mb-2">{selectedImage.title}</h3>
                <p className="font-roboto text-gray-300">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
