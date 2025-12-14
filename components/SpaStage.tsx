import React, { useState } from 'react';
import { MakeoverState } from '../types';
import AvatarCanvas from './AvatarCanvas';
import { Droplets, Sparkles, Eraser, SprayCan } from 'lucide-react';

interface Props {
  state: MakeoverState;
  updateState: (partial: Partial<MakeoverState['spa']>) => void;
  onComplete: () => void;
}

const SpaStage: React.FC<Props> = ({ state, updateState, onComplete }) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [message, setMessage] = useState("Let's clean up her face!");

  const tools = [
    { id: 'soap', name: 'Scrub', icon: <Eraser className="w-6 h-6" />, action: () => {
        updateState({ clean: true });
        setMessage("All clean! Now apply the soothing mask.");
    }},
    { id: 'mask', name: 'Apply Mask', icon: <SprayCan className="w-6 h-6" />, disabled: !state.spa.clean, action: () => {
        updateState({ maskApplied: true });
        setMessage("Let it sit... now rinse it off!");
    }},
    { id: 'rinse', name: 'Rinse', icon: <Droplets className="w-6 h-6" />, disabled: !state.spa.maskApplied, action: () => {
        updateState({ maskRinsed: true });
        setMessage("Fresh as a daisy! Ready for makeup.");
    }},
  ];

  const allDone = state.spa.clean && state.spa.maskApplied && state.spa.maskRinsed;

  return (
    <div className="flex flex-col md:flex-row h-full max-w-6xl mx-auto gap-8 p-4">
      
      {/* Tools Sidebar */}
      <div className="w-full md:w-1/4 bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-4">
        <h3 className="text-2xl font-script text-pink-600 mb-4 text-center">Spa Salon</h3>
        
        <div className="flex flex-col gap-3">
          {tools.map((tool) => (
            <button
              key={tool.id}
              disabled={tool.disabled || (tool.id === 'soap' && state.spa.clean) || (tool.id === 'mask' && state.spa.maskApplied) || (tool.id === 'rinse' && state.spa.maskRinsed)}
              onClick={() => {
                  setActiveTool(tool.id);
                  tool.action();
              }}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                activeTool === tool.id ? 'bg-pink-100 border-pink-500 border-2' : 'bg-slate-50 border border-slate-200 hover:bg-pink-50'
              } ${tool.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="bg-white p-2 rounded-full text-pink-500 shadow-sm">
                {tool.icon}
              </div>
              <span className="font-semibold text-slate-700">{tool.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto bg-pink-50 p-4 rounded-xl border border-pink-100">
           <p className="text-pink-800 text-sm text-center italic">Tip: {message}</p>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-inner flex flex-col items-center justify-center relative p-8">
        <div className="absolute top-4 right-4 animate-pulse">
            <Sparkles className="text-yellow-400 w-8 h-8" />
        </div>
        
        <AvatarCanvas state={state} className="w-64 h-80 md:w-80 md:h-96" zoom={true} />

        {allDone && (
            <button 
                onClick={onComplete}
                className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform animate-bounce"
            >
                Next Level: Makeup &rarr;
            </button>
        )}
      </div>

    </div>
  );
};

export default SpaStage;
