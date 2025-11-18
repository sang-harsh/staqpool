import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import InvestmentConfirmation from './InvestmentConfirmation';

interface InvestmentOverlayProps {
  theme: 'light' | 'dark';
  plan: 'safe' | 'aggressive';
  onClose: () => void;
}

export default function InvestmentOverlay({ theme, plan, onClose }: InvestmentOverlayProps) {
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const planDetails = {
    safe: {
      name: 'Safe',
      subtitle: 'Low Risk, Steady Returns',
      returnMin: 0.04,
      returnMax: 0.05,
      returnRate: '4-5% APY',
      minimum: '$100',
      riskLevel: 'Low',
      quickAmounts: ['500', '1000', '5000']
    },
    aggressive: {
      name: 'Aggressive',
      subtitle: 'High Risk, High Rewards',
      returnMin: 0.10,
      returnMax: 1.00,
      returnRate: '10-100%+ APY',
      minimum: '$500',
      riskLevel: 'High',
      quickAmounts: ['1000', '5000', '10000']
    }
  };

  const details = planDetails[plan];

  const colors = theme === 'dark' ? {
    background: 'rgba(26, 26, 29, 0.98)',
    border: 'rgba(255, 243, 130, 0.25)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    cardBg: 'rgba(255, 235, 59, 0.08)',
    cardBorder: 'rgba(255, 243, 130, 0.15)',
    inputBg: 'rgba(255, 255, 255, 0.05)',
    inputBorder: 'rgba(255, 243, 130, 0.2)',
  } : {
    background: 'rgba(255, 255, 255, 0.98)',
    border: 'rgba(255, 193, 7, 0.25)',
    textPrimary: '#1A1A1D',
    textSecondary: 'rgba(26, 26, 29, 0.6)',
    cardBg: 'rgba(255, 193, 7, 0.08)',
    cardBorder: 'rgba(255, 193, 7, 0.15)',
    inputBg: 'rgba(255, 193, 7, 0.03)',
    inputBorder: 'rgba(255, 193, 7, 0.2)',
  };

  const handleInvest = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    toast.success(`Investment of $${amount} successful!`);
    setShowConfirmation(false);
    onClose();
  };

  // Calculate expected earnings
  const amountNum = parseFloat(amount) || 0;
  const expectedMin = (amountNum * details.returnMin).toFixed(0);
  const expectedMax = (amountNum * details.returnMax).toFixed(0);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(30px)'
        }}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ 
          type: 'spring',
          damping: 25,
          stiffness: 300,
          duration: 0.4 
        }}
        className="fixed z-50 rounded-[28px] left-1/2 -translate-x-1/2 overflow-y-auto"
        style={{
          top: '80px',
          bottom: '40px',
          width: '345px',
          background: colors.background,
          backdropFilter: 'blur(40px)',
          border: `2px solid ${colors.border}`,
          boxShadow: theme === 'dark'
            ? 'inset 0 2px 0 rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.5)'
            : 'inset 0 2px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.15)'
        }}
      >
        <div className="p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h3 
            className="font-bold mb-1"
            style={{ 
              color: colors.textPrimary,
              fontSize: '26px'
            }}
          >
            {details.name}
          </h3>
          <p 
            style={{ 
              color: colors.textSecondary,
              fontSize: '15px'
            }}
          >
            {details.subtitle}
          </p>
        </div>

        {/* Expected Return Badge */}
        <div 
          className="flex items-center gap-2 px-4 py-3 rounded-2xl mb-6"
          style={{
            background: plan === 'stable' 
              ? 'rgba(76, 217, 100, 0.15)'
              : 'rgba(255, 193, 7, 0.15)',
            border: plan === 'stable'
              ? '1px solid rgba(76, 217, 100, 0.3)'
              : '1px solid rgba(255, 193, 7, 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <DollarSign className="w-5 h-5" style={{ color: plan === 'stable' ? '#4CD964' : '#FFB300' }} />
          <div className="flex-1">
            <p 
              className="font-semibold"
              style={{ 
                color: colors.textPrimary,
                fontSize: '16px'
              }}
            >
              {details.returnRate}
            </p>
          </div>
        </div>

        {/* Investment Amount Input */}
        <div className="mb-3">
          <label 
            className="block mb-2"
            style={{ 
              color: colors.textSecondary,
              fontSize: '13px'
            }}
          >
            Enter Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$0.00"
            className="w-full h-[56px] rounded-2xl px-5 bg-transparent outline-none transition-all"
            style={{
              background: colors.inputBg,
              border: `2px solid ${colors.inputBorder}`,
              color: colors.textPrimary,
              fontFamily: 'SF Pro Rounded, -apple-system, system-ui, sans-serif',
              fontSize: '22px',
              fontWeight: 500
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#FFD54F';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 213, 79, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.inputBorder;
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex gap-2 mb-6">
          {details.quickAmounts.map((quickAmount) => (
            <motion.button
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 h-10 rounded-xl transition-all flex items-center justify-center"
              style={{
                background: amount === quickAmount 
                  ? 'linear-gradient(135deg, #FFB300 0%, #FBC02D 100%)'
                  : colors.inputBg,
                border: `1px solid ${amount === quickAmount ? '#FFB300' : colors.inputBorder}`,
                color: amount === quickAmount 
                  ? '#1A1A1D' 
                  : colors.textPrimary,
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              ${parseInt(quickAmount).toLocaleString()}
            </motion.button>
          ))}
          <motion.button
            onClick={() => setAmount('')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: colors.inputBg,
              border: `1px solid ${colors.inputBorder}`,
              color: colors.textSecondary,
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            Custom
          </motion.button>
        </div>

        {/* Expected Earnings Display */}
        {amountNum > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl"
            style={{
              background: 'rgba(76, 217, 100, 0.15)',
              border: '1px solid rgba(76, 217, 100, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <p 
              className="text-center mb-1"
              style={{ 
                color: colors.textSecondary,
                fontSize: '13px'
              }}
            >
              You'll earn yearly
            </p>
            <p 
              className="text-center font-bold"
              style={{ 
                color: '#4CD964',
                fontFamily: 'SF Pro Rounded, -apple-system, system-ui, sans-serif',
                fontSize: '28px'
              }}
            >
              ${expectedMin} - ${expectedMax}
            </p>
          </motion.div>
        )}

        {/* Helper Text */}
        <p 
          className="text-center mb-6"
          style={{ 
            color: colors.textSecondary,
            fontSize: '12px'
          }}
        >
          Most people start with ${details.quickAmounts[0]}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* Cancel Button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl font-semibold flex items-center justify-center"
            style={{
              width: '156px',
              height: '56px',
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
            Cancel
          </motion.button>

          {/* Invest Button */}
          <motion.button
            onClick={handleInvest}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 8px 32px rgba(255,179,0,0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl font-semibold flex items-center justify-center"
            style={{
              width: '156px',
              height: '56px',
              background: 'linear-gradient(135deg, #FFB300 0%, #FBC02D 100%)',
              color: '#1A1A1D',
              fontSize: '17px',
              letterSpacing: '-0.3px',
              boxShadow: '0 6px 24px rgba(255,179,0,0.3)'
            }}
          >
            Invest Now
          </motion.button>
        </div>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmation && (
          <InvestmentConfirmation
            theme={theme}
            plan={plan}
            amount={amount}
            onConfirm={handleConfirm}
            onGoBack={() => setShowConfirmation(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
