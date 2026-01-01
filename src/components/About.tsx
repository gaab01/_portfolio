'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { CircularTestimonials } from './ui/CircularTestimonials';

// Dados pessoais no formato de slides
const aboutSlides = [
    {
        quote: 'Desenvolvimento web e automações, com foco em n8n, integração de APIs e bancos de dados. Atuação full stack com TypeScript, React, Next.js, Node.js e Python.',
        name: 'Wesley Gabriel',
        designation: 'Full Stack Developer',
        src: '/wesley-profile.jpg',
    },
    {
        quote: 'Desenvolvimento de sistemas web com JavaScript, TypeScript, React, Python e Java, integração de APIs, bancos de dados, Docker e cloud AWS.',
        name: 'Tech Stack',
        designation: 'Tecnologias & Habilidades',
        src: '/tech-stack.jpg',
    },
    {
        quote: 'Automação de processos com n8n, integração de APIs, desenvolvimento de sistemas web completos e chatbots inteligentes, transformando tarefas manuais em fluxos automatizados e eficientes.',
        name: 'Serviços',
        designation: 'O que eu faço',
        src: '/n8n-logo.png',
    },
];

// Floating particles background
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent/30 rounded-full"
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: '100%',
                        opacity: 0,
                    }}
                    animate={{
                        y: '-10%',
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
}

export function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden min-h-screen">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
            <FloatingParticles />

            {/* Animated gradient orb */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Animated Title */}
                <motion.div
                    className="flex items-center justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        <Sparkles className="w-8 h-8 text-accent" />
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Sobre{' '}
                        <span className="relative">
                            <span className="relative z-10 bg-gradient-to-r from-accent via-blue-400 to-accent bg-clip-text text-transparent bg-[length:200%] animate-gradient">
                                Mim
                            </span>
                            <motion.span
                                className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent to-blue-400 rounded-full"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                viewport={{ once: true }}
                            />
                        </span>
                    </h2>
                </motion.div>

                {/* Circular Testimonials with personal info */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <CircularTestimonials
                        testimonials={aboutSlides}
                        autoplay={true}
                        colors={{
                            name: '#ffffff',
                            designation: '#1E4DFF',
                            testimony: '#d1d5db',
                            arrowBackground: '#1E4DFF',
                            arrowForeground: '#ffffff',
                            arrowHoverBackground: '#3b66ff',
                        }}
                        fontSizes={{
                            name: '2rem',
                            designation: '1rem',
                            quote: '1.25rem',
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
