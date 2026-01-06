import React, { useState, useEffect } from 'react';
import { Menu, Search, Filter, RefreshCcw } from 'lucide-react';
import Sidebar from './components/Sidebar';
import JobCard from './components/JobCard';
import DashboardStats from './components/DashboardStats';
import ApplicationTracker from './components/ApplicationTracker';
import { MOCK_JOBS } from './constants';
import { Job } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed'); // dashboard, feed, safety, applications
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle updates from JobCard (e.g., after AI analysis)
  const updateJob = (updatedJob: Job) => {
    setJobs(prevJobs => prevJobs.map(j => j.id === updatedJob.id ? updatedJob : j));
  };

  // Filter jobs based on search
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tab Content Renderer
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <DashboardStats jobs={jobs} />
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
              <ApplicationTracker jobs={jobs} />
            </div>
          </>
        );
      case 'safety':
        const riskyJobs = jobs.filter(j => j.aiAnalysis.fraudScore > 20 || (j.aiAnalysis.isAnalyzed && j.aiAnalysis.fraudScore > 50));
        return (
          <div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-red-700 mb-2">Safety Alert Feed</h2>
              <p className="text-red-600/80">
                The AI has flagged the following listings as potentially fraudulent or suspicious. 
                Common signs include requests for upfront payment, generic email addresses, or unrealistic salaries.
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {riskyJobs.map(job => (
                <JobCard key={job.id} job={job} onUpdateJob={updateJob} />
              ))}
              {riskyJobs.length === 0 && (
                <p className="text-slate-500 italic">No risky jobs detected yet. Run analysis on feed items.</p>
              )}
            </div>
          </div>
        );
      case 'applications':
        return <ApplicationTracker jobs={jobs} />;
      case 'feed':
      default:
        // Filter out highly fraudulent jobs from the main feed for safety, unless user wants to see them
        const safeFeed = filteredJobs.filter(j => j.aiAnalysis.fraudScore < 80);
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {safeFeed.map(job => (
              <JobCard key={job.id} job={job} onUpdateJob={updateJob} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-surface/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 capitalize hidden sm:block">
              {activeTab === 'feed' ? 'Live Job Feed' : activeTab.replace(/([A-Z])/g, ' $1').trim()}
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
             {/* Search Bar */}
             <div className="relative hidden md:block w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search jobs, companies, or keywords..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
             </div>
             
             {/* Action Buttons */}
             <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl relative">
                <Filter size={20} />
             </button>
             <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl" onClick={() => window.location.reload()}>
                <RefreshCcw size={20} />
             </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 no-scrollbar">
          <div className="max-w-7xl mx-auto">
             {/* Mobile Search (visible only on small screens) */}
             <div className="mb-6 md:hidden relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>

             {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;