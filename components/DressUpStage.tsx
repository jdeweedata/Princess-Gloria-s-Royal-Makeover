import React from 'react';
import { MakeoverState } from '../types';
import { DRESSES, ACCESSORIES } from '../constants';
import AvatarCanvas from './AvatarCanvas';
import { Shirt, Crown } from 'lucide-react';

interface Props {
  state: MakeoverState;
  setDress: (id: number) => void;
  setAccessory: (id: number) => void;
  onComplete: () => void;
}

const DressUpStage: React.FC<Props> = ({ state, setDress, setAccessory, onComplete }) => {
  return (
    <div className="flex flex-col md:flex-row h-full max-w-6xl mx-auto gap-6 p-4">
      
      {/* Wardrobe */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        
        {/* Dresses */}
        <div className="bg-white rounded-2xl shadow-lg p-4 flex-1">
            <div className="flex items-center gap-2 mb-4 text-pink-600">
                <Shirt className="w-5 h-5" />
                <h3 className="font-bold text-lg">Royal Gowns</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {DRESSES.map(dress => (
                    <button 
                        key={dress.id}
                        onClick={() => setDress(dress.id)}
                        className={`relative rounded-xl overflow-hidden aspect-[3/4] group border-2 transition-all ${state.outfit.dressId === dress.id ? 'border-pink-500 ring-2 ring-pink-200' : 'border-transparent'}`}
                    >
                        <img src={dress.image} alt={dress.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 truncate">
                            {dress.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>

        {/* Accessories */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center gap-2 mb-4 text-purple-600">
                <Crown className="w-5 h-5" />
                <h3 className="font-bold text-lg">Treasures</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {ACCESSORIES.map(acc => (
                    <button 
                        key={acc.id}
                        onClick={() => setAccessory(acc.id)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden relative ${state.outfit.accessoryId === acc.id ? 'border-purple-500' : 'border-slate-200'}`}
                    >
                        <img src={acc.image} alt={acc.name} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>

      </div>

      {/* Preview */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl flex flex-col items-center justify-between p-8 relative border-4 border-white">
        <h2 className="text-3xl font-script text-pink-500 drop-shadow-sm">Ready for the Ball?</h2>
        
        <div className="relative">
             <div className="absolute -inset-4 bg-yellow-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
             <AvatarCanvas state={state} className="w-64 h-80 md:w-80 md:h-[450px]" showBody={true} />
        </div>

        <button 
            onClick={onComplete}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
        >
            <Crown className="w-6 h-6" />
            Reveal Princess {state.character?.name}
        </button>
      </div>

    </div>
  );
};

export default DressUpStage;
