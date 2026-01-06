import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { content } from '@/config/content';
import logo from '@/assets/images/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-primary/95 backdrop-blur-md shadow-lg py-0'
        : 'bg-transparent py-2'
        }`}
      role="navigation"
      aria-label="Menu principal"
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-20 md:h-24">
        <a
          href="#home"
          className="flex items-center group relative h-full w-48 md:w-64 pl-2"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="Novais Construtora - Ir para o início"
        >
          <div className="absolute -top-1 md:-top-1.2 left-2 w-full">
            <img
              src={logo}
              alt={content.site.name}
              className="h-22 md:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105 origin-top-left"
              loading="eager"
            />
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {content.navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="nav-link text-white font-montserrat font-medium hover:text-secondary transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none hover:text-secondary transition-colors"
          onClick={toggleMenu}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary/98 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {content.navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white font-montserrat font-medium text-lg hover:text-secondary transition-colors pl-4 border-l-2 border-transparent hover:border-secondary"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
