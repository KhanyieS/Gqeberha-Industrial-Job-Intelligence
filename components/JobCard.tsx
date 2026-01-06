import React, { useState } from 'react';
import { Job, JobCategory } from '../types';
import { MapPin, Clock, Building2, AlertTriangle, Sparkles, BrainCircuit, ShieldAlert, FileText, ChevronRight } from 'lucide-react';
import { analyzeJobWithGemini, generateCoverLetter } from '../services/geminiService';
import { USER_PROFILE_CV } from '../constants';

interface JobCardProps {
  job: Job;
  onUpdateJob: (updatedJob: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onUpdateJob }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingCL, setIsGeneratingCL] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeJobWithGemini(job.description, job.title);
      onUpdateJob({
        ...job,
        aiAnalysis: {
          ...analysis,
          isAnalyzed: true
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (job.generatedCoverLetter) {
        setShowCoverLetter(!showCoverLetter);
        return;
    }
    
    setIsGeneratingCL(true);
    try {
      const letter = await generateCoverLetter(job.title, job.company, job.description, USER_PROFILE_CV);
      onUpdateJob({
        ...job,
        generatedCoverLetter: letter
      });
      setShowCoverLetter(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingCL(false);
    }
  };

  const isFraud = job.aiAnalysis.isAnalyzed && job.aiAnalysis.fraudScore > 50;
  const isHighMatch = job.aiAnalysis.isAnalyzed && job.aiAnalysis.matchScore >= 75;

  return (
    <div className={`
      relative bg-charcoal rounded-3xl p-6 transition-all duration-300 border
      ${isFraud ? 'border-danger/50 shadow-danger/10' : 'border-gray-800 hover:border-amber/50'}
      shadow-xl hover:shadow-2xl text-textLight flex flex-col h-full
    `}>
      {/* Category Badge */}
      <div className="absolute top-6 right-6 flex gap-2">
        <span className="px-3 py-1 bg-charcoalLight text-textGray text-[10px] font-bold rounded-full uppercase tracking-wider border border-gray-700">
          {job.category}
        </span>
        {isFraud && (
          <span className="px-3 py-1 bg-danger text-white text-[10px] font-bold rounded-full flex items-center gap-1">
            <AlertTriangle size={10} /> RISK
          </span>
        )}
      </div>

      {/* Header */}
      <div className="mb-6 pr-24">
        <h3 className="text-xl font-bold text-white leading-tight mb-2">{job.title}</h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-textGray font-medium">
            <Building2 size={14} className="text-amber" />
            {job.company}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin size={12} />
            {job.location}
          </div>
        </div>
      </div>

      {/* AI Metrics Row */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Match Score */}
        <div className={`p-3 rounded-2xl bg-charcoalLight border border-gray-700 flex flex-col justify-center items-center relative overflow-hidden`}>
           {isHighMatch && <div className="absolute top-0 left-0 w-full h-1 bg-success"></div>}
           <div className="text-[10px] text-textGray uppercase tracking-wider mb-1 flex items-center gap-1">Match</div>
           <div className={`text-2xl font-bold ${isHighMatch ? 'text-success' : 'text-white'}`}>
              {job.aiAnalysis.isAnalyzed ? `${job.aiAnalysis.matchScore}%` : '-'}
           </div>
        </div>
        
        {/* Fraud Gauge */}
        <div className={`p-3 rounded-2xl bg-charcoalLight border border-gray-700 flex flex-col justify-center items-center relative overflow-hidden`}>
           <div className={`absolute top-0 left-0 w-full h-1 ${job.aiAnalysis.fraudScore > 20 ? 'bg-danger' : 'bg-success'}`}></div>
           <div className="text-[10px] text-textGray uppercase tracking-wider mb-1 flex items-center gap-1">Safe?</div>
           <div className={`text-2xl font-bold ${job.aiAnalysis.fraudScore > 20 ? 'text-danger' : 'text-success'}`}>
              {job.aiAnalysis.isAnalyzed ? `${100 - job.aiAnalysis.fraudScore}%` : '-'}
           </div>
        </div>
      </div>

      {/* Actions / Analysis Button */}
      {!job.aiAnalysis.isAnalyzed && (
         <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full mb-6 py-3 rounded-xl border border-dashed border-gray-600 text-gray-400 hover:text-amber hover:border-amber hover:bg-amber/5 transition-all text-sm font-medium flex items-center justify-center gap-2"
          >
            {isAnalyzing ? <span className="animate-pulse">Analyzing...</span> : <><BrainCircuit size={16}/> Analyze with Gemini</>}
          </button>
      )}

      {/* Description */}
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {job.description}
        </p>
        
        {/* AI Insight Bubble */}
        {job.aiAnalysis.isAnalyzed && (
            <div className="mb-4 p-3 bg-amber/10 border border-amber/20 rounded-xl text-xs text-amber italic">
            "{job.aiAnalysis.reasoning}"
            </div>
        )}
        
        {/* Cover Letter Section */}
        {showCoverLetter && job.generatedCoverLetter && (
            <div className="mb-4 p-4 bg-gray-800 rounded-xl border border-gray-700 animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-white uppercase">Tailored Cover Letter</h4>
                    <button onClick={() => navigator.clipboard.writeText(job.generatedCoverLetter!)} className="text-[10px] text-amber hover:underline">Copy</button>
                </div>
                <div className="text-xs text-gray-300 max-h-40 overflow-y-auto whitespace-pre-wrap font-mono p-2 bg-black/30 rounded">
                    {job.generatedCoverLetter}
                </div>
            </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
         <div className="grid grid-cols-2 gap-3">
             <button 
                onClick={handleGenerateCoverLetter}
                className="py-3 rounded-xl bg-charcoalLight text-white text-xs font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                disabled={isGeneratingCL}
             >
                {isGeneratingCL ? 'Writing...' : <><FileText size={14}/> {showCoverLetter ? 'Hide Letter' : 'Cover Letter'}</>}
             </button>
             <a 
                href={job.link} 
                target="_blank" 
                rel="noreferrer"
                className={`py-3 rounded-xl text-charcoal text-xs font-bold transition-transform active:scale-95 flex items-center justify-center gap-2 ${isFraud ? 'bg-gray-500 cursor-not-allowed opacity-50' : 'bg-amber hover:bg-amberDark shadow-lg shadow-amber/20'}`}
                onClick={(e) => isFraud && e.preventDefault()}
             >
                Apply Direct <ChevronRight size={14} />
             </a>
         </div>
         <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600">
            <Clock size={10} /> Posted {job.postedDate} • Direct Link
         </div>
      </div>
    </div>
  );
};

export default JobCard;