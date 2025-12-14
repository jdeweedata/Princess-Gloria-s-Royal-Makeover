import React from 'react';
import { CHARACTERS } from '../constants';
import { CharacterConfig } from '../types';

interface Props {
  onSelect: (char: CharacterConfig) => void;
}

const CharacterSelection: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h2 className="text-4xl font-script text-pink-600 mb-2 drop-shadow-sm">Choose Your Princess</h2>
      <p className="text-slate-500 mb-8 font-medium">Who will be the winter beauty today?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {CHARACTERS.map((char) => (
          <button
            key={char.id}
            onClick={() => onSelect(char)}
            className="group relative flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-pink-300"
          >
            <div className={`w-32 h-32 rounded-full mb-4 ${char.baseColor} flex items-center justify-center overflow-hidden border-4 border-white shadow-inner`}>
                {/* Simple representation for selection */}
               <span className="text-4xl">👑</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">{char.name}</h3>
            <p className="text-sm text-gray-500 text-center mt-2 px-2">{char.description}</p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Start Makeover
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;
