import React, { useState } from 'react';
import { Menu, Search, Filter, RefreshCcw, ToggleLeft, ToggleRight } from 'lucide-react';
import Sidebar from './components/Sidebar';
import JobCard from './components/JobCard';
import ApplicationTracker from './components/ApplicationTracker';
import FraudGauge from './components/FraudGauge';
import CVStudio from './components/CVStudio';
import { MOCK_JOBS } from './constants';
import { Job } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOtherJobs, setShowOtherJobs] = useState(false);

  const updateJob = (updatedJob: Job) => {
    setJobs(prevJobs => prevJobs.map(j => j.id === updatedJob.id ? updatedJob : j));
  };

  const filteredJobs = jobs.filter(job => 
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (showOtherJobs ? true : job.category !== 'Management') // Simple toggle logic for demo
  );

  return (
    <div className="flex h-screen bg-cream font-sans text-charcoal overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-cream border-b border-gray-200 flex items-center justify-between px-4">
           <div className="flex items-center gap-2">
             <button onClick={() => setIsMobileMenuOpen(true)}><Menu/></button>
             <span className="font-bold">Crextio.PE</span>
           </div>
        </div>

        {/* Main Grid Layout */}
        <div className="flex-1 p-4 lg:p-8 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Center Column: Feed or Studio (Span 8) */}
            <div className="lg:col-span-8 flex flex-col h-full overflow-hidden">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h2 className="text-3xl font-black text-charcoal tracking-tight">
                            {activeTab === 'cv-studio' ? 'CV Studio' : 'Job Feed'}
                        </h2>
                        <p className="text-textGray text-sm">Welcome back, Khanyisile</p>
                    </div>
                    
                    {/* Search & Toggle (Only on Feed) */}
                    {activeTab === 'feed' && (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 cursor-pointer" onClick={() => setShowOtherJobs(!showOtherJobs)}>
                                {showOtherJobs ? <ToggleRight size={24} className="text-amber"/> : <ToggleLeft size={24}/>}
                                <span>All Jobs</span>
                            </div>
                            <div className="relative hidden md:block w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search keywords..." 
                                    className="w-full pl-9 pr-4 py-2 bg-white rounded-xl text-sm border border-gray-200 focus:outline-none focus:border-amber"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
                    {activeTab === 'feed' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                            {filteredJobs.map(job => (
                                <JobCard key={job.id} job={job} onUpdateJob={updateJob} />
                            ))}
                        </div>
                    )}
                    {activeTab === 'cv-studio' && <CVStudio />}
                    {activeTab === 'safety' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {jobs.filter(j => j.aiAnalysis.fraudScore > 20).map(job => (
                                <JobCard key={job.id} job={job} onUpdateJob={updateJob} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Rail: Stats & Tracking (Span 4) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col h-full gap-6 overflow-hidden">
                <FraudGauge score={jobs.reduce((acc, curr) => acc + (curr.aiAnalysis.fraudScore > 50 ? 10 : 0), 20)} />
                <ApplicationTracker jobs={jobs} />
                
                {/* Mini Promo Card */}
                <div className="bg-amber rounded-3xl p-6 text-charcoal mt-auto">
                    <h4 className="font-bold text-lg mb-2">Pro Tip</h4>
                    <p className="text-sm opacity-80 mb-4">
                        Use the "CV Studio" to tailor your resume for VWSA before applying.
                    </p>
                    <button className="px-4 py-2 bg-charcoal text-white text-xs font-bold rounded-lg" onClick={() => setActiveTab('cv-studio')}>
                        Go to Studio
                    </button>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default App;