import { motion } from 'motion/react';

interface FloatingParticlesProps {
  theme: 'light' | 'dark';
}

export default function FloatingParticles({ theme }: FloatingParticlesProps) {
  const particles = [
    { size: 40, x: '15%', delay: 0, duration: 20 },
    { size: 60, x: '75%', delay: 2, duration: 25 },
    { size: 30, x: '50%', delay: 4, duration: 22 },
    { size: 50, x: '85%', delay: 1, duration: 28 },
    { size: 25, x: '30%', delay: 3, duration: 24 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(255, 193, 7, 0.05) 0%, rgba(255, 235, 59, 0.02) 100%)'
              : 'radial-gradient(circle, rgba(255, 193, 7, 0.08) 0%, rgba(255, 235, 59, 0.03) 100%)',
            filter: 'blur(20px)',
          }}
          animate={{
            y: ['100vh', '-100px'],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 0.4, 0.8, 0.4, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}
