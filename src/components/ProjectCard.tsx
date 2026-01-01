
'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/data/projects';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden glass hover:border-accent/50 transition-colors"
        >
            <div className="aspect-video relative bg-gray-900 overflow-hidden">
                {project.imageUrl ? (
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                        <span className="text-gray-600 font-mono text-xl group-hover:text-accent transition-colors">
                            {project.title.substring(0, 2).toUpperCase()}
                        </span>
                    </div>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-white/10 hover:bg-accent text-white transition-all transform hover:scale-110"
                            title="Ver Código"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-white/10 hover:bg-accent text-white transition-all transform hover:scale-110"
                            title="Ver Demo"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/5 text-gray-300"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.stack.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/5 text-gray-300">
                            +{project.stack.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
