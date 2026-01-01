'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import TextType from '@/components/ui/text-type';

export function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* Fade current section into the next */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B0F14] z-0 pointer-events-none" />

            <div className="container px-6 relative z-10 text-center">


                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
                >
                    <span className="block text-white mb-2">Portfólio</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent animate-gradient bg-300%">
                        <TextType
                            text="wesley.dev"
                            typingSpeed={150}
                            deletingSpeed={100}
                            loop={true}
                            pauseDuration={3000}
                            showCursor={true}
                            cursorClassName="text-white"
                        />
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                >
                    Desenvolvimento web, sistemas e automação focados em soluções práticas.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="#projects"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent text-white font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(30,77,255,0.5)] hover:scale-105 active:scale-95"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Ver Projetos
                    </Link>
                    <Link
                        href="#contact"
                        className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white font-medium text-lg transition-all hover:bg-white/10 hover:border-white/20"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Fale Comigo
                    </Link>
                </motion.div>



                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-12 flex justify-center gap-4"
                >
                    <a
                        href="https://github.com/gaab01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(30,77,255,0.3)]"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/wesley-gabriel-sousa-126329280"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(30,77,255,0.3)]"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>


        </section >
    );
}
