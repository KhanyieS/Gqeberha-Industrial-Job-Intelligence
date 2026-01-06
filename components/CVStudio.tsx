import React, { useState } from 'react';
import { USER_PROFILE_CV } from '../constants';
import { optimizeCV } from '../services/geminiService';
import { FileText, Upload, Sparkles, RefreshCcw, CheckCircle } from 'lucide-react';

const CVStudio: React.FC = () => {
  const [cvText, setCvText] = useState(USER_PROFILE_CV);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedHTML, setOptimizedHTML] = useState<string | null>(null);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    const result = await optimizeCV(cvText);
    setOptimizedHTML(result);
    setIsOptimizing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Editor / Upload Side */}
        <div className="bg-charcoal rounded-3xl p-6 border border-gray-800 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="text-amber"/> Current CV
                </h2>
                <div className="flex gap-2">
                     <button className="px-3 py-1.5 rounded-lg bg-charcoalLight border border-gray-700 text-textGray text-xs hover:text-white flex items-center gap-1">
                        <Upload size={12}/> Upload PDF
                     </button>
                </div>
            </div>
            
            <textarea 
                className="flex-1 bg-charcoalLight rounded-xl p-4 text-sm text-gray-300 font-mono focus:outline-none focus:ring-1 focus:ring-amber resize-none mb-4 custom-scrollbar"
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
            />
            
            <button 
                onClick={handleOptimize}
                disabled={isOptimizing}
                className="w-full py-4 rounded-xl bg-amber hover:bg-amberDark text-charcoal font-bold shadow-lg shadow-amber/20 transition-all flex items-center justify-center gap-2"
            >
                {isOptimizing ? <span className="animate-pulse">Optimizing with Gemini...</span> : <><Sparkles size={18}/> Reformat for Industrial Roles</>}
            </button>
        </div>

        {/* Preview Side */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl overflow-y-auto relative">
            <div className="absolute top-0 right-0 p-4 bg-amber text-charcoal text-xs font-bold rounded-bl-2xl">
                PREVIEW
            </div>
            {optimizedHTML ? (
                <div className="prose prose-sm max-w-none text-charcoal" dangerouslySetInnerHTML={{ __html: optimizedHTML }} />
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <RefreshCcw size={48} className="mb-4 opacity-20"/>
                    <p>Click "Reformat" to generate a clean version</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default CVStudio;