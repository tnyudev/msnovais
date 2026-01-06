import { Home, Paintbrush, Wrench, FileText, Users, Clock, Award, LucideIcon } from 'lucide-react';

// Image imports - using placeholders that will be replaced with actual images
import casaModerna from '@/assets/images/casa-moderna.jpg';
import fachadaModerna from '@/assets/images/fachada-moderna.jpg';
import casaLuxo from '@/assets/images/casa-luxo.jpg';
import banheiroModerno from '@/assets/images/banheiro-moderno.jpg';
import cozinhaModerna from '@/assets/images/cozinha-moderna.jpg';
import equipeObra from '@/assets/images/equipe-obra.jpg';

export interface NavigationItem {
  name: string;
  href: string;
}

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
}

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PortfolioItem {
  image: string;
  title: string;
  category: 'Construção' | 'Reforma' | 'Projeto';
}

export interface TestimonialItem {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

export const content = {
  site: {
    name: "Novais Construtora",
    title: "Novais Construtora - Construções e Reformas em Geral",
    description: "Realizamos seus projetos com qualidade e compromisso, da fundação à entrega. Construções e reformas em Lins/SP e região.",
    copyright: `© ${new Date().getFullYear()} Novais Construtora. Todos os direitos reservados.`,
    cnpj: "56.165.936/0001-27"
  },
  contact: {
    phone: "(14) 99650-0927",
    whatsapp: "5514996500927",
    email: "contato@novaisconstrutora.com.br",
    address: "Lins/SP e cidades próximas (Promissão, Guaiçara e região)",
    hours: {
      weekdays: "Segunda a Sexta: 8h às 18h",
      saturday: "Sábado: 8h às 12h"
    },
    social: {
      facebook: "https://www.facebook.com/profile.php?id=100085650246005",
      instagram: "https://www.instagram.com/msnovais.construcao/"
    }
  },
  navigation: [
    { name: "Início", href: "#home" },
    { name: "Sobre Nós", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Contato", href: "#contato" }
  ] as NavigationItem[],
  hero: {
    slides: [
      {
        image: casaModerna,
        title: "Novais Construtora",
        subtitle: "Construções e Reformas em Geral",
        description: "Realizamos seus projetos com qualidade e compromisso, da fundação à entrega."
      },
      {
        image: fachadaModerna,
        title: "Qualidade e Excelência",
        subtitle: "Acabamento de Alto Padrão",
        description: "Construções e reformas para residências e comércios com o melhor acabamento."
      },
      {
        image: casaLuxo,
        title: "Seu Sonho, Nossa Missão",
        subtitle: "Profissionalismo e Dedicação",
        description: "Transformamos ideias em realidade com profissionalismo e dedicação."
      }
    ] as HeroSlide[],
    cta: {
      text: "Fale Conosco",
      link: "#contato"
    }
  },
  about: {
    title: "Sobre Nós",
    image: equipeObra,
    badge: "Compromisso com a qualidade",
    headline: "A Novais Construtora é uma empresa dedicada a construções e reformas em geral",
    description: [
      "Focamos em transformar seus sonhos em realidade. Atuamos em projetos de todos os tamanhos, desde a fundação até os acabamentos, com compromisso com a qualidade e a satisfação do cliente.",
      "Nossa equipe possui ampla experiência local e oferece atendimento personalizado para cada cliente, garantindo que cada projeto seja único e atenda perfeitamente às necessidades e expectativas."
    ],
    features: [
      { icon: Users, title: "Equipe Qualificada" },
      { icon: Clock, title: "Pontualidade" },
      { icon: Award, title: "Qualidade" }
    ] as Feature[]
  },
  stats: [
    { value: "10", label: "Anos de Experiência", suffix: "+" },
    { value: "200", label: "Projetos Entregues", suffix: "+" },
    { value: "100", label: "Clientes Satisfeitos", suffix: "%" },
    { value: "50", label: "Cidades Atendidas", suffix: "+" }
  ] as StatItem[],
  services: {
    title: "Nossos Serviços",
    subtitle: "Oferecemos uma ampla gama de serviços para atender todas as suas necessidades de construção e reforma.",
    items: [
      {
        icon: Home,
        title: "Construção de casas e comércios",
        description: "Realizamos construções completas, desde a fundação até os acabamentos finais, com qualidade e atenção aos detalhes."
      },
      {
        icon: Paintbrush,
        title: "Reformas residenciais e comerciais",
        description: "Transformamos e renovamos ambientes com soluções personalizadas para cada cliente e necessidade."
      },
      {
        icon: Wrench,
        title: "Serviços de alvenaria, pintura, elétrica e hidráulica",
        description: "Oferecemos serviços especializados em diversas áreas da construção civil, garantindo qualidade em cada etapa."
      },
      {
        icon: FileText,
        title: "Projetos sob medida",
        description: "Desenvolvemos projetos personalizados que atendem às suas necessidades específicas, da fundação à entrega."
      }
    ] as ServiceItem[],
    cta: {
      text: "Solicite um orçamento",
      link: "#contato"
    }
  },
  portfolio: {
    title: "Nosso Portfólio",
    subtitle: "Conheça alguns dos nossos projetos e trabalhos realizados.",
    items: [
      {
        image: casaModerna,
        title: "Construção de Casa Moderna",
        category: "Construção"
      },
      {
        image: banheiroModerno,
        title: "Reforma de Banheiro",
        category: "Reforma"
      },
      {
        image: fachadaModerna,
        title: "Projeto de Fachada",
        category: "Projeto"
      },
      {
        image: cozinhaModerna,
        title: "Reforma de Cozinha",
        category: "Reforma"
      },
      {
        image: casaLuxo,
        title: "Casa de Alto Padrão",
        category: "Construção"
      },
      {
        image: equipeObra,
        title: "Obra Comercial",
        category: "Construção"
      }
    ] as PortfolioItem[]
  },
  testimonials: {
    title: "Depoimentos",
    subtitle: "Veja o que nossos clientes dizem sobre nossos serviços.",
    items: [
      {
        id: 1,
        author: "João Silva",
        rating: 5,
        text: "Excelente trabalho! A reforma da minha cozinha ficou perfeita, dentro do prazo e com acabamento impecável.",
        date: "2023-10-15"
      },
      {
        id: 2,
        author: "Maria Oliveira",
        rating: 5,
        text: "Contratei a Novais Construtora para construir minha casa e fiquei muito satisfeita com o resultado. Profissionais competentes e atenciosos.",
        date: "2023-09-22"
      },
      {
        id: 3,
        author: "Pedro Santos",
        rating: 4,
        text: "Bom atendimento e serviço de qualidade. Recomendo para quem busca uma empresa séria para reformas.",
        date: "2023-08-05"
      }
    ] as TestimonialItem[]
  },
  faq: {
    title: "Perguntas Frequentes",
    subtitle: "Tire suas dúvidas sobre nossos serviços",
    items: [
      {
        question: "Qual é a área de atendimento da Novais Construtora?",
        answer: "Atendemos Lins/SP e cidades próximas, incluindo Promissão, Guaiçara e toda a região. Para projetos maiores, podemos avaliar atendimento em outras localidades."
      },
      {
        question: "Como solicitar um orçamento?",
        answer: "Você pode solicitar um orçamento pelo nosso WhatsApp, formulário de contato ou e-mail. Nossa equipe entrará em contato para agendar uma visita técnica gratuita."
      },
      {
        question: "Qual o prazo médio para uma reforma?",
        answer: "O prazo varia de acordo com o tamanho e complexidade do projeto. Após a visita técnica, fornecemos um cronograma detalhado com prazos realistas."
      },
      {
        question: "Vocês oferecem garantia nos serviços?",
        answer: "Sim! Oferecemos garantia em todos os nossos serviços. O período de garantia varia conforme o tipo de serviço executado."
      },
      {
        question: "Quais formas de pagamento são aceitas?",
        answer: "Aceitamos diversas formas de pagamento, incluindo transferência bancária, PIX e parcelamento. As condições são negociadas de acordo com cada projeto."
      },
      {
        question: "Vocês fornecem o material ou só a mão de obra?",
        answer: "Trabalhamos das duas formas! Podemos fornecer todo o material com nossa rede de fornecedores parceiros, ou apenas a mão de obra qualificada."
      }
    ] as FAQItem[]
  },
  footer: {
    about: "Realizamos seus projetos com qualidade e compromisso, da fundação à entrega. Construções e reformas para residências e comércios.",
    servicesTitle: "Serviços",
    contactTitle: "Contato",
    servicesList: [
      "Construção de casas e comércios",
      "Reformas residenciais e comerciais",
      "Serviços de alvenaria e pintura",
      "Serviços elétricos e hidráulicos",
      "Projetos sob medida"
    ]
  }
};
