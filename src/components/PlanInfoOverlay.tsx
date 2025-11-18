import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface PlanInfoOverlayProps {
  theme: 'light' | 'dark';
  plan: 'safe' | 'aggressive';
  onClose: () => void;
}

export default function PlanInfoOverlay({ theme, plan, onClose }: PlanInfoOverlayProps) {
  const colors = theme === 'dark' ? {
    background: 'rgba(26, 26, 29, 0.98)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(255, 243, 130, 0.25)',
  } : {
    background: 'rgba(250, 249, 245, 0.98)',
    textPrimary: '#1A1A1D',
    textSecondary: 'rgba(26, 26, 29, 0.6)',
    border: 'rgba(255, 193, 7, 0.25)',
  };

  const planInfo = plan === 'safe' ? {
    title: 'Safe Plan',
    strategy: 'Staking',
    description: 'Your funds are staked securely on the blockchain, earning consistent rewards with minimal risk.'
  } : {
    title: 'Aggressive Plan',
    strategy: 'Liquidity Pools on Raydium',
    description: 'Your funds provide liquidity on Raydium DEX, earning trading fees and rewards with higher potential returns.'
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] p-5 w-[280px]"
        style={{
          background: colors.background,
          backdropFilter: 'blur(40px)',
          border: `1.5px solid ${colors.border}`,
          boxShadow: theme === 'dark'
            ? 'inset 0 2px 0 rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.5)'
            : 'inset 0 2px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.15)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 
            className="font-semibold"
            style={{ 
              color: colors.textPrimary,
              fontSize: '17px'
            }}
          >
            {planInfo.title}
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: colors.textSecondary,
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Strategy */}
        <div 
          className="mb-3 px-3 py-2 rounded-lg"
          style={{
            background: plan === 'safe' 
              ? 'rgba(0, 188, 212, 0.15)' 
              : 'rgba(255, 152, 0, 0.15)',
            border: plan === 'safe'
              ? '1px solid rgba(0, 188, 212, 0.3)'
              : '1px solid rgba(255, 152, 0, 0.3)',
          }}
        >
          <p style={{ fontSize: '13px', color: colors.textSecondary, marginBottom: '2px' }}>
            Strategy
          </p>
          <p 
            className="font-semibold"
            style={{ 
              fontSize: '14px',
              color: plan === 'safe' ? '#00BCD4' : '#FF9800'
            }}
          >
            {planInfo.strategy}
          </p>
        </div>

        {/* Description */}
        <p style={{ fontSize: '13px', color: colors.textSecondary, lineHeight: '1.5' }}>
          {planInfo.description}
        </p>
      </motion.div>
    </>
  );
}
