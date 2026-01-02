'use client';

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
}

// Define the type for a single gallery item
export interface GalleryItem {
    common: string;
    binomial: string;
    videoUrl?: string;
    photo: {
        url: string;
        text: string;
        pos?: string;
        by: string;
    };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[];
    /** Controls how far the items are from the center. */
    radius?: number;
    /** Controls the speed of auto-rotation when not scrolling. */
    autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
    ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
        const [rotation, setRotation] = useState(0);
        const [isScrolling, setIsScrolling] = useState(false);
        const [isDragging, setIsDragging] = useState(false);
        const [isMobile, setIsMobile] = useState(false);
        const lastMouseX = useRef(0);
        const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
        const animationFrameRef = useRef<number | null>(null);

        // Responsive check
        useEffect(() => {
            const checkMobile = () => setIsMobile(window.innerWidth < 768);
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return () => window.removeEventListener('resize', checkMobile);
        }, []);

        // Effect to handle scroll-based rotation
        useEffect(() => {
            const handleScroll = () => {
                if (isDragging) return; // Don't update from scroll if dragging
                setIsScrolling(true);
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }

                const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
                const scrollRotation = scrollProgress * 360;
                setRotation(scrollRotation);

                scrollTimeoutRef.current = setTimeout(() => {
                    setIsScrolling(false);
                }, 150);
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => {
                window.removeEventListener('scroll', handleScroll);
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }
            };
        }, [isDragging]);

        // Effect for auto-rotation when not scrolling
        useEffect(() => {
            const autoRotate = () => {
                if (!isScrolling && !isDragging) {
                    setRotation(prev => prev + autoRotateSpeed);
                }
                animationFrameRef.current = requestAnimationFrame(autoRotate);
            };

            animationFrameRef.current = requestAnimationFrame(autoRotate);

            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }, [isScrolling, isDragging, autoRotateSpeed]);

        const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
            setIsDragging(true);
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            lastMouseX.current = clientX;
        };

        const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
            if (!isDragging) return;
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const delta = clientX - lastMouseX.current;
            lastMouseX.current = clientX;
            setRotation(prev => prev + delta * 0.5); // Adjust sensitivity here
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const anglePerItem = 360 / items.length;

        return (
            <div
                ref={ref}
                role="region"
                aria-label="Circular 3D Gallery"
                className={cn("relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing", className)}
                style={{ perspective: '2000px' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
                {...props}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        transform: `rotateY(${rotation}deg)`,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {items.map((item, i) => {
                        const itemAngle = i * anglePerItem;
                        const totalRotation = rotation % 360;
                        const relativeAngle = (itemAngle + totalRotation + 360) % 360;
                        const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
                        const opacity = Math.max(0.15, 1 - (normalizedAngle / 100)); // Sharper falloff

                        return (
                            <div
                                key={item.photo.url}
                                role="group"
                                aria-label={item.common}
                                className="absolute w-[240px] h-[320px] md:w-[300px] md:h-[400px] select-none pointer-events-none sm:pointer-events-auto"
                                style={{
                                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: isMobile ? '-120px' : '-150px',
                                    marginTop: isMobile ? '-160px' : '-200px',
                                    opacity: opacity,
                                    transition: isDragging ? 'none' : 'opacity 0.3s linear'
                                }}
                            >
                                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-white/10 bg-black/70 backdrop-blur-lg">
                                    {item.videoUrl ? (
                                        <video
                                            src={item.videoUrl}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={item.photo.url}
                                            alt={item.photo.text}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            style={{ objectPosition: item.photo.pos || 'center' }}
                                            draggable={false}
                                        />
                                    )}
                                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                        <h2 className="text-xl font-bold">{item.common}</h2>
                                        <em className="text-sm italic opacity-80">{item.binomial}</em>
                                        <p className="text-xs mt-2 opacity-70">Photo by: {item.photo.by}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
