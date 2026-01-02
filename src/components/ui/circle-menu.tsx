'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const CONSTANTS = {
    itemSize: 48,
    containerSize: 150, // Reduced from 210 to bring closer
    openStagger: 0.02,
    closeStagger: 0.07
};

const STYLES: Record<string, Record<string, string>> = {
    trigger: {
        container:
            'rounded-full flex items-center justify-center cursor-pointer outline-none ring-0 transition-all duration-100 z-50 bg-accent/10 border border-white/10 backdrop-blur-lg hover:border-accent/50 text-white',
        active: 'bg-accent/20'
    },
    item: {
        container:
            'rounded-full flex items-center justify-center absolute bg-muted hover:bg-muted/50 cursor-pointer pointer-events-auto', // Added pointer-events-auto
        label: 'text-xs text-foreground absolute top-full left-1/2 -translate-x-1/2 mt-1'
    }
};

const pointOnCircle = (i: number, n: number, r: number, cx = 0, cy = 0) => {
    // Fan out from Left-Up to Bottom-Left
    // Reduced startAngle further to bring the top item down (away from status bar)
    const startAngle = Math.PI + 0.2;
    const endAngle = Math.PI * 0.6;

    const range = startAngle - endAngle;
    const step = n > 1 ? range / (n - 1) : 0;
    const theta = startAngle - (step * i);

    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    return { x, y };
};

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    index: number;
    totalItems: number;
    isOpen: boolean;
}

const MenuItem = ({ icon, label, href, index, totalItems, isOpen }: MenuItemProps) => {
    const { x, y } = pointOnCircle(index, totalItems, CONSTANTS.containerSize / 2);
    const [hovering, setHovering] = useState(false);

    return (
        <Link href={href} className={STYLES.item.container}>
            <motion.button
                animate={{
                    x: isOpen ? x : 0,
                    y: isOpen ? y : 0
                }}
                whileHover={{
                    scale: 1.1,
                    transition: {
                        duration: 0.1,
                        delay: 0
                    }
                }}
                transition={{
                    delay: isOpen ? index * CONSTANTS.openStagger : index * CONSTANTS.closeStagger,
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                }}
                style={{
                    height: CONSTANTS.itemSize - 2,
                    width: CONSTANTS.itemSize - 2
                }}
                className={STYLES.item.container}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                {icon}
                {hovering && <p className={STYLES.item.label}>{label}</p>}
            </motion.button>
        </Link>
    );
};

interface MenuTriggerProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    itemsLength: number;
    closeAnimationCallback: () => void;
    openIcon?: React.ReactNode;
    closeIcon?: React.ReactNode;
}

const MenuTrigger = ({
    setIsOpen,
    isOpen,
    itemsLength,
    closeAnimationCallback,
    openIcon,
    closeIcon
}: MenuTriggerProps) => {
    const animate = useAnimationControls();
    const shakeAnimation = useAnimationControls();

    const scaleTransition = Array.from({ length: itemsLength - 1 })
        .map((_, index) => index + 1)
        .reduce((acc, _, index) => {
            const increasedValue = index * 0.15;
            acc.push(1 + increasedValue);
            return acc;
        }, [] as number[]);

    const closeAnimation = async () => {
        shakeAnimation.start({
            translateX: [0, 2, -2, 0, 2, -2, 0],
            transition: {
                duration: CONSTANTS.closeStagger,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop'
            }
        });
        for (let i = 0; i < scaleTransition.length; i++) {
            await animate.start({
                height: Math.min(
                    CONSTANTS.itemSize * scaleTransition[i],
                    CONSTANTS.itemSize + CONSTANTS.itemSize / 2
                ),
                width: Math.min(
                    CONSTANTS.itemSize * scaleTransition[i],
                    CONSTANTS.itemSize + CONSTANTS.itemSize / 2
                ),
                // transparent ripple or subtle accent
                backgroundColor: `color-mix(in srgb, var(--accent) ${Math.max(
                    20 - i * 5,
                    0
                )}%, transparent)`,
                transition: {
                    duration: CONSTANTS.closeStagger / 2,
                    ease: 'linear'
                }
            });
            if (i !== scaleTransition.length - 1) {
                await new Promise((resolve) => setTimeout(resolve, CONSTANTS.closeStagger * 1000));
            }
        }

        shakeAnimation.stop();
        shakeAnimation.start({
            translateX: 0,
            transition: {
                duration: 0
            }
        });

        // Reset to original state (glassmorphism style handled by CSS class, so animate to transparent/null or just scale)
        animate.start({
            height: CONSTANTS.itemSize,
            width: CONSTANTS.itemSize,
            backgroundColor: 'transparent', // Ensure it doesn't stay solid
            transition: {
                duration: 0.1,
                ease: 'backInOut'
            }
        });
    };

    return (
        <motion.div animate={shakeAnimation} className="z-50">
            <motion.button
                animate={animate}
                style={{
                    height: CONSTANTS.itemSize,
                    width: CONSTANTS.itemSize
                }}
                className={cn(STYLES.trigger.container, isOpen && STYLES.trigger.active)}
                onClick={() => {
                    if (isOpen) {
                        setIsOpen(false);
                        closeAnimationCallback();
                        closeAnimation();
                    } else {
                        setIsOpen(true);
                    }
                }}
            >
                <AnimatePresence mode="popLayout">
                    {isOpen ? (
                        <motion.span
                            key="menu-close"
                            initial={{
                                opacity: 0,
                                filter: 'blur(10px)'
                            }}
                            animate={{
                                opacity: 1,
                                filter: 'blur(0px)'
                            }}
                            exit={{
                                opacity: 0,
                                filter: 'blur(10px)'
                            }}
                            transition={{
                                duration: 0.2
                            }}
                        >
                            {closeIcon}
                        </motion.span>
                    ) : (
                        <motion.span
                            key="menu-open"
                            initial={{
                                opacity: 0,
                                filter: 'blur(10px)'
                            }}
                            animate={{
                                opacity: 1,
                                filter: 'blur(0px)'
                            }}
                            exit={{
                                opacity: 0,
                                filter: 'blur(10px)'
                            }}
                            transition={{
                                duration: 0.2
                            }}
                        >
                            {openIcon}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
};

const CircleMenu = ({
    items,
    openIcon = <Menu size={20} className="text-white" />,
    closeIcon = <X size={20} className="text-white" />
}: {
    items: Array<{ label: string; icon: React.ReactNode; href: string }>;
    openIcon?: React.ReactNode;
    closeIcon?: React.ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const animate = useAnimationControls();

    const closeAnimationCallback = async () => {
        await animate.start({
            rotate: -360,
            filter: 'blur(1px)',
            transition: {
                duration: CONSTANTS.closeStagger * (items.length + 2),
                ease: 'linear'
            }
        });
        await animate.start({
            rotate: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0
            }
        });
    };

    return (
        <div
            className="relative flex items-center justify-center p-2"
        >
            <MenuTrigger
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                itemsLength={items.length}
                closeAnimationCallback={closeAnimationCallback}
                openIcon={openIcon}
                closeIcon={closeIcon}
            />
            <motion.div
                animate={animate}
                className={cn('absolute inset-0 z-0 flex items-center justify-center pointer-events-none')}
            >
                {items.map((item, index) => {
                    return (
                        <MenuItem
                            key={`menu-item-${index}`}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            index={index}
                            totalItems={items.length}
                            isOpen={isOpen}
                        />
                    );
                })}
            </motion.div>
        </div>
    );
};

export { CircleMenu };
