import { motion } from 'motion/react';
import { TrendingUp, Sparkles } from 'lucide-react';

interface WelcomeOverlayProps {
  theme: 'light' | 'dark';
}

export default function WelcomeOverlay({ theme }: WelcomeOverlayProps) {
  const colors = theme === 'dark' ? {
    background: '#0A0A0B',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
  } : {
    background: '#FFFEF7',
    textPrimary: '#1A1A1D',
    textSecondary: 'rgba(26, 26, 29, 0.6)',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: colors.background,
      }}
    >
      <div className="text-center px-8">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring',
            damping: 12,
            stiffness: 200,
            delay: 0.2
          }}
          className="mb-6 flex justify-center"
        >
          <div 
            className="w-24 h-24 rounded-[24px] flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, #FFB300 0%, #FBC02D 100%)',
              boxShadow: '0 20px 60px rgba(255, 179, 0, 0.4)'
            }}
          >
            <TrendingUp className="w-12 h-12" style={{ color: '#1A1A1D' }} />
            
            {/* Sparkle effects */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-[#FFD54F]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: '36px',
            fontWeight: 700,
            letterSpacing: '-1.5px',
            color: colors.textPrimary,
            marginBottom: '12px',
            fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif',
          }}
        >
          Mom Can Invest
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontSize: '16px',
            color: colors.textSecondary,
            fontWeight: 500,
          }}
        >
          Premium Investment Portfolio
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-12 flex justify-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
              className="w-2 h-2 rounded-full"
              style={{ background: '#FFD54F' }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
