
export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    stack: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    imageUrl?: string;
}

export const projects: Project[] = [
    {
        id: '1',
        title: 'Chatbot WhatsApp Saúde',
        description: 'Assistente virtual para clínicas médicas capaz de agendar consultas, tirar dúvidas frequentes e enviar lembretes automáticos. Integrado à API oficial do WhatsApp Business.',
        tags: ['Chatbot', 'Saúde', 'Automação', 'WhatsApp'],
        stack: ['Node.js', 'Twilio API', 'PostgreSQL', 'OpenAI API'],
        githubUrl: 'https://github.com/usuario/whatsapp-bot',
        featured: true,
    },
    {
        id: '2',
        title: 'Automação Comercial N8N',
        description: 'Workflow complexo de automação que sincroniza leads do Facebook Ads com CRM (Pipedrive) e dispara sequências de e-mail marketing personalizadas.',
        tags: ['Automação', 'No-code', 'CRM', 'Marketing'],
        stack: ['n8n', 'Webhook', 'Pipedrive API', 'SendGrid'],
        featured: true,
    },
    {
        id: '3',
        title: 'SaaS Starter Kit',
        description: 'Boilerplate completo para SaaS com autenticação, pagamentos via Stripe, dashboard administrativo e gestão de assinaturas.',
        tags: ['SaaS', 'Fullstack', 'Pagamentos'],
        stack: ['Next.js', 'Stripe', 'Supabase', 'Tailwind CSS'],
        githubUrl: 'https://github.com/usuario/saas-starter',
        liveUrl: 'https://demo-saas.com',
        featured: true,
    },
    {
        id: '4',
        title: 'Gestão Inteligente de Estoque',
        description: 'Sistema de controle de estoque com previsão de demanda baseada em IA, alertando sobre baixas e sugerindo compras automáticas.',
        tags: ['Sistemas', 'IA', 'Gestão', 'Dashboard'],
        stack: ['React', 'Python', 'FastAPI', 'Scikit-learn'],
        githubUrl: 'https://github.com/usuario/estoque-ia',
        featured: false,
    },
    {
        id: '5',
        title: 'App Low-code de Vistoria',
        description: 'Aplicativo móvel para vistorias imobiliárias com upload de fotos offline e geração automática de laudos em PDF.',
        tags: ['Low-code', 'Mobile', 'Imobiliária'],
        stack: ['FlutterFlow', 'Firebase', 'Google Cloud Functions'],
        liveUrl: 'https://app-vistoria.com',
        featured: false,
    },
    {
        id: '6',
        title: 'Integração LLM Jurídica',
        description: 'Ferramenta para advogados que analisa contratos PDF e resume cláusulas de risco usando GPT-4, com interface de chat para perguntas.',
        tags: ['APIs', 'OpenAI', 'Jurídico', 'LLM'],
        stack: ['LangChain', 'Pinecone', 'Next.js', 'Python'],
        githubUrl: 'https://github.com/usuario/legal-ai',
        featured: true,
    },
];
