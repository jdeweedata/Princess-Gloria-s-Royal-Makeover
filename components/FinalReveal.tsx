import React, { useEffect, useState } from 'react';
import { MakeoverState } from '../types';
import AvatarCanvas from './AvatarCanvas';
import { generateRoyalFeedback } from '../services/geminiService';
import { Share2, RefreshCw, Star } from 'lucide-react';

interface Props {
  state: MakeoverState;
  onRestart: () => void;
}

const FinalReveal: React.FC<Props> = ({ state, onRestart }) => {
  const [feedback, setFeedback] = useState<string>("Consulting the Royal Advisor...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (state.character) {
      generateRoyalFeedback(state.character, state).then(text => {
        if (isMounted) {
            setFeedback(text);
            setLoading(false);
        }
      });
    }
    return () => { isMounted = false; };
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-10">
      
      {/* Celebration Header */}
      <div className="text-center mb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            <Star className="absolute -top-10 -left-10 text-yellow-400 w-12 h-12 animate-bounce" style={{animationDelay: '0.1s'}} />
            <Star className="absolute top-0 -right-16 text-pink-400 w-8 h-8 animate-bounce" style={{animationDelay: '0.3s'}} />
            <Star className="absolute bottom-0 -left-16 text-purple-400 w-10 h-10 animate-bounce" style={{animationDelay: '0.5s'}} />
        </div>
        <h1 className="text-5xl md:text-7xl font-script bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-md pb-2">
            Royal Reveal
        </h1>
        <p className="text-xl text-gray-600 font-medium">Presenting Princess {state.character?.name}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full bg-white/80 backdrop-blur-sm rounded-[3rem] p-8 shadow-2xl border border-white">
        
        {/* The Look */}
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 via-pink-300 to-purple-300 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <AvatarCanvas state={state} className="w-72 h-96 md:w-96 md:h-[500px]" showBody={true} />
        </div>

        {/* The Verdict */}
        <div className="flex-1 space-y-6">
            <div className="bg-pink-50 rounded-3xl p-8 border-2 border-pink-100 relative">
                <div className="absolute -top-4 -left-4 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full font-bold text-sm shadow-md">
                    Royal Decree
                </div>
                {loading ? (
                    <div className="flex flex-col items-center py-4 space-y-3">
                        <div className="w-8 h-8 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin"></div>
                        <p className="text-gray-500 text-sm animate-pulse">The Royal Advisor is thinking...</p>
                    </div>
                ) : (
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium italic">
                        "{feedback}"
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-xl transition-colors">
                    <Share2 className="w-5 h-5" />
                    Save Photo
                </button>
                <button 
                    onClick={onRestart}
                    className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-pink-200"
                >
                    <RefreshCw className="w-5 h-5" />
                    Play Again
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default FinalReveal;
