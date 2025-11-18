import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wallet,
  TrendingUp,
  Settings,
  Info,
  BarChart3,
  DollarSign,
} from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import ThemeToggle from "./components/ThemeToggle";
import FloatingParticles from "./components/FloatingParticles";
import MagneticButton from "./components/MagneticButton";
import InvestmentOverlay from "./components/InvestmentOverlay";
import WithdrawOverlay from "./components/WithdrawOverlay";
import PortfolioDetailsSheet from "./components/PortfolioDetailsSheet";
import ActivityHistory from "./components/ActivityHistory";
import SettingsOverlay from "./components/SettingsOverlay";
import WelcomeOverlay from "./components/WelcomeOverlay";
import PlanInfoOverlay from "./components/PlanInfoOverlay";
import MonthlyProgressChart from "./components/MonthlyProgressChart";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showInvestment, setShowInvestment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<
    "safe" | "aggressive" | null
  >(null);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSafeInfo, setShowSafeInfo] = useState(false);
  const [showAggressiveInfo, setShowAggressiveInfo] =
    useState(false);
  const [portfolioView, setPortfolioView] = useState<
    "balance" | "chart"
  >("balance");

  useEffect(() => {
    // Hide welcome screen after 2.5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handlePlanClick = (plan: "safe" | "aggressive") => {
    setSelectedPlan(plan);
    setShowInvestment(true);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleConnectWallet = () => {
    toast.success("Wallet connected successfully!");
  };

  // Theme-based colors
  const colors =
    theme === "dark"
      ? {
          background:
            "linear-gradient(to bottom, #0A0A0B, #1C1810)",
          textPrimary: "#FFFFFF",
          textSecondary: "rgba(255, 255, 255, 0.5)",
          glassBase: "rgba(255, 235, 59, 0.12)",
          glassBorder: "rgba(255, 243, 130, 0.25)",
          glassSecondary: "rgba(255, 235, 59, 0.08)",
          accentYellow: "#FFB300",
          cardShadow:
            "0 8px 40px rgba(255, 193, 7, 0.05), 0 8px 32px rgba(0,0,0,0.3)",
        }
      : {
          background:
            "linear-gradient(to bottom, #FFFDF0, #FFF9E6)",
          textPrimary: "#1A1A1D",
          textSecondary: "rgba(26, 26, 29, 0.5)",
          glassBase: "rgba(255, 193, 7, 0.08)",
          glassBorder: "rgba(255, 193, 7, 0.25)",
          glassSecondary: "rgba(255, 193, 7, 0.05)",
          accentYellow: "#FFE57F",
          cardShadow: "0 4px 24px rgba(0,0,0,0.04)",
        };

  return (
    <div
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden transition-all duration-600"
      style={{ background: colors.background }}
    >
      {/* Floating Particles */}
      <FloatingParticles theme={theme} />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            theme === "dark"
              ? "radial-gradient(circle, white 1px, transparent 1px)"
              : "radial-gradient(circle, rgba(26,26,29,0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Frosted Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
      />

      {/* Main Content - Scrollable */}
      <div className="relative min-h-full max-w-[393px] mx-auto px-6 pt-[60px] pb-10 overflow-y-auto">
        {/* Header - Controls */}
        <div className="mb-10 flex items-center justify-end">
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            {/* Settings Button */}
            <motion.button
              onClick={() => setShowSettings(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: colors.glassSecondary,
                backdropFilter: "blur(10px)",
                border: `1px solid ${colors.glassBorder}`,
              }}
            >
              <Settings
                className="w-5 h-5"
                style={{ color: colors.textSecondary }}
              />
            </motion.button>

            {/* Connect Wallet Button */}
            <motion.button
              onClick={handleConnectWallet}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #FFB300 0%, #FBC02D 100%)",
                boxShadow: "0 4px 16px rgba(255, 179, 0, 0.3)",
              }}
            >
              <Wallet
                className="w-5 h-5"
                style={{ color: "#1A1A1D" }}
              />
            </motion.button>
          </div>
        </div>

        {/* Title Section - Moved Higher */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
            }}
            transition={{ delay: 0.1 }}
            className="relative"
            style={{
              fontSize: "38px",
              fontWeight: 700,
              letterSpacing: "-1.5px",
              color: colors.textPrimary,
              fontFamily:
                "SF Pro Display, -apple-system, system-ui, sans-serif",
            }}
          >
            <span className="relative z-10">Mom Can Invest</span>
            {/* Subtle gradient underline */}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              style={{
                background: theme === "dark"
                  ? "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent)",
              }}
            />
          </motion.h1>
        </div>

        {/* Portfolio Card - MINIMAL DESIGN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          {/* View Toggle */}
          <div className="flex gap-2 mb-6">
            <motion.button
              onClick={() => setPortfolioView("balance")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all"
              style={{
                background:
                  portfolioView === "balance"
                    ? theme === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.05)"
                    : "transparent",
                border: `1.5px solid ${
                  portfolioView === "balance"
                    ? theme === "dark"
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(0, 0, 0, 0.1)"
                    : theme === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.05)"
                }`,
                boxShadow: portfolioView === "balance"
                  ? theme === "dark"
                    ? "0 0 20px rgba(76, 217, 100, 0.2)"
                    : "0 2px 8px rgba(76, 217, 100, 0.15)"
                  : "none",
              }}
            >
              <DollarSign
                className="w-4 h-4"
                style={{ color: colors.textPrimary }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: colors.textPrimary,
                }}
              >
                Balance
              </span>
              {portfolioView === "balance" && (
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-[#4CD964]"
                  animate={{
                    boxShadow: [
                      "0 0 5px rgba(76, 217, 100, 0.5)",
                      "0 0 10px rgba(76, 217, 100, 0.8)",
                      "0 0 5px rgba(76, 217, 100, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.button>

            <motion.button
              onClick={() => setPortfolioView("chart")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all"
              style={{
                background:
                  portfolioView === "chart"
                    ? theme === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.05)"
                    : "transparent",
                border: `1.5px solid ${
                  portfolioView === "chart"
                    ? theme === "dark"
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(0, 0, 0, 0.1)"
                    : theme === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.05)"
                }`,
                boxShadow: portfolioView === "chart"
                  ? theme === "dark"
                    ? "0 0 20px rgba(76, 217, 100, 0.2)"
                    : "0 2px 8px rgba(76, 217, 100, 0.15)"
                  : "none",
              }}
            >
              <BarChart3
                className="w-4 h-4"
                style={{ color: colors.textPrimary }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: colors.textPrimary,
                }}
              >
                Growth Details
              </span>
              {portfolioView === "chart" && (
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-[#4CD964]"
                  animate={{
                    boxShadow: [
                      "0 0 5px rgba(76, 217, 100, 0.5)",
                      "0 0 10px rgba(76, 217, 100, 0.8)",
                      "0 0 5px rgba(76, 217, 100, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.button>
          </div>

          {/* Conditional Content */}
          {portfolioView === "balance" ? (
            /* MINIMAL BALANCE VIEW */
            <motion.div
              className="p-8 rounded-3xl relative overflow-hidden"
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                background:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(0, 0, 0, 0.03)",
                border:
                  theme === "dark"
                    ? "1.5px solid rgba(255, 255, 255, 0.1)"
                    : "1.5px solid rgba(0, 0, 0, 0.06)",
                backdropFilter: "blur(20px) saturate(180%)",
                boxShadow: theme === "dark" 
                  ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
              }}
            >
              {/* Ambient Glow Effect */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: theme === "dark"
                    ? "radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.1) 0%, transparent 70%)"
                    : "radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.15) 0%, transparent 70%)",
                }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 60%, transparent 100%)",
                    "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 60%, transparent 100%)",
                  ],
                  backgroundPosition: ["-200%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
              {/* Total Balance Label */}
              <p
                className="text-center mb-3 relative z-10"
                style={{
                  fontSize: "14px",
                  color: colors.textSecondary,
                  fontWeight: 500,
                }}
              >
                Total Portfolio Value
              </p>

              {/* Big Balance Number with Glow */}
              <motion.h2
                className="text-center mb-8 relative z-10"
                animate={{
                  textShadow: theme === "dark" 
                    ? [
                        "0 0 20px rgba(255, 215, 0, 0.2)",
                        "0 0 30px rgba(255, 215, 0, 0.3)",
                        "0 0 20px rgba(255, 215, 0, 0.2)",
                      ]
                    : [
                        "0 2px 10px rgba(255, 215, 0, 0.2)",
                        "0 2px 15px rgba(255, 215, 0, 0.3)",
                        "0 2px 10px rgba(255, 215, 0, 0.2)",
                      ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  fontSize: "52px",
                  fontWeight: 700,
                  letterSpacing: "-2px",
                  fontFamily:
                    "SF Pro Rounded, -apple-system, system-ui, sans-serif",
                  color: colors.textPrimary,
                }}
              >
                $45,250
              </motion.h2>

              {/* Key Stats - Clearer Labels */}
              <div className="grid grid-cols-3 gap-4">
                {/* Total Invested */}
                <div className="text-center">
                  <p
                    style={{
                      fontSize: "12px",
                      color: colors.textSecondary,
                      marginBottom: "6px",
                      fontWeight: 500,
                    }}
                  >
                    Total Invested
                  </p>
                  <p
                    className="font-semibold"
                    style={{
                      fontSize: "17px",
                      color: colors.textPrimary,
                    }}
                  >
                    $43,100
                  </p>
                </div>

                {/* Total Profit Earned */}
                <div className="text-center relative z-10">
                  <p
                    style={{
                      fontSize: "12px",
                      color: colors.textSecondary,
                      marginBottom: "6px",
                      fontWeight: 500,
                    }}
                  >
                    Total Profit
                  </p>
                  <motion.p
                    className="font-semibold"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(76, 217, 100, 0.3)",
                        "0 0 20px rgba(76, 217, 100, 0.5)",
                        "0 0 10px rgba(76, 217, 100, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      fontSize: "17px",
                      color: "#4CD964",
                    }}
                  >
                    +$2,150
                  </motion.p>
                </div>

                {/* Daily Interest Earned */}
                <div className="text-center relative z-10">
                  <p
                    style={{
                      fontSize: "12px",
                      color: colors.textSecondary,
                      marginBottom: "6px",
                      fontWeight: 500,
                    }}
                  >
                    Today's Gain
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <motion.p
                      className="font-semibold"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(76, 217, 100, 0.3)",
                          "0 0 20px rgba(76, 217, 100, 0.5)",
                          "0 0 10px rgba(76, 217, 100, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      style={{
                        fontSize: "17px",
                        color: "#4CD964",
                      }}
                    >
                      +$87.50
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* DETAILED GROWTH VIEW */
            <>
              {/* Main Balance Display - Consistent with Balance View */}
              <motion.div
                className="p-8 rounded-3xl mb-6 relative overflow-hidden"
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.04)"
                      : "rgba(0, 0, 0, 0.03)",
                  border:
                    theme === "dark"
                      ? "1.5px solid rgba(255, 255, 255, 0.1)"
                      : "1.5px solid rgba(0, 0, 0, 0.06)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  boxShadow: theme === "dark" 
                    ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    : "0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                }}
              >
                {/* Ambient Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: theme === "dark"
                      ? "radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.1) 0%, transparent 70%)"
                      : "radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.15) 0%, transparent 70%)",
                  }}
                />
                
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: [
                      "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 60%, transparent 100%)",
                      "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 60%, transparent 100%)",
                    ],
                    backgroundPosition: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
                
                <p
                  className="text-center mb-3 relative z-10"
                  style={{
                    fontSize: "14px",
                    color: colors.textSecondary,
                    fontWeight: 500,
                  }}
                >
                  Total Portfolio Value
                </p>
                <motion.h2
                  className="text-center mb-8 relative z-10"
                  animate={{
                    textShadow: theme === "dark" 
                      ? [
                          "0 0 20px rgba(255, 215, 0, 0.2)",
                          "0 0 30px rgba(255, 215, 0, 0.3)",
                          "0 0 20px rgba(255, 215, 0, 0.2)",
                        ]
                      : [
                          "0 2px 10px rgba(255, 215, 0, 0.2)",
                          "0 2px 15px rgba(255, 215, 0, 0.3)",
                          "0 2px 10px rgba(255, 215, 0, 0.2)",
                        ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    fontSize: "52px",
                    fontWeight: 700,
                    letterSpacing: "-2px",
                    fontFamily:
                      "SF Pro Rounded, -apple-system, system-ui, sans-serif",
                    color: colors.textPrimary,
                  }}
                >
                  $45,250
                </motion.h2>

                <div className="grid grid-cols-3 gap-4">
                  {/* Total Invested */}
                  <div className="text-center">
                    <p
                      style={{
                        fontSize: "12px",
                        color: colors.textSecondary,
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      Total Invested
                    </p>
                    <p
                      className="font-semibold"
                      style={{
                        fontSize: "17px",
                        color: colors.textPrimary,
                      }}
                    >
                      $43,100
                    </p>
                  </div>

                  {/* Total Profit */}
                  <div className="text-center relative z-10">
                    <p
                      style={{
                        fontSize: "12px",
                        color: colors.textSecondary,
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      Total Profit
                    </p>
                    <motion.p
                      className="font-semibold"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(76, 217, 100, 0.3)",
                          "0 0 20px rgba(76, 217, 100, 0.5)",
                          "0 0 10px rgba(76, 217, 100, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        fontSize: "17px",
                        color: "#4CD964",
                      }}
                    >
                      +$2,150
                    </motion.p>
                  </div>

                  {/* Today's Gain */}
                  <div className="text-center relative z-10">
                    <p
                      style={{
                        fontSize: "12px",
                        color: colors.textSecondary,
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      Today's Gain
                    </p>
                    <motion.p
                      className="font-semibold"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(76, 217, 100, 0.3)",
                          "0 0 20px rgba(76, 217, 100, 0.5)",
                          "0 0 10px rgba(76, 217, 100, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      style={{
                        fontSize: "17px",
                        color: "#4CD964",
                      }}
                    >
                      +$87.50
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              {/* Investment Distribution */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4 px-1">
                  <p
                    className="font-semibold"
                    style={{
                      fontSize: "17px",
                      color: colors.textPrimary,
                    }}
                  >
                    Investment Distribution
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: colors.textSecondary,
                      fontWeight: 500,
                    }}
                  >
                    Since Jan 2024
                  </p>
                </div>

                {/* Safe Plan */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-5 rounded-3xl mb-3 relative overflow-hidden"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(0, 188, 212, 0.05)"
                        : "rgba(0, 188, 212, 0.03)",
                    border:
                      theme === "dark"
                        ? "1.5px solid rgba(0, 188, 212, 0.15)"
                        : "1.5px solid rgba(0, 188, 212, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Subtle gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: "linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, transparent 100%)",
                    }}
                  />
                  
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{
                          background: "rgba(0, 188, 212, 0.2)",
                          border: "1.5px solid rgba(0, 188, 212, 0.4)",
                        }}
                      >
                        <span className="text-[18px]">🛡️</span>
                      </div>
                      <div>
                        <p
                          className="font-semibold mb-1"
                          style={{
                            fontSize: "17px",
                            color: colors.textPrimary,
                            letterSpacing: "-0.3px",
                          }}
                        >
                          Safe Plan
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            color: colors.textSecondary,
                            fontWeight: 500,
                          }}
                        >
                          Staking • 66.2% of portfolio
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className="font-semibold mb-1"
                        style={{
                          fontSize: "18px",
                          color: "#00BCD4",
                          letterSpacing: "-0.5px",
                        }}
                      >
                        +$1,350
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#00BCD4",
                          fontWeight: 600,
                        }}
                      >
                        +4.5% growth
                      </p>
                    </div>
                  </div>

                  {/* Detailed metrics grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4 relative z-10">
                    <div className="text-center p-2.5 rounded-xl" style={{
                      background: theme === "dark" 
                        ? "rgba(255, 255, 255, 0.04)" 
                        : "rgba(255, 255, 255, 0.6)",
                    }}>
                      <p style={{ fontSize: "11px", color: colors.textSecondary, marginBottom: "2px" }}>
                        Principal
                      </p>
                      <p className="font-semibold" style={{ fontSize: "15px", color: colors.textPrimary }}>
                        $30,000
                      </p>
                    </div>
                    <div className="text-center p-2.5 rounded-xl" style={{
                      background: theme === "dark" 
                        ? "rgba(255, 255, 255, 0.04)" 
                        : "rgba(255, 255, 255, 0.6)",
                    }}>
                      <p style={{ fontSize: "11px", color: colors.textSecondary, marginBottom: "2px" }}>
                        APY Rate
                      </p>
                      <p className="font-semibold" style={{ fontSize: "15px", color: "#00BCD4" }}>
                        4.5%
                      </p>
                    </div>
                    <div className="text-center p-2.5 rounded-xl" style={{
                      background: theme === "dark" 
                        ? "rgba(255, 255, 255, 0.04)" 
                        : "rgba(255, 255, 255, 0.6)",
                    }}>
                      <p style={{ fontSize: "11px", color: colors.textSecondary, marginBottom: "2px" }}>
                        Monthly Avg
                      </p>
                      <p className="font-semibold" style={{ fontSize: "15px", color: "#00BCD4" }}>
                        +$338
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1.5">
                      <p style={{ fontSize: "11px", color: colors.textSecondary, fontWeight: 500 }}>
                        Portfolio Share
                      </p>
                      <p style={{ fontSize: "11px", color: "#00BCD4", fontWeight: 600 }}>
                        66.2%
                      </p>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{
                        background:
                          theme === "dark"
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "66.2%" }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full rounded-full relative"
                        style={{
                          background: "linear-gradient(90deg, #00BCD4, #00ACC1)",
                          boxShadow: "0 0 8px rgba(0, 188, 212, 0.4)",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Aggressive Plan */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-5 rounded-3xl relative overflow-hidden"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(255, 152, 0, 0.05)"
                        : "rgba(255, 152, 0, 0.03)",
                    border:
                      theme === "dark"
                        ? "1.5px solid rgba(255, 152, 0, 0.15)"
                        : "1.5px solid rgba(255, 152, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Subtle gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, transparent 100%)",
                    }}
                  />
                  
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{
                          background: "rgba(255, 152, 0, 0.2)",
                          border: "1.5px solid rgba(255, 152, 0, 0.4)",
                        }}
                      >
                        <span className="text-[18px]">📈</span>
                      </div>
                      <div>
                        <p
                          className="font-semibold mb-1"
                          style={{
                            fontSize: "17px",
                            color: colors.textPrimary,
                            letterSpacing: "-0.3px",
                          }}
                        >
                          Aggressive Plan
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            color: colors.textSecondary,
                            fontWeight: 500,
                          }}
                        >
                          Liquidity Pool • 33.8% of portfolio
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className="font-semibold mb-1"
                        style={{
                          fontSize: "18px",
                          color: "#FF9800",
                          letterSpacing: "-0.5px",
                        }}
                      >
                        +$2,339
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#FF9800",
                          fontWeight: 600,
                        }}
                      >
                        +18.1% growth
                      </p>
                    </div>
                  </div>

                  {/* Detailed metrics grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4 relative z-10">
                    <div className="text-center p-2.5 rounded-xl" style={{
                      background: theme === "dark" 
                        ? "rgba(255, 255, 255, 0.04)" 
                        : "rgba(255, 255, 255, 0.6)",
                    }}>
                      <p style={{ fontSize: "11px", color: colors.textSecondary, marginBottom: "2px" }}>
                        Principal
                      </p>
                      <p className="font-semibold" style={{ fontSize: "15px", color: colors.textPrimary }}>
                        $12,911
                      </p>
                    </div>
                    <div className="text-center p-2.5 rounded-xl" style={{
                      background: theme === "dark" 
                        ? "rgba(255, 255, 255, 0.04)" 
                        : "rgba(255, 255, 255, 0.6)",
                    }}>
                      <p style={{ fontSize: "11px", color: colors.textSecondary, marginBottom: "2px" }}>
                        APY Rate
                      </p>
                      <p className="font-semibold" style={{ fontSize: "15px", color: "#FF9800" }}>
                        18.1%
                      </p>
                    </div>
                    <div className="text-center p-2.5 rounded-xl" style={{
                      background: theme === "dark" 
                        ? "rgba(255, 255, 255, 0.04)" 
                        : "rgba(255, 255, 255, 0.6)",
                    }}>
                      <p style={{ fontSize: "11px", color: colors.textSecondary, marginBottom: "2px" }}>
                        Monthly Avg
                      </p>
                      <p className="font-semibold" style={{ fontSize: "15px", color: "#FF9800" }}>
                        +$585
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1.5">
                      <p style={{ fontSize: "11px", color: colors.textSecondary, fontWeight: 500 }}>
                        Portfolio Share
                      </p>
                      <p style={{ fontSize: "11px", color: "#FF9800", fontWeight: 600 }}>
                        33.8%
                      </p>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{
                        background:
                          theme === "dark"
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "33.8%" }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        className="h-full rounded-full relative"
                        style={{
                          background: "linear-gradient(90deg, #FF9800, #FB8C00)",
                          boxShadow: "0 0 8px rgba(255, 152, 0, 0.4)",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Monthly Progression Chart */}
              <MonthlyProgressChart theme={theme} />
            </>
          )}
        </motion.div>

        {/* Investment Plan Section */}
        <div className="mb-8">
          <p
            className="font-semibold text-[15px] mb-4 px-1"
            style={{ color: colors.textSecondary }}
          >
            Choose Your Plan
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Safe Plan Button */}
            <motion.div
              animate={{
                boxShadow: selectedPlan === "safe" 
                  ? [
                      "0 0 20px rgba(0, 188, 212, 0.3)",
                      "0 0 40px rgba(0, 188, 212, 0.5)",
                      "0 0 20px rgba(0, 188, 212, 0.3)",
                    ]
                  : "0 0 0px rgba(0, 188, 212, 0)",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-[18px]"
            >
              <MagneticButton
                onClick={() => handlePlanClick("safe")}
                className="w-full p-4 rounded-[18px] relative transition-all duration-500"
                style={{
                  background: "rgba(0, 188, 212, 0.12)",
                  backdropFilter: "blur(40px) saturate(180%)",
                  border: "2px solid transparent",
                  backgroundImage: `
                    linear-gradient(${theme === "dark" ? "#0A0A0B" : "#FFFDF0"}, ${theme === "dark" ? "#0A0A0B" : "#FFFDF0"}),
                    linear-gradient(135deg, 
                      rgba(0, 188, 212, ${theme === "dark" ? "0.4" : "0.5"}) 0%,
                      rgba(0, 172, 193, ${theme === "dark" ? "0.6" : "0.7"}) 50%,
                      rgba(0, 188, 212, ${theme === "dark" ? "0.4" : "0.5"}) 100%)
                  `,
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow:
                    selectedPlan === "safe"
                      ? "inset 0 1px 1px rgba(255,255,255,0.15), 0 8px 40px rgba(0, 188, 212, 0.25), 0 8px 32px rgba(0,0,0,0.2)"
                      : "inset 0 1px 1px rgba(255,255,255,0.15), 0 4px 24px rgba(0, 188, 212, 0.1)",
                  height: "120px",
                  opacity:
                    selectedPlan === "aggressive" ? 0.5 : 1,
                  transform:
                    selectedPlan === "safe"
                      ? "scale(1.03)"
                      : "scale(1)",
                }}
              >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />

              {/* Info Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSafeInfo(true);
                }}
                className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-20"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Info
                  className="w-3 h-3"
                  style={{ color: "#00BCD4" }}
                />
              </button>

              <div className="flex flex-col items-center justify-center h-full text-center relative z-10">
                <div className="mb-2">
                  <span className="text-[20px]">🛡️</span>
                </div>
                <p
                  className="font-semibold mb-1"
                  style={{
                    color: colors.textPrimary,
                    fontSize: "18px",
                    fontFamily:
                      "SF Pro Display, -apple-system, system-ui, sans-serif",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Safe
                </p>
                <p
                  className="font-semibold"
                  style={{
                    color: "#00BCD4",
                    fontSize: "14px",
                  }}
                >
                  4-5% APY
                </p>
              </div>
            </MagneticButton>
            </motion.div>

            {/* Aggressive Plan Button */}
            <motion.div
              animate={{
                boxShadow: selectedPlan === "aggressive" 
                  ? [
                      "0 0 20px rgba(255, 152, 0, 0.3)",
                      "0 0 40px rgba(255, 152, 0, 0.5)",
                      "0 0 20px rgba(255, 152, 0, 0.3)",
                    ]
                  : "0 0 0px rgba(255, 152, 0, 0)",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-[18px]"
            >
              <MagneticButton
                onClick={() => handlePlanClick("aggressive")}
                className="w-full p-4 rounded-[18px] relative transition-all duration-500"
                style={{
                background: "rgba(255, 152, 0, 0.12)",
                backdropFilter: "blur(40px) saturate(180%)",
                border: "2px solid transparent",
                backgroundImage: `
                  linear-gradient(${theme === "dark" ? "#0A0A0B" : "#FFFDF0"}, ${theme === "dark" ? "#0A0A0B" : "#FFFDF0"}),
                  linear-gradient(135deg, 
                    rgba(255, 152, 0, ${theme === "dark" ? "0.4" : "0.5"}) 0%,
                    rgba(251, 140, 0, ${theme === "dark" ? "0.6" : "0.7"}) 50%,
                    rgba(255, 152, 0, ${theme === "dark" ? "0.4" : "0.5"}) 100%)
                `,
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                boxShadow:
                  selectedPlan === "aggressive"
                    ? "inset 0 1px 1px rgba(255,255,255,0.15), 0 8px 40px rgba(255, 152, 0, 0.25), 0 8px 32px rgba(0,0,0,0.2)"
                    : "inset 0 1px 1px rgba(255,255,255,0.15), 0 4px 24px rgba(255, 152, 0, 0.1)",
                height: "120px",
                opacity: selectedPlan === "safe" ? 0.5 : 1,
                transform:
                  selectedPlan === "aggressive"
                    ? "scale(1.03)"
                    : "scale(1)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />

              {/* Info Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAggressiveInfo(true);
                }}
                className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-20"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Info
                  className="w-3 h-3"
                  style={{ color: "#FF9800" }}
                />
              </button>

              <div className="flex flex-col items-center justify-center h-full text-center relative z-10">
                <div className="mb-2">
                  <span className="text-[20px]">📈</span>
                </div>
                <p
                  className="font-semibold mb-1"
                  style={{
                    color: colors.textPrimary,
                    fontSize: "18px",
                    fontFamily:
                      "SF Pro Display, -apple-system, system-ui, sans-serif",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Aggressive
                </p>
                <p
                  className="font-semibold"
                  style={{
                    color: "#FF9800",
                    fontSize: "14px",
                  }}
                >
                  10-100%+ APY
                </p>
              </div>
            </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Withdraw Button - Enhanced */}
        <motion.button
          onClick={() => setShowWithdraw(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              `0 0 0 0 rgba(255, 193, 7, 0)`,
              `0 0 0 8px rgba(255, 193, 7, 0.1)`,
              `0 0 0 0 rgba(255, 193, 7, 0)`,
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="w-full h-[64px] rounded-full flex items-center justify-center transition-all"
          style={{
            background: `linear-gradient(135deg, ${colors.accentYellow} 0%, #FBC02D 100%)`,
            color: "#1A1A1D",
            fontSize: "18px",
            fontWeight: 700,
            boxShadow:
              theme === "dark"
                ? "0 8px 32px rgba(255, 193, 7, 0.3)"
                : "0 8px 32px rgba(255, 193, 7, 0.4)",
          }}
        >
          Take Out Money
        </motion.button>

        {/* Activity History */}
        <ActivityHistory theme={theme} />
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {showWelcome && <WelcomeOverlay theme={theme} />}
        {showInvestment && selectedPlan && (
          <InvestmentOverlay
            theme={theme}
            plan={selectedPlan}
            onClose={() => {
              setShowInvestment(false);
              setSelectedPlan(null);
            }}
          />
        )}
        {showWithdraw && (
          <WithdrawOverlay
            theme={theme}
            onClose={() => setShowWithdraw(false)}
          />
        )}
        {showDetails && (
          <PortfolioDetailsSheet
            theme={theme}
            onClose={() => setShowDetails(false)}
          />
        )}
        {showSettings && (
          <SettingsOverlay
            theme={theme}
            onClose={() => setShowSettings(false)}
          />
        )}
        {showSafeInfo && (
          <PlanInfoOverlay
            theme={theme}
            plan="safe"
            onClose={() => setShowSafeInfo(false)}
          />
        )}
        {showAggressiveInfo && (
          <PlanInfoOverlay
            theme={theme}
            plan="aggressive"
            onClose={() => setShowAggressiveInfo(false)}
          />
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background:
              theme === "dark"
                ? "rgba(26, 26, 29, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(30px)",
            border: `1px solid ${colors.glassBorder}`,
            color: colors.textPrimary,
          },
        }}
      />
    </div>
  );
}