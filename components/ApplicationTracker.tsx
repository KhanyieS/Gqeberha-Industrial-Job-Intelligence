import React from 'react';
import { Job, JobStatus } from '../types';
import { MoreHorizontal, Calendar } from 'lucide-react';

interface ApplicationTrackerProps {
  jobs: Job[];
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ jobs }) => {
  // Filter for jobs that have a status (implying interaction)
  const trackedJobs = jobs.filter(j => j.status !== undefined && j.status !== JobStatus.NEW);

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.APPLIED: return 'bg-blue-100 text-blue-700';
      case JobStatus.INTERVIEW: return 'bg-purple-100 text-purple-700';
      case JobStatus.OFFER: return 'bg-green-100 text-green-700';
      case JobStatus.REJECTED: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Application Tracker</h2>
        <button className="text-sm font-medium text-primary hover:text-indigo-700">View All History</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
              <th className="px-6 py-4">Role & Company</th>
              <th className="px-6 py-4">Date Applied</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Platform</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {trackedJobs.map(job => (
              <tr key={job.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-bold text-slate-800">{job.title}</div>
                    <div className="text-xs text-secondary">{job.company}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={14} className="text-slate-400" />
                    {job.appliedDate || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(job.status || JobStatus.NEW)}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">{job.source}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {trackedJobs.length === 0 && (
          <div className="p-12 text-center text-secondary">
            No active applications tracked yet. Apply to jobs in the feed!
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTracker;