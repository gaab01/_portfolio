
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Contact() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Since we don't have a backend, we'll simulate a submission and use mailto for fallback
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setSubmitted(true);

        // Fallback to mailto
        window.location.href = `mailto:contato@seudominio.com?subject=Contato de ${data.name}&body=${data.message}`;
    };

    return (
        <section id="contact" className="py-20 relative overflow-hidden bg-background">
            {/* Background Blurs - tornado mais sutil */}
            <div className="absolute top-1/2 right-0 w-1/4 h-1/2 bg-accent/3 blur-[150px] -z-10 rounded-full" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Vamos <span className="text-accent">Conversar?</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Tem um projeto em mente? Entre em contato e vamos transformar sua ideia em realidade.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="md:pr-12">
                            <h3 className="text-2xl font-bold mb-6 text-white">Informações de Contato</h3>
                            <p className="text-gray-400 mb-8">
                                Estou disponível para freelance e novas oportunidades. Sinta-se à vontade para me contatar por e-mail ou redes sociais.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: Mail, text: "contato@devfolio.com", label: "Email" },
                                    { icon: Phone, text: "+55 (11) 99999-9999", label: "WhatsApp" },
                                    { icon: MapPin, text: "São Paulo, Brasil", label: "Localização" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="p-3 rounded-full bg-accent/10 text-accent">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{item.label}</p>
                                            <p className="text-lg font-medium text-white">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="glass p-8 rounded-3xl"
                    >
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Mensagem Confirmada!</h3>
                                <p className="text-gray-400">Seu cliente de e-mail deve abrir em breve.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-accent hover:underline"
                                >
                                    Enviar outra mensagem
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                                        placeholder="seu@box.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Mensagem</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                                        placeholder="Como posso te ajudar?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-accent text-white font-bold text-lg transition-all hover:shadow-[0_0_20px_rgba(30,77,255,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Enviar Mensagem
                                            <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
