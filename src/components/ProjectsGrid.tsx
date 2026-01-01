'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { CircularGallery, GalleryItem } from './ui/CircularGallery';
import { cn } from '@/lib/utils';

// Convert projects to gallery items format
const projectsToGalleryItems = (projectsList: typeof projects): GalleryItem[] => {
    return projectsList.map((project) => ({
        common: project.title,
        binomial: project.stack.slice(0, 3).join(' • '),
        photo: {
            url: project.imageUrl || `https://picsum.photos/seed/${project.id}/600/800`,
            text: project.description,
            pos: 'center',
            by: project.tags[0] || 'Projeto',
        },
    }));
};

export function ProjectsGrid() {
    const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'gallery' | 'grid'>('gallery');

    const filteredProjects = activeTag
        ? projects.filter((p) => p.tags.includes(activeTag))
        : projects;

    const galleryItems = useMemo(
        () => projectsToGalleryItems(filteredProjects),
        [filteredProjects]
    );

    return (
        <section id="projects" className="py-20 container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Projetos <span className="text-accent">Selecionados</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Explore alguns dos meus trabalhos recentes, desde automações complexas até interfaces imersivas.
                </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
                <button
                    onClick={() => setActiveTag(null)}
                    className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                        activeTag === null
                            ? "bg-accent border-accent text-white shadow-[0_0_15px_rgba(30,77,255,0.4)]"
                            : "bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                    )}
                >
                    Todos
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                            activeTag === tag
                                ? "bg-accent border-accent text-white shadow-[0_0_15px_rgba(30,77,255,0.4)]"
                                : "bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                        )}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* View mode toggle */}
            <div className="flex justify-center gap-2 mb-10">
                <button
                    onClick={() => setViewMode('gallery')}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        viewMode === 'gallery'
                            ? "bg-accent/20 text-accent border border-accent/50"
                            : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
                    )}
                >
                    🎡 Galeria 3D
                </button>
                <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        viewMode === 'grid'
                            ? "bg-accent/20 text-accent border border-accent/50"
                            : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
                    )}
                >
                    📱 Grade
                </button>
            </div>

            {viewMode === 'gallery' ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[500px] w-full"
                >
                    <CircularGallery
                        items={galleryItems}
                        radius={450}
                        autoRotateSpeed={0.015}
                    />
                </motion.div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} index={Number(project.id)} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </section>
    );
}
