import { useState, useRef, useCallback } from 'react';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { content } from '@/config/content';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const serviceOptions = [
  { value: 'construcao', label: 'Construção Residencial' },
  { value: 'reforma', label: 'Reforma e Ampliação' },
  { value: 'projeto', label: 'Projeto Arquitetônico' },
  { value: 'comercial', label: 'Construção Comercial' },
  { value: 'consultoria', label: 'Consultoria Técnica' },
  { value: 'outro', label: 'Outro Assunto' },
];

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" })
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: "O nome deve conter apenas letras" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "O e-mail é obrigatório" })
    .email({ message: "Digite um e-mail válido" })
    .max(255, { message: "O e-mail deve ter no máximo 255 caracteres" }),
  phone: z
    .string()
    .trim()
    .min(14, { message: "Digite um telefone completo" })
    .max(15, { message: "Telefone inválido" })
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, { message: "Digite um telefone válido" }),
  service: z
    .string()
    .min(1, { message: "Selecione um tipo de serviço" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" })
    .max(1000, { message: "A mensagem deve ter no máximo 1000 caracteres" })
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

// Rate limiting configuration
const RATE_LIMIT_MAX_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length <= 2) {
    return digits.length ? `(${digits}` : '';
  } else if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else if (digits.length <= 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

const Contact = () => {
  const { contact } = content;
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  
  // Security: Honeypot field (bots will fill this)
  const [honeypot, setHoneypot] = useState('');
  
  // Security: Rate limiting
  const submitAttemptsRef = useRef<number[]>([]);
  
  // Security: Debounce protection
  const lastSubmitTimeRef = useRef<number>(0);
  const DEBOUNCE_MS = 2000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Aplica máscara de telefone
    if (name === 'phone') {
      const maskedValue = formatPhone(value);
      setFormData(prev => ({ ...prev, [name]: maskedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Limpar erro do campo ao digitar
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof FormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = error.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  // Security: Check rate limit
  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    // Clean old attempts outside the window
    submitAttemptsRef.current = submitAttemptsRef.current.filter(
      time => now - time < RATE_LIMIT_WINDOW_MS
    );
    
    if (submitAttemptsRef.current.length >= RATE_LIMIT_MAX_ATTEMPTS) {
      return false;
    }
    
    submitAttemptsRef.current.push(now);
    return true;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security: Honeypot check - if filled, it's a bot
    if (honeypot) {
      // Silently reject bot submission
      toast({
        title: "Mensagem enviada!",
        description: "Em breve entraremos em contato.",
      });
      return;
    }
    
    // Security: Debounce check
    const now = Date.now();
    if (now - lastSubmitTimeRef.current < DEBOUNCE_MS) {
      toast({
        title: "Aguarde um momento",
        description: "Por favor, aguarde antes de enviar novamente.",
        variant: "destructive"
      });
      return;
    }
    lastSubmitTimeRef.current = now;
    
    // Security: Rate limit check
    if (!checkRateLimit()) {
      toast({
        title: "Muitas tentativas",
        description: "Você atingiu o limite de envios. Tente novamente em 1 minuto.",
        variant: "destructive"
      });
      return;
    }
    
    if (!validateForm()) {
      toast({
        title: "Formulário inválido",
        description: "Por favor, corrija os erros antes de enviar.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const subjectLabel = serviceOptions.find(s => s.value === formData.service)?.label || formData.service;
      const templateParams = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: subjectLabel,
        message: formData.message.trim(),
        time: new Date().toLocaleString('pt-BR'),
        company_name: content.site.name
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      toast({
        title: "Mensagem enviada!",
        description: "Em breve entraremos em contato.",
      });

      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setErrors({});
    } catch (error) {
      // Security: Don't expose error details in production
      if (import.meta.env.DEV) {
        console.error('EmailJS error:', error);
      }
      toast({
        title: "Erro ao enviar",
        description: "Por favor, tente novamente ou entre em contato via WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-24 bg-muted" aria-labelledby="contact-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            id="contact-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-montserrat text-primary mb-6"
          >
            Entre em Contato
          </motion.h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto font-roboto text-lg">
            Estamos prontos para atender você e transformar seus projetos em realidade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary text-white rounded-3xl p-10 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>

            <h3 className="text-2xl font-bold font-montserrat mb-8 relative z-10">
              Informações de Contato
            </h3>

            <div className="space-y-8 relative z-10">
              <a 
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start group"
              >
                <div className="bg-white/10 p-4 rounded-xl mr-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                  <Phone size={24} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-secondary mb-1">Telefone</h4>
                  <span className="text-gray-200 hover:text-white transition-colors text-lg">
                    {contact.phone}
                  </span>
                </div>
              </a>

              <a 
                href={`mailto:${contact.email}`}
                className="flex items-start group"
              >
                <div className="bg-white/10 p-4 rounded-xl mr-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                  <Mail size={24} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-secondary mb-1">E-mail</h4>
                  <span className="text-gray-200 hover:text-white transition-colors text-lg">
                    {contact.email}
                  </span>
                </div>
              </a>

              <div className="flex items-start group">
                <div className="bg-white/10 p-4 rounded-xl mr-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                  <MapPin size={24} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-secondary mb-1">Área de Atendimento</h4>
                  <p className="text-gray-200 text-lg">
                    {contact.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
              <h3 className="text-xl font-bold font-montserrat mb-4">
                Horário de Atendimento
              </h3>
              <p className="text-gray-300 font-roboto">
                {contact.hours.weekdays}<br />
                {contact.hours.saturday}
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-3xl p-10 shadow-xl border border-border"
          >
            <h3 className="text-2xl font-bold font-montserrat text-primary mb-8">
              Envie uma Mensagem
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Security: Honeypot field - hidden from users, bots will fill it */}
              <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-foreground font-medium mb-2 font-roboto">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={100}
                  className={`w-full px-4 py-3 bg-muted border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                    errors.name ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="Seu nome"
                  disabled={loading}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-destructive text-sm mt-1 font-roboto">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-foreground font-medium mb-2 font-roboto">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={255}
                    className={`w-full px-4 py-3 bg-muted border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.email ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Seu e-mail"
                    disabled={loading}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-destructive text-sm mt-1 font-roboto">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-foreground font-medium mb-2 font-roboto">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={20}
                    className={`w-full px-4 py-3 bg-muted border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.phone ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="(00) 00000-0000"
                    disabled={loading}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-destructive text-sm mt-1 font-roboto">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-foreground font-medium mb-2 font-roboto">
                  Tipo de Serviço
                </label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, service: value }));
                    if (errors.service) {
                      setErrors(prev => ({ ...prev, service: undefined }));
                    }
                  }}
                  disabled={loading}
                >
                  <SelectTrigger
                    id="service"
                    className={`w-full px-4 py-3 h-auto bg-muted border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.service ? 'border-destructive' : 'border-border'
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? 'service-error' : undefined}
                  >
                    <SelectValue placeholder="Selecione o tipo de serviço" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border rounded-xl shadow-lg">
                    {serviceOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="cursor-pointer hover:bg-muted focus:bg-muted rounded-lg"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p id="service-error" className="text-destructive text-sm mt-1 font-roboto">{errors.service}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-foreground font-medium mb-2 font-roboto">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={1000}
                  rows={5}
                  className={`w-full px-4 py-3 bg-muted border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none ${
                    errors.message ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="Descreva seu projeto ou dúvida..."
                  disabled={loading}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="text-destructive text-sm mt-1 font-roboto">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-xl font-montserrat flex items-center justify-center transition-all hover:shadow-lg hover:scale-[1.02] ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>Enviar Mensagem <Send className="ml-2" size={18} aria-hidden="true" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
