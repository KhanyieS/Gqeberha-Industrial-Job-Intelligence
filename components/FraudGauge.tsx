import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ShieldAlert } from 'lucide-react';

interface FraudGaugeProps {
  score: number; // 0-100 fraud score
}

const FraudGauge: React.FC<FraudGaugeProps> = ({ score }) => {
  const safeScore = 100 - score;
  const data = [
    { name: 'Safe', value: safeScore },
    { name: 'Risk', value: score },
  ];
  const COLORS = ['#10B981', '#EF4444'];

  return (
    <div className="bg-charcoal rounded-3xl p-6 border border-gray-800 shadow-xl mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-amber/10 rounded-lg text-amber">
            <ShieldAlert size={18} />
        </div>
        <h3 className="text-white font-bold text-sm">Job-Track Senticity</h3>
      </div>
      
      <div className="relative h-48 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={180}
              endAngle={0}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-0 text-center">
            <div className="text-3xl font-black text-white">{safeScore}%</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest">Safety Score</div>
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-[-20px]">
         <span>0% Safe</span>
         <span>100% Safe</span>
      </div>
      
      <div className="mt-4 p-3 bg-charcoalLight rounded-xl">
        <p className="text-xs text-gray-400 text-center">
            {score > 50 ? 'High fraud activity detected in Gqeberha today.' : 'Job feed looks clean today.'}
        </p>
      </div>
    </div>
  );
};

export default FraudGauge;