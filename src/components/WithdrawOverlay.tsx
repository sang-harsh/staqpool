import { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface WithdrawOverlayProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

export default function WithdrawOverlay({ theme, onClose }: WithdrawOverlayProps) {
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const availableBalance = 45250.00;

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    
    if (!amount || withdrawAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (withdrawAmount > availableBalance) {
      toast.error('Insufficient balance');
      return;
    }

    if (!walletAddress) {
      toast.error('Please enter wallet address');
      return;
    }

    toast.success(`Withdrawal of $${amount} completed instantly!`);
    onClose();
  };

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

      {/* Modal Container - Scrollable */}
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
          background: theme === 'dark'
            ? 'rgba(26, 26, 29, 0.98)'
            : 'rgba(255, 255, 255, 0.98)',
          border: theme === 'dark'
            ? '1.5px solid rgba(255, 243, 130, 0.25)'
            : '1.5px solid rgba(255, 193, 7, 0.25)',
          boxShadow: theme === 'dark'
            ? 'inset 0 2px 0 rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.5)'
            : 'inset 0 2px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.15)'
        }}
      >
        <div className="p-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <Wallet 
            className="w-12 h-12 mb-2" 
            style={{
              color: '#FFD54F',
              filter: 'drop-shadow(0 0 12px rgba(255,213,79,0.4))'
            }}
          />
          <h3 
            className="text-[26px] font-bold mb-1"
            style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1D' }}
          >
            Take Out Money
          </h3>
          <p 
            className="text-[13px]"
            style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,29,0.5)' }}
          >
            Instant wallet transfer
          </p>
        </div>

        {/* Balance Display - Simplified */}
        <div 
          className="rounded-2xl p-5 mb-6"
          style={{
            background: 'rgba(255, 235, 59, 0.08)',
            border: '1px solid rgba(255, 243, 130, 0.15)'
          }}
        >
          <div className="flex justify-between items-center">
            <p 
              className="text-[13px]"
              style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,29,0.6)' }}
            >
              Total Available
            </p>
            <p 
              className="text-[24px] font-semibold"
              style={{ color: '#FFD54F' }}
            >
              ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Withdrawal Amount Input */}
        <div className="mb-4">
          <label 
            className="text-[13px] mb-2 block"
            style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,29,0.6)' }}
          >
            Amount to Take Out
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$0.00"
            max={availableBalance}
            className="w-full h-14 rounded-[14px] px-4 text-[20px] font-medium bg-transparent outline-none transition-all"
            style={{
              background: theme === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 193, 7, 0.03)',
              border: theme === 'dark'
                ? '1.5px solid rgba(255, 243, 130, 0.2)'
                : '1.5px solid rgba(255, 193, 7, 0.2)',
              color: theme === 'dark' ? '#FFFFFF' : '#1A1A1D'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#FFD54F';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 213, 79, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme === 'dark'
                ? 'rgba(255, 243, 130, 0.2)'
                : 'rgba(255, 193, 7, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Wallet Address Input */}
        <div className="mb-6">
          <label 
            className="text-[13px] mb-2 block"
            style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,29,0.6)' }}
          >
            Your Wallet Address
          </label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="0x..."
            className="w-full h-14 rounded-[14px] px-4 text-[14px] font-medium bg-transparent outline-none transition-all"
            style={{
              background: theme === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 193, 7, 0.03)',
              border: theme === 'dark'
                ? '1.5px solid rgba(255, 243, 130, 0.2)'
                : '1.5px solid rgba(255, 193, 7, 0.2)',
              color: theme === 'dark' ? '#FFFFFF' : '#1A1A1D'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#FFD54F';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 213, 79, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme === 'dark'
                ? 'rgba(255, 243, 130, 0.2)'
                : 'rgba(255, 193, 7, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

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
              color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(26,26,29,0.7)',
              fontSize: '17px',
              letterSpacing: '-0.3px'
            }}
          >
            Cancel
          </motion.button>

          {/* Confirm Withdrawal Button */}
          <motion.button
            onClick={handleWithdraw}
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
            Confirm
          </motion.button>
        </div>
        </div>
      </motion.div>
    </>
  );
}
