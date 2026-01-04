'use client';

import dynamic from 'next/dynamic';

const Particles = dynamic(() => import('./Particles'), { ssr: false });

export default function ParticlesBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Particles
                className="absolute inset-0"
                particleCount={300}
                particleSpread={10}
                speed={0.1}
                particleColors={["#ffffff", "#1E4DFF"]}
                moveParticlesOnHover={false}
                particleHoverFactor={1}
                alphaParticles={true}
                particleBaseSize={100}
                sizeRandomness={1}
                cameraDistance={20}
                disableRotation={false}
            />
        </div>
    );
}
