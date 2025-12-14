import React, { useState } from 'react';
import { MakeoverState, MakeupCategory } from '../types';
import { LIP_COLORS, EYE_COLORS } from '../constants';
import AvatarCanvas from './AvatarCanvas';
import { Palette, Eye, Smile } from 'lucide-react';

interface Props {
  state: MakeoverState;
  updateState: (category: MakeupCategory, value: string) => void;
  toggleLashes: () => void;
  onComplete: () => void;
}

const MakeupStage: React.FC<Props> = ({ state, updateState, toggleLashes, onComplete }) => {
  const [activeCategory, setActiveCategory] = useState<MakeupCategory>('lipstick');

  const categories = [
    { id: 'lipstick', name: 'Lips', icon: <Smile className="w-5 h-5" /> },
    { id: 'eyeshadow', name: 'Eyes', icon: <Eye className="w-5 h-5" /> },
    { id: 'blush', name: 'Blush', icon: <Palette className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row h-full max-w-6xl mx-auto gap-8 p-4">
      
      {/* Palette Sidebar */}
      <div className="w-full md:w-1/3 bg-white rounded-3xl shadow-lg flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as MakeupCategory)}
                    className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${activeCategory === cat.id ? 'bg-pink-50 text-pink-600 border-b-2 border-pink-500' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    {cat.icon}
                    <span className="text-xs font-bold uppercase tracking-wide">{cat.name}</span>
                </button>
            ))}
        </div>

        {/* Options Grid */}
        <div className="p-6 flex-1 overflow-y-auto">
            <h3 className="text-xl font-script text-gray-700 mb-4">Choose a shade:</h3>
            
            <div className="grid grid-cols-3 gap-4">
                {activeCategory === 'lipstick' && LIP_COLORS.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => updateState('lipstick', color.class)}
                        className={`w-16 h-16 rounded-full border-4 shadow-sm transition-transform hover:scale-110 ${color.class.replace('text-', 'bg-')} ${state.makeup.lipstick === color.class ? 'border-gray-800 scale-110' : 'border-white'}`}
                        title={color.name}
                    />
                ))}
                
                {activeCategory === 'eyeshadow' && EYE_COLORS.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => updateState('eyeshadow', color.class)}
                        className={`w-16 h-16 rounded-full border-4 shadow-sm transition-transform hover:scale-110 ${color.class.replace('text-', 'bg-')} ${state.makeup.eyeshadow === color.class ? 'border-gray-800 scale-110' : 'border-white'}`}
                        title={color.name}
                    />
                ))}

                {activeCategory === 'blush' && (
                    <>
                        <button onClick={() => updateState('blush', 'text-pink-300')} className="w-16 h-16 rounded-full bg-pink-300 border-4 border-white shadow-sm hover:scale-110" />
                        <button onClick={() => updateState('blush', 'text-red-300')} className="w-16 h-16 rounded-full bg-red-300 border-4 border-white shadow-sm hover:scale-110" />
                        <button onClick={() => updateState('blush', 'text-orange-300')} className="w-16 h-16 rounded-full bg-orange-300 border-4 border-white shadow-sm hover:scale-110" />
                    </>
                )}
            </div>

            <div className="mt-8 border-t pt-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-6 h-6 border-2 rounded flex items-center justify-center ${state.makeup.eyelashes ? 'bg-pink-500 border-pink-500' : 'border-gray-300'}`}>
                        {state.makeup.eyelashes && <span className="text-white text-xs">✓</span>}
                    </div>
                    <input type="checkbox" className="hidden" checked={state.makeup.eyelashes} onChange={toggleLashes} />
                    <span className="font-semibold text-gray-700 group-hover:text-pink-500">Apply Glam Lashes</span>
                </label>
            </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-pink-50 rounded-3xl shadow-inner flex flex-col items-center justify-center p-8 relative">
        <AvatarCanvas state={state} className="w-64 h-80 md:w-80 md:h-96" zoom={true} />
        
        <button 
            onClick={onComplete}
            className="absolute bottom-8 right-8 bg-white text-pink-600 border-2 border-pink-100 hover:bg-pink-50 px-6 py-2 rounded-full font-bold shadow-md transition-all flex items-center gap-2"
        >
            Select Outfit &rarr;
        </button>
      </div>

    </div>
  );
};

export default MakeupStage;
