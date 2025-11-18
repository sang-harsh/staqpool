import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react';

interface ActivityHistoryProps {
  theme: 'light' | 'dark';
}

interface Activity {
  id: string;
  type: 'invest' | 'withdraw' | 'return';
  plan?: 'stable' | 'growth';
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'return',
    plan: 'growth',
    amount: 1250.00,
    date: '2 days ago',
    status: 'completed'
  },
  {
    id: '2',
    type: 'invest',
    plan: 'stable',
    amount: 5000.00,
    date: '5 days ago',
    status: 'completed'
  },
  {
    id: '3',
    type: 'withdraw',
    amount: 2000.00,
    date: '1 week ago',
    status: 'completed'
  },
  {
    id: '4',
    type: 'return',
    plan: 'stable',
    amount: 225.50,
    date: '1 week ago',
    status: 'completed'
  },
  {
    id: '5',
    type: 'invest',
    plan: 'growth',
    amount: 10000.00,
    date: '2 weeks ago',
    status: 'completed'
  }
];

export default function ActivityHistory({ theme }: ActivityHistoryProps) {
  const colors = theme === 'dark' ? {
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    background: 'rgba(255, 255, 255, 0.03)',
    border: 'rgba(255, 255, 255, 0.08)',
  } : {
    textPrimary: '#1A1A1D',
    textSecondary: 'rgba(26, 26, 29, 0.6)',
    background: 'rgba(0, 0, 0, 0.02)',
    border: 'rgba(0, 0, 0, 0.06)',
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'invest':
        return <ArrowDownLeft className="w-4 h-4" style={{ color: '#FFB300' }} />;
      case 'withdraw':
        return <ArrowUpRight className="w-4 h-4" style={{ color: '#FFB300' }} />;
      case 'return':
        return <TrendingUp className="w-4 h-4" style={{ color: '#4CD964' }} />;
      default:
        return null;
    }
  };

  const getActivityLabel = (activity: Activity) => {
    switch (activity.type) {
      case 'invest':
        return `Invested in ${activity.plan === 'stable' ? 'Safe' : 'Aggressive'} Plan`;
      case 'withdraw':
        return 'Withdrew funds';
      case 'return':
        return `Returns from ${activity.plan === 'stable' ? 'Safe' : 'Aggressive'} Plan`;
      default:
        return 'Activity';
    }
  };

  return (
    <div className="mt-6">
      <h3 
        className="text-[15px] font-semibold mb-3 px-1"
        style={{ color: colors.textSecondary }}
      >
        Recent Activity
      </h3>

      <div className="space-y-2">
        {mockActivities.slice(0, 5).map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-[14px] p-3"
            style={{
              background: colors.background,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: activity.type === 'return' 
                      ? 'rgba(76, 217, 100, 0.15)' 
                      : 'rgba(255, 179, 0, 0.15)'
                  }}
                >
                  {getActivityIcon(activity.type)}
                </div>
                
                <div>
                  <p 
                    className="text-[13px] font-medium"
                    style={{ color: colors.textPrimary }}
                  >
                    {getActivityLabel(activity)}
                  </p>
                  <p 
                    className="text-[11px]"
                    style={{ color: colors.textSecondary }}
                  >
                    {activity.date}
                  </p>
                </div>
              </div>

              <p 
                className="text-[15px] font-semibold"
                style={{ 
                  color: activity.type === 'withdraw' ? '#FF3B30' : 
                         activity.type === 'return' ? '#4CD964' : '#FFB300'
                }}
              >
                {activity.type === 'withdraw' ? '-' : '+'}${activity.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
