import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'motion/react';

interface MonthlyProgressChartProps {
  theme: 'light' | 'dark';
}

const data = [
  { month: 'Oct', safe: 28000, aggressive: 10500, total: 38500 },
  { month: 'Nov', safe: 28450, aggressive: 11200, total: 39650 },
  { month: 'Dec', safe: 28900, aggressive: 12100, total: 41000 },
  { month: 'Jan', safe: 29350, aggressive: 13000, total: 42350 },
  { month: 'Feb', safe: 29700, aggressive: 13950, total: 43650 },
  { month: 'Mar', safe: 30000, aggressive: 15250, total: 45250 },
];

const CustomTooltip = ({ active, payload, theme }: any) => {
  if (active && payload && payload.length) {
    const colors = theme === 'dark' ? {
      background: 'rgba(30, 30, 35, 0.95)',
      border: 'rgba(255, 255, 255, 0.15)',
      textPrimary: '#FFFFFF',
    } : {
      background: 'rgba(255, 255, 255, 0.95)',
      border: 'rgba(0, 0, 0, 0.1)',
      textPrimary: '#1A1A1D',
    };

    return (
      <div 
        className="p-3 rounded-xl backdrop-blur-xl"
        style={{
          background: colors.background,
          border: `1.5px solid ${colors.border}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        <p className="font-semibold mb-2" style={{ fontSize: '13px', color: colors.textPrimary }}>
          {payload[0].payload.month}
        </p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center justify-between gap-3 mb-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ background: entry.color }}
              />
              <span style={{ fontSize: '12px', color: colors.textPrimary }}>
                {entry.name === 'safe' ? 'Safe' : entry.name === 'aggressive' ? 'Aggressive' : 'Total'}:
              </span>
            </div>
            <span className="font-semibold" style={{ fontSize: '13px', color: entry.color }}>
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MonthlyProgressChart({ theme }: MonthlyProgressChartProps) {
  const colors = theme === 'dark' ? {
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.5)',
    gridColor: 'rgba(255, 255, 255, 0.06)',
  } : {
    textPrimary: '#1A1A1D',
    textSecondary: 'rgba(26, 26, 29, 0.5)',
    gridColor: 'rgba(0, 0, 0, 0.05)',
  };

  // Calculate growth stats
  const firstTotal = data[0].total;
  const lastTotal = data[data.length - 1].total;
  const totalGrowth = ((lastTotal - firstTotal) / firstTotal * 100).toFixed(1);
  const totalGrowthAmount = lastTotal - firstTotal;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="p-6 rounded-3xl"
      style={{
        background: theme === 'dark' 
          ? 'rgba(255, 255, 255, 0.04)' 
          : 'rgba(0, 0, 0, 0.03)',
        border: theme === 'dark'
          ? '1.5px solid rgba(255, 255, 255, 0.1)'
          : '1.5px solid rgba(0, 0, 0, 0.06)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <p 
            className="font-semibold mb-1"
            style={{ 
              fontSize: '17px',
              color: colors.textPrimary,
              letterSpacing: '-0.3px',
            }}
          >
            Monthly Progression
          </p>
          <p style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>
            Last 6 months performance
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold" style={{ fontSize: '16px', color: '#4CD964' }}>
            +{totalGrowth}%
          </p>
          <p style={{ fontSize: '12px', color: colors.textSecondary }}>
            +${totalGrowthAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center gap-5 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00BCD4]" style={{ boxShadow: '0 0 8px rgba(0, 188, 212, 0.5)' }} />
          <span style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>
            Safe Plan
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF9800]" style={{ boxShadow: '0 0 8px rgba(255, 152, 0, 0.5)' }} />
          <span style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>
            Aggressive Plan
          </span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={colors.gridColor}
            vertical={false}
          />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: colors.textSecondary, fontSize: 12, fontWeight: 500 }}
            dy={8}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: colors.textSecondary, fontSize: 11 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            width={45}
          />
          <Tooltip content={<CustomTooltip theme={theme} />} />
          <Line 
            type="monotone" 
            dataKey="safe" 
            stroke="#00BCD4" 
            strokeWidth={3}
            dot={{ fill: '#00BCD4', strokeWidth: 2, r: 4, stroke: theme === 'dark' ? '#0A0A0B' : '#FFFDF0' }}
            activeDot={{ r: 6, strokeWidth: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="aggressive" 
            stroke="#FF9800" 
            strokeWidth={3}
            dot={{ fill: '#FF9800', strokeWidth: 2, r: 4, stroke: theme === 'dark' ? '#0A0A0B' : '#FFFDF0' }}
            activeDot={{ r: 6, strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Key Insights */}
      <div className="grid grid-cols-3 gap-3 mt-5 pt-5" style={{
        borderTop: theme === 'dark' 
          ? '1px solid rgba(255, 255, 255, 0.08)' 
          : '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <div className="text-center">
          <p style={{ fontSize: '11px', color: colors.textSecondary, marginBottom: '4px' }}>
            Best Month
          </p>
          <p className="font-semibold" style={{ fontSize: '14px', color: '#4CD964' }}>
            Mar +$2,250
          </p>
        </div>
        <div className="text-center">
          <p style={{ fontSize: '11px', color: colors.textSecondary, marginBottom: '4px' }}>
            Avg Growth
          </p>
          <p className="font-semibold" style={{ fontSize: '14px', color: colors.textPrimary }}>
            +$1,350/mo
          </p>
        </div>
        <div className="text-center">
          <p style={{ fontSize: '11px', color: colors.textSecondary, marginBottom: '4px' }}>
            Consistency
          </p>
          <p className="font-semibold" style={{ fontSize: '14px', color: '#4CD964' }}>
            100%
          </p>
        </div>
      </div>
    </motion.div>
  );
}
