'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Particle configuration - adapted for About section
const PARTICLE_COUNT = 800;
const PARTICLE_SIZE_MIN = 0.008;
const PARTICLE_SIZE_MAX = 0.02;
const SPHERE_RADIUS = 4;
const POSITION_RANDOMNESS = 2;
const ROTATION_SPEED_Y = 0.001;
const PARTICLE_OPACITY = 0.8;

// Skill icons configuration
const SKILL_COUNT = 6;
const ICON_SIZE = 0.8;

interface ParticleData {
    position: [number, number, number];
    scale: number;
    color: THREE.Color;
}

interface SkillOrbitData {
    position: [number, number, number];
    rotation: [number, number, number];
    label: string;
    color: string;
}

function ParticleField() {
    const groupRef = useRef<THREE.Group>(null);

    const particles = useMemo<ParticleData[]>(() => {
        const result: ParticleData[] = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
            const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
            const radiusVariation = SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS;

            const x = radiusVariation * Math.cos(theta) * Math.sin(phi);
            const y = radiusVariation * Math.cos(phi);
            const z = radiusVariation * Math.sin(theta) * Math.sin(phi);

            result.push({
                position: [x, y, z],
                scale: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
                color: new THREE.Color().setHSL(
                    0.6 + Math.random() * 0.1, // Blue hue range
                    0.8,
                    0.5 + Math.random() * 0.4
                ),
            });
        }

        return result;
    }, []);

    // Skill labels orbiting the sphere
    const skills = useMemo<SkillOrbitData[]>(() => {
        const skillData = [
            { label: 'React', color: '#61dafb' },
            { label: 'TypeScript', color: '#3178c6' },
            { label: 'Node.js', color: '#339933' },
            { label: 'Python', color: '#3776ab' },
            { label: 'AWS', color: '#ff9900' },
            { label: 'Docker', color: '#2496ed' },
        ];

        return skillData.map((skill, i) => {
            const angle = (i / SKILL_COUNT) * Math.PI * 2;
            const orbitRadius = SPHERE_RADIUS + 1;
            const x = orbitRadius * Math.cos(angle);
            const y = (Math.random() - 0.5) * 2;
            const z = orbitRadius * Math.sin(angle);

            return {
                position: [x, y, z] as [number, number, number],
                rotation: [0, -angle + Math.PI / 2, 0] as [number, number, number],
                label: skill.label,
                color: skill.color,
            };
        });
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += ROTATION_SPEED_Y;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Particles */}
            {particles.map((particle, index) => (
                <mesh key={index} position={particle.position} scale={particle.scale}>
                    <sphereGeometry args={[1, 6, 4]} />
                    <meshBasicMaterial
                        color={particle.color}
                        transparent
                        opacity={PARTICLE_OPACITY}
                    />
                </mesh>
            ))}

            {/* Glowing core */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshBasicMaterial
                    color={new THREE.Color('#1E4DFF')}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Orbiting skill indicators */}
            {skills.map((skill, index) => (
                <mesh key={`skill-${index}`} position={skill.position}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshBasicMaterial
                        color={new THREE.Color(skill.color)}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            ))}

            {/* Connection lines (wireframe effect) */}
            <lineSegments>
                <edgesGeometry args={[new THREE.IcosahedronGeometry(SPHERE_RADIUS * 0.8, 1)]} />
                <lineBasicMaterial color="#1E4DFF" transparent opacity={0.1} />
            </lineSegments>
        </group>
    );
}

// Loading fallback
function LoadingFallback() {
    return (
        <mesh>
            <sphereGeometry args={[2, 16, 16]} />
            <meshBasicMaterial color="#1E4DFF" wireframe transparent opacity={0.3} />
        </mesh>
    );
}

export function AboutParticleSphere() {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                style={{ background: 'transparent' }}
                gl={{ alpha: true, antialias: true }}
            >
                <Suspense fallback={<LoadingFallback />}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <ParticleField />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default AboutParticleSphere;
