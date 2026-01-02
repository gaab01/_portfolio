
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
        title: 'ChatCendap - Chatbot Saúde',
        description: 'App de chat online para clínica de saúde com atendente de IA. Realiza pré-agendamentos, tira dúvidas sobre procedimentos e fornece informações institucionais de forma automatizada.',
        tags: ['Chatbot', 'Saúde', 'IA', 'Web'],
        stack: ['Node.js', 'React', 'OpenAI API', 'PostgreSQL'],
        githubUrl: 'https://github.com/usuario/whatsapp-bot',
        featured: true,
        imageUrl: '/images/projects/chat-cendap.png',
    },
    {
        id: '2',
        title: 'Agente de IA Contínuo - N8N',
        description: 'Fluxo de automação avançado no N8N com agente de IA operando 24/7. Integra WhatsApp e CRM para qualificação de leads e atendimento ininterrupto.',
        tags: ['Automação', 'IA', 'N8N', 'WhatsApp'],
        stack: ['n8n', 'Webhook', 'OpenAI', 'PostgreSQL'],
        imageUrl: '/images/projects/n8n-automation.jpg',
        featured: true,
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
    {
        id: '7',
        title: 'Workflow Técnico N8N',
        description: 'Visão detalhada do back-end do agente de IA no N8N. Demonstra a orquestração complexa de nós, gerenciamento de memória e lógica de decisão autônoma.',
        tags: ['N8N', 'Back-end', 'Workflow', 'Arquitetura'],
        stack: ['N8N', 'JavaScript', 'JSON', 'Webhooks'],
        imageUrl: '/images/projects/n8n-workflow.png',
        featured: true,
    },
];
