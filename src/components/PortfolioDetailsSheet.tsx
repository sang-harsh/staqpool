import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioDetailsSheetProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

export default function PortfolioDetailsSheet({ theme, onClose }: PortfolioDetailsSheetProps) {
  const colors = theme === 'dark' ? {
    background: 'rgba(26, 26, 29, 0.98)',
    border: 'rgba(255, 243, 130, 0.25)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.5)',
    textTertiary: 'rgba(255, 255, 255, 0.6)',
  } : {
    background: 'rgba(255, 255, 255, 0.98)',
    border: 'rgba(255, 193, 7, 0.25)',
    textPrimary: '#1A1A1D',
    textSecondary: 'rgba(26, 26, 29, 0.5)',
    textTertiary: 'rgba(26, 26, 29, 0.6)',
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)'
        }}
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[32px] max-w-[393px] mx-auto overflow-hidden flex flex-col"
        style={{
          height: '500px',
          background: colors.background,
          backdropFilter: 'blur(40px)',
          border: `2px solid ${colors.border}`,
          borderBottom: 'none',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.3)'
        }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-6 flex-shrink-0">
          <div 
            className="w-10 h-1 rounded-full"
            style={{ background: colors.textSecondary }}
          />
        </div>

        {/* Content */}
        <div className="px-8 pb-8 overflow-y-auto flex-1">
          {/* Title */}
          <h3 
            className="text-center mb-8 font-semibold"
            style={{
              fontSize: '20px',
              color: colors.textPrimary
            }}
          >
            Portfolio Details
          </h3>

          {/* Total Balance */}
          <div className="mb-6">
            <p 
              className="mb-2"
              style={{
                fontSize: '13px',
                color: colors.textSecondary
              }}
            >
              Total Balance
            </p>
            <p 
              className="font-bold mb-3"
              style={{
                fontSize: '32px',
                fontFamily: 'SF Pro Rounded, -apple-system, system-ui, sans-serif',
                color: colors.textPrimary
              }}
            >
              $45,250.00
            </p>

            {/* Profit Stats */}
            <div className="flex gap-2">
              <div 
                className="flex-1 px-3 py-2 rounded-lg"
                style={{
                  background: 'rgba(76, 217, 100, 0.15)',
                  border: '1px solid rgba(76, 217, 100, 0.3)',
                }}
              >
                <p style={{ fontSize: '11px', color: colors.textSecondary, marginBottom: '2px' }}>
                  Total Profit
                </p>
                <p className="font-semibold" style={{ fontSize: '15px', color: '#4CD964' }}>
                  +$2,150
                </p>
              </div>
              <div 
                className="flex-1 px-3 py-2 rounded-lg"
                style={{
                  background: 'rgba(255, 193, 7, 0.15)',
                  border: '1px solid rgba(255, 193, 7, 0.3)',
                }}
              >
                <p style={{ fontSize: '11px', color: colors.textSecondary, marginBottom: '2px' }}>
                  Daily Profit
                </p>
                <p className="font-semibold" style={{ fontSize: '15px', color: '#FFB300' }}>
                  +$87.50
                </p>
              </div>
            </div>
          </div>

          {/* Investment Breakdown */}
          <div className="mb-8">
            <p 
              className="mb-4"
              style={{
                fontSize: '13px',
                color: colors.textSecondary
              }}
            >
              Your Money is Working
            </p>

            {/* Safe Plan */}
            <div 
              className="mb-4 p-4 rounded-2xl"
              style={{
                background: 'rgba(0, 188, 212, 0.15)',
                border: '1px solid rgba(0, 188, 212, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[16px]">🛡️</span>
                  <p 
                    className="font-semibold"
                    style={{
                      fontSize: '16px',
                      color: colors.textPrimary
                    }}
                  >
                    Safe
                  </p>
                </div>
                <p 
                  className="font-bold"
                  style={{
                    fontSize: '20px',
                    fontFamily: 'SF Pro Rounded, -apple-system, system-ui, sans-serif',
                    color: colors.textPrimary
                  }}
                >
                  $30,000
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p 
                  style={{
                    fontSize: '12px',
                    color: colors.textTertiary
                  }}
                >
                  Growing 4.5% APY
                </p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-[#00BCD4]" />
                  <p 
                    className="font-semibold"
                    style={{
                      fontSize: '14px',
                      color: '#00BCD4'
                    }}
                  >
                    +$1,350
                  </p>
                </div>
              </div>
            </div>

            {/* Aggressive Plan */}
            <div 
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(255, 152, 0, 0.15)',
                border: '1px solid rgba(255, 152, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[16px]">📈</span>
                  <p 
                    className="font-semibold"
                    style={{
                      fontSize: '16px',
                      color: colors.textPrimary
                    }}
                  >
                    Aggressive
                  </p>
                </div>
                <p 
                  className="font-bold"
                  style={{
                    fontSize: '20px',
                    fontFamily: 'SF Pro Rounded, -apple-system, system-ui, sans-serif',
                    color: colors.textPrimary
                  }}
                >
                  $15,250
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p 
                  style={{
                    fontSize: '12px',
                    color: colors.textTertiary
                  }}
                >
                  Growing 18% APY
                </p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-[#FF9800]" />
                  <p 
                    className="font-semibold"
                    style={{
                      fontSize: '14px',
                      color: '#FF9800'
                    }}
                  >
                    +$2,745
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Profit */}
          <div 
            className="p-4 rounded-2xl"
            style={{
              background: 'rgba(76, 217, 100, 0.15)',
              border: '1px solid rgba(76, 217, 100, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p 
                  className="mb-1"
                  style={{
                    fontSize: '13px',
                    color: colors.textSecondary
                  }}
                >
                  Total Profit So Far
                </p>
                <p 
                  style={{
                    fontSize: '11px',
                    color: colors.textTertiary
                  }}
                >
                  Since January 2025
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#4CD964]" />
                <p 
                  className="font-bold"
                  style={{
                    fontSize: '28px',
                    fontFamily: 'SF Pro Rounded, -apple-system, system-ui, sans-serif',
                    color: '#4CD964'
                  }}
                >
                  +$2,150
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
