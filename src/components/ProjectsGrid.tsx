'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { CircularGallery, GalleryItem } from './ui/CircularGallery';
import { cn } from '@/lib/utils';

// Convert projects to gallery items format
const projectsToGalleryItems = (projectsList: typeof projects): GalleryItem[] => {
    return projectsList.map((project) => ({
        common: project.title,
        binomial: project.stack.slice(0, 3).join(' • '),
        videoUrl: project.imageUrl?.endsWith('.mp4') || project.imageUrl?.endsWith('.webm') ? project.imageUrl : undefined,
        photo: {
            url: project.imageUrl || `https://picsum.photos/seed/${project.id}/600/800`,
            text: project.description,
            pos: 'center',
            by: project.tags[0] || 'Projeto',
        },
    }));
};

export function ProjectsGrid() {
    const galleryItems = useMemo(
        () => projectsToGalleryItems(projects),
        []
    );

    const [radius, setRadius] = useState(450);

    // Responsive radius
    useEffect(() => {
        const handleResize = () => {
            setRadius(window.innerWidth < 768 ? 215 : 330);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    Projetos
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Explore alguns dos meus trabalhos recentes, desde automações complexas até interfaces imersivas.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[500px] w-full"
            >
                <CircularGallery
                    items={galleryItems}
                    radius={radius}
                    autoRotateSpeed={0.015}
                />
            </motion.div>
        </section>
    );
}
