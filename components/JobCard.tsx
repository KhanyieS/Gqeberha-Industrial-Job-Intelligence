import React, { useState } from 'react';
import { Job, JobCategory } from '../types';
import { MapPin, Clock, Building2, AlertTriangle, CheckCircle, Sparkles, BrainCircuit, ShieldAlert } from 'lucide-react';
import { analyzeJobWithGemini } from '../services/geminiService';

interface JobCardProps {
  job: Job;
  onUpdateJob: (updatedJob: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onUpdateJob }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const isFraud = job.aiAnalysis.isAnalyzed && job.aiAnalysis.fraudScore > 50;
  const isHighMatch = job.aiAnalysis.isAnalyzed && job.aiAnalysis.matchScore >= 75;

  return (
    <div className={`
      relative bg-white rounded-2xl p-6 transition-all duration-300 border
      ${isFraud ? 'border-danger/30 shadow-danger/5' : 'border-transparent hover:border-slate-200'}
      shadow-sm hover:shadow-lg
    `}>
      {/* Category Badge */}
      <div className="absolute top-6 right-6 flex gap-2">
        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider">
          {job.category}
        </span>
        {isFraud && (
          <span className="px-3 py-1 bg-danger/10 text-danger text-xs font-bold rounded-full flex items-center gap-1">
            <AlertTriangle size={12} /> FRAUD RISK
          </span>
        )}
      </div>

      {/* Header */}
      <div className="mb-4 pr-24">
        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-1">{job.title}</h3>
        <div className="flex items-center text-sm text-secondary gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <Building2 size={16} className="text-primary" />
            {job.company}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-secondary" />
            {job.location}
          </div>
        </div>
      </div>

      {/* AI Score Section */}
      <div className="mb-5 flex items-center gap-4">
        {!job.aiAnalysis.isAnalyzed ? (
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
          >
            {isAnalyzing ? (
              <span className="animate-pulse">Analyzing...</span>
            ) : (
              <>
                <Sparkles size={14} /> Run AI Analysis
              </>
            )}
          </button>
        ) : (
          <div className="flex gap-4 w-full">
            {/* Match Score */}
            <div className={`flex-1 p-3 rounded-xl border ${isHighMatch ? 'bg-success/5 border-success/20' : 'bg-slate-50 border-slate-100'}`}>
              <div className="text-xs text-secondary mb-1 flex items-center gap-1">
                 <BrainCircuit size={12}/> CV Match
              </div>
              <div className={`text-lg font-bold ${isHighMatch ? 'text-success' : 'text-slate-700'}`}>
                {job.aiAnalysis.matchScore}%
              </div>
            </div>
            
            {/* Fraud Score */}
            <div className={`flex-1 p-3 rounded-xl border ${job.aiAnalysis.fraudScore > 20 ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
               <div className="text-xs text-secondary mb-1 flex items-center gap-1">
                 <ShieldAlert size={12}/> Risk Score
              </div>
              <div className={`text-lg font-bold ${job.aiAnalysis.fraudScore > 20 ? 'text-orange-600' : 'text-green-600'}`}>
                {job.aiAnalysis.fraudScore}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Description Snippet */}
      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* AI Reasoning */}
      {job.aiAnalysis.isAnalyzed && job.aiAnalysis.reasoning && (
        <div className="mb-5 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100 italic">
          "{job.aiAnalysis.reasoning}"
        </div>
      )}

      {/* Footer / Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-secondary font-medium">
          <Clock size={14} />
          Posted {job.postedDate}
        </div>
        <div className="flex gap-3">
          <a href="#" className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Details
          </a>
          {!isFraud && (
            <button className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/30 hover:bg-indigo-700 transition-colors">
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;