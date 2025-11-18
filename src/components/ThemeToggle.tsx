import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: theme === 'dark' 
          ? 'rgba(255, 235, 59, 0.1)' 
          : 'rgba(255, 193, 7, 0.08)',
        backdropFilter: 'blur(20px)',
        border: theme === 'dark'
          ? '1px solid rgba(255, 243, 130, 0.2)'
          : '1px solid rgba(255, 193, 7, 0.25)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-white" />
        ) : (
          <Sun className="w-5 h-5 text-[#1A1A1D]" />
        )}
      </motion.div>
    </motion.button>
  );
}
