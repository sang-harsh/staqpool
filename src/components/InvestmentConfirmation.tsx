import { motion } from 'motion/react';

interface InvestmentConfirmationProps {
  theme: 'light' | 'dark';
  plan: 'stable' | 'growth';
  amount: string;
  onConfirm: () => void;
  onGoBack: () => void;
}

export default function InvestmentConfirmation({ 
  theme, 
  plan, 
  amount, 
  onConfirm, 
  onGoBack 
}: InvestmentConfirmationProps) {
  const colors = theme === 'dark' ? {
    background: 'rgba(26, 26, 29, 0.98)',
    border: 'rgba(255, 243, 130, 0.25)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
  } : {
    background: 'rgba(255, 255, 255, 0.98)',
    border: 'rgba(255, 193, 7, 0.25)',
    textPrimary: '#1A1A1D',
    textSecondary: 'rgba(26, 26, 29, 0.6)',
  };

  const planDetails = plan === 'stable' 
    ? { name: 'Stable Plan', min: 0.04, max: 0.05 }
    : { name: 'Growth Plan', min: 0.10, max: 1.00 };

  const amountNum = parseFloat(amount) || 0;
  const expectedMin = (amountNum * planDetails.min).toFixed(0);
  const expectedMax = (amountNum * planDetails.max).toFixed(0);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60]"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(20px)'
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] rounded-[24px] p-8 w-[345px]"
        style={{
          background: colors.background,
          backdropFilter: 'blur(40px)',
          border: `2px solid ${colors.border}`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
        }}
      >
        <div className="text-center">
          <h3 
            className="mb-6 font-semibold"
            style={{
              fontSize: '22px',
              color: colors.textPrimary
            }}
          >
            You're Investing
          </h3>

          <div 
            className="mb-2 font-bold"
            style={{
              fontSize: '48px',
              fontFamily: 'SF Pro Rounded, -apple-system, system-ui, sans-serif',
              color: colors.textPrimary
            }}
          >
            ${amountNum.toLocaleString()}
          </div>

          <p 
            className="mb-8"
            style={{
              fontSize: '16px',
              color: colors.textSecondary
            }}
          >
            in {planDetails.name}
          </p>

          <div 
            className="mb-8 p-4 rounded-2xl"
            style={{
              background: 'rgba(76, 217, 100, 0.15)',
              border: '1px solid rgba(76, 217, 100, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <p 
              className="mb-1"
              style={{
                fontSize: '13px',
                color: colors.textSecondary
              }}
            >
              Expected yearly return
            </p>
            <p 
              className="font-bold"
              style={{
                fontSize: '24px',
                fontFamily: 'SF Pro Rounded, -apple-system, system-ui, sans-serif',
                color: '#4CD964'
              }}
            >
              ${expectedMin} to ${expectedMax}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={onGoBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 h-[56px] rounded-2xl font-semibold flex items-center justify-center"
              style={{
                background: theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.03)',
                border: theme === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.1)',
                color: colors.textSecondary,
                fontSize: '17px',
                letterSpacing: '-0.3px'
              }}
            >
              Go Back
            </motion.button>

            <motion.button
              onClick={onConfirm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 h-[56px] rounded-2xl font-semibold flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FFB300 0%, #FBC02D 100%)',
                color: '#1A1A1D',
                fontSize: '17px',
                letterSpacing: '-0.3px',
                boxShadow: '0 8px 24px rgba(255, 179, 0, 0.3)'
              }}
            >
              Confirm
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
