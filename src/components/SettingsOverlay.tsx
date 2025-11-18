import { motion } from 'motion/react';
import { Settings, Mail, MessageSquare, FileText, Shield, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SettingsOverlayProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

export default function SettingsOverlay({ theme, onClose }: SettingsOverlayProps) {
  const colors = theme === 'dark' ? {
    background: 'rgba(26, 26, 29, 0.98)',
    border: 'rgba(255, 243, 130, 0.25)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    itemBg: 'rgba(255, 255, 255, 0.03)',
    itemBorder: 'rgba(255, 255, 255, 0.08)',
    itemHoverBg: 'rgba(255, 255, 255, 0.05)',
  } : {
    background: 'rgba(255, 255, 255, 0.98)',
    border: 'rgba(255, 193, 7, 0.25)',
    textPrimary: '#1A1A1D',
    textSecondary: 'rgba(26, 26, 29, 0.6)',
    itemBg: 'rgba(0, 0, 0, 0.02)',
    itemBorder: 'rgba(0, 0, 0, 0.06)',
    itemHoverBg: 'rgba(0, 0, 0, 0.04)',
  };

  const handleContactUs = () => {
    toast.success('Opening contact form...');
    // In a real app, this would open a contact form or email client
  };

  const handlePrivacy = () => {
    toast.info('Privacy Policy');
  };

  const handleTerms = () => {
    toast.info('Terms of Service');
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
          background: colors.background,
          border: `1.5px solid ${colors.border}`,
          boxShadow: theme === 'dark'
            ? 'inset 0 2px 0 rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.5)'
            : 'inset 0 2px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.15)'
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Settings 
                className="w-6 h-6" 
                style={{
                  color: '#FFD54F',
                  filter: 'drop-shadow(0 0 8px rgba(255,213,79,0.4))'
                }}
              />
              <h3 
                className="text-[26px] font-bold"
                style={{ color: colors.textPrimary }}
              >
                Settings
              </h3>
            </div>
            
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: colors.itemBg,
                border: `1px solid ${colors.itemBorder}`
              }}
            >
              <X className="w-4 h-4" style={{ color: colors.textSecondary }} />
            </motion.button>
          </div>

          {/* Settings Items */}
          <div className="space-y-3">
            {/* Contact Us */}
            <motion.button
              onClick={handleContactUs}
              whileHover={{ scale: 1.01, background: colors.itemHoverBg }}
              whileTap={{ scale: 0.99 }}
              className="w-full rounded-[16px] p-4 flex items-center gap-3 transition-all"
              style={{
                background: colors.itemBg,
                border: `1px solid ${colors.itemBorder}`,
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 179, 0, 0.15)'
                }}
              >
                <Mail className="w-5 h-5" style={{ color: '#FFB300' }} />
              </div>
              
              <div className="flex-1 text-left">
                <p 
                  className="text-[15px] font-semibold"
                  style={{ color: colors.textPrimary }}
                >
                  Contact Us
                </p>
                <p 
                  className="text-[12px]"
                  style={{ color: colors.textSecondary }}
                >
                  Get help and support
                </p>
              </div>
            </motion.button>

            {/* Feedback */}
            <motion.button
              onClick={() => toast.success('Feedback form opened')}
              whileHover={{ scale: 1.01, background: colors.itemHoverBg }}
              whileTap={{ scale: 0.99 }}
              className="w-full rounded-[16px] p-4 flex items-center gap-3 transition-all"
              style={{
                background: colors.itemBg,
                border: `1px solid ${colors.itemBorder}`,
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 179, 0, 0.15)'
                }}
              >
                <MessageSquare className="w-5 h-5" style={{ color: '#FFB300' }} />
              </div>
              
              <div className="flex-1 text-left">
                <p 
                  className="text-[15px] font-semibold"
                  style={{ color: colors.textPrimary }}
                >
                  Send Feedback
                </p>
                <p 
                  className="text-[12px]"
                  style={{ color: colors.textSecondary }}
                >
                  Help us improve
                </p>
              </div>
            </motion.button>

            {/* Privacy Policy */}
            <motion.button
              onClick={handlePrivacy}
              whileHover={{ scale: 1.01, background: colors.itemHoverBg }}
              whileTap={{ scale: 0.99 }}
              className="w-full rounded-[16px] p-4 flex items-center gap-3 transition-all"
              style={{
                background: colors.itemBg,
                border: `1px solid ${colors.itemBorder}`,
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)'
                }}
              >
                <Shield className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </div>
              
              <div className="flex-1 text-left">
                <p 
                  className="text-[15px] font-semibold"
                  style={{ color: colors.textPrimary }}
                >
                  Privacy Policy
                </p>
                <p 
                  className="text-[12px]"
                  style={{ color: colors.textSecondary }}
                >
                  How we protect your data
                </p>
              </div>
            </motion.button>

            {/* Terms of Service */}
            <motion.button
              onClick={handleTerms}
              whileHover={{ scale: 1.01, background: colors.itemHoverBg }}
              whileTap={{ scale: 0.99 }}
              className="w-full rounded-[16px] p-4 flex items-center gap-3 transition-all"
              style={{
                background: colors.itemBg,
                border: `1px solid ${colors.itemBorder}`,
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)'
                }}
              >
                <FileText className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </div>
              
              <div className="flex-1 text-left">
                <p 
                  className="text-[15px] font-semibold"
                  style={{ color: colors.textPrimary }}
                >
                  Terms of Service
                </p>
                <p 
                  className="text-[12px]"
                  style={{ color: colors.textSecondary }}
                >
                  Our terms and conditions
                </p>
              </div>
            </motion.button>
          </div>

          {/* App Version */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.itemBorder }}>
            <p 
              className="text-center text-[12px]"
              style={{ color: colors.textSecondary }}
            >
              Mom Can Invest v1.0.0
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
