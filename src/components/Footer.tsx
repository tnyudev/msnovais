import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { content } from '@/config/content';
import logo from '@/assets/images/logo.png';

const Footer = () => {
  const { footer, contact, site } = content;

  return (
    <footer className="bg-primary text-white pt-20 pb-10 border-t border-white/10" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Logo and About */}
          <div>
            <img src={logo} alt={site.name} className="h-20 mb-6" loading="lazy" />
            <p className="font-roboto text-gray-300 leading-relaxed mb-8 max-w-sm">
              {footer.about}
            </p>
            <div className="flex space-x-4">
              <a
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300"
                aria-label="Visite nossa página no Facebook"
              >
                <Facebook size={20} aria-hidden="true" />
              </a>
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300"
                aria-label="Visite nosso perfil no Instagram"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-8 text-secondary relative inline-block">
              {footer.servicesTitle}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {footer.servicesList.map((service, index) => (
                <li key={index} className="font-roboto text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-3" aria-hidden="true"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-8 text-secondary relative inline-block">
              {footer.contactTitle}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start group">
                <Phone size={20} className="mr-4 text-secondary mt-1 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <div>
                  <span className="block text-sm text-gray-400 mb-1">Telefone</span>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-colors font-roboto text-lg"
                  >
                    {contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <Mail size={20} className="mr-4 text-secondary mt-1 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <div>
                  <span className="block text-sm text-gray-400 mb-1">E-mail</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-secondary transition-colors font-roboto"
                  >
                    {contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <MapPin size={20} className="mr-4 text-secondary mt-1 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <div>
                  <span className="block text-sm text-gray-400 mb-1">Localização</span>
                  <span className="font-roboto text-gray-300">
                    {contact.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="font-roboto text-sm text-gray-400">
            {site.copyright}
            <br />
            <span className="text-xs text-gray-500 mt-2 block">CNPJ: {site.cnpj}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
