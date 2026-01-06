import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Job, JobStatus } from '../types';

interface DashboardStatsProps {
  jobs: Job[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ jobs }) => {
  const totalJobs = jobs.length;
  const appliedJobs = jobs.filter(j => j.status === JobStatus.APPLIED || j.status === JobStatus.INTERVIEW).length;
  const flaggedJobs = jobs.filter(j => j.aiAnalysis.fraudScore > 50).length;
  const highMatchJobs = jobs.filter(j => j.aiAnalysis.matchScore > 70).length;

  const data = [
    { name: 'Found', value: totalJobs, color: '#64748B' },
    { name: 'Applied', value: appliedJobs, color: '#4F46E5' },
    { name: 'Matches', value: highMatchJobs, color: '#10B981' },
    { name: 'Risky', value: flaggedJobs, color: '#EF4444' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Metric Cards */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-secondary text-sm font-medium mb-2">Total Jobs Scanned</p>
        <div className="flex items-end gap-2">
          <h2 className="text-4xl font-bold text-slate-800">{totalJobs}</h2>
          <span className="text-success text-sm font-semibold mb-1.5">+12%</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-secondary text-sm font-medium mb-2">Applications Sent</p>
        <div className="flex items-end gap-2">
          <h2 className="text-4xl font-bold text-primary">{appliedJobs}</h2>
          <span className="text-secondary text-sm font-semibold mb-1.5">Last 7 days</span>
        </div>
      </div>

       {/* Chart Card (Spans 2 columns on lg) */}
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-slate-800 font-bold">Activity Overview</h3>
             <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">This Week</span>
          </div>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: 'transparent'}}
                />
                <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
       </div>
    </div>
  );
};

export default DashboardStats;