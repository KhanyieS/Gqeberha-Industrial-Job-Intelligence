import React from 'react';
import { Job, JobStatus } from '../types';
import { MoreHorizontal, Calendar, Briefcase } from 'lucide-react';

interface ApplicationTrackerProps {
  jobs: Job[];
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ jobs }) => {
  const trackedJobs = jobs.filter(j => j.status !== undefined && j.status !== JobStatus.NEW);

  const getStatusStyle = (status: JobStatus) => {
    switch (status) {
      case JobStatus.APPLIED: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case JobStatus.INTERVIEW: return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case JobStatus.OFFER: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case JobStatus.REJECTED: return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-700 text-gray-400 border-gray-600';
    }
  };

  return (
    <div className="bg-charcoal rounded-3xl shadow-xl border border-gray-800 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
             <Briefcase className="text-amber" size={18}/>
             <h2 className="text-sm font-bold text-white uppercase tracking-wider">Active Applications</h2>
        </div>
        <button className="text-xs font-bold text-textGray hover:text-white">View All</button>
      </div>
      
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <tbody className="divide-y divide-gray-800">
            {trackedJobs.map(job => (
              <tr key={job.id} className="hover:bg-charcoalLight transition-colors group">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-bold text-white text-sm">{job.title}</div>
                    <div className="text-xs text-textGray">{job.company}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getStatusStyle(job.status || JobStatus.NEW)}`}>
                    {job.status}
                  </span>
                  <div className="text-[10px] text-gray-500 mt-1">{job.appliedDate}</div>
                </td>
              </tr>
            ))}
             {trackedJobs.length === 0 && (
                <tr>
                    <td colSpan={2} className="p-8 text-center text-gray-500 text-xs">
                        No active applications. Start applying!
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTracker;