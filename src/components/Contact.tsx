'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
    return (
        <section id="contact" className="py-20 relative overflow-hidden bg-transparent">
            {/* Background Blurs */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
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
                                    { icon: Mail, text: "sousawesley415@gmail.com", label: "Email" },
                                    { icon: Phone, text: "(91) 99155-0538", label: "WhatsApp" },
                                    { icon: MapPin, text: "Capitão Poço, Pará, Brasil", label: "Localização" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-4 -mx-4 rounded-xl transition-colors">
                                        <div className="p-3 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
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
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="aspect-square flex items-center justify-center p-8 relative"
                    >
                        {/* Animated Abstract Tech Shape (Atom-like) */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Core */}
                            <motion.div
                                className="absolute w-16 h-16 bg-accent rounded-full blur-md"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div className="absolute w-12 h-12 bg-white rounded-full z-10 shadow-[0_0_30px_rgba(30,77,255,0.8)]" />

                            {/* Orbit 1 */}
                            <motion.div
                                className="absolute w-full h-16 border-2 border-accent/60 rounded-[100%] shadow-[0_0_15px_rgba(30,77,255,0.3)]"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Orbit 2 */}
                            <motion.div
                                className="absolute w-full h-16 border-2 border-purple-500/60 rounded-[100%] shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                style={{ rotate: 60 }}
                                animate={{ rotate: 420 }} // 60 + 360
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Orbit 3 */}
                            <motion.div
                                className="absolute w-full h-16 border-2 border-cyan-400/60 rounded-[100%] shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                style={{ rotate: -60 }}
                                animate={{ rotate: 300 }} // -60 + 360
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Floating Particles */}
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-white rounded-full"
                                    initial={{ x: 0, y: 0, opacity: 0 }}
                                    animate={{
                                        x: (Math.random() - 0.5) * 200,
                                        y: (Math.random() - 0.5) * 200,
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        repeat: Infinity,
                                        repeatDelay: Math.random()
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
