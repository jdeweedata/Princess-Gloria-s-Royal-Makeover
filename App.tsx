import React, { useState } from 'react';
import { GameStage, MakeoverState, CharacterConfig, MakeupCategory } from './types';
import CharacterSelection from './components/CharacterSelection';
import SpaStage from './components/SpaStage';
import MakeupStage from './components/MakeupStage';
import DressUpStage from './components/DressUpStage';
import FinalReveal from './components/FinalReveal';

const INITIAL_STATE: MakeoverState = {
  character: null,
  spa: {
    clean: false,
    maskApplied: false,
    maskRinsed: false,
    pimplesPopped: false,
    eyebrowsPlucked: false
  },
  makeup: {
    lipstick: '',
    eyeshadow: '',
    blush: '',
    eyelashes: false
  },
  outfit: {
    dressId: 1,
    accessoryId: 0,
    hairId: 1
  }
};

const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>(GameStage.CHARACTER_SELECT);
  const [gameState, setGameState] = useState<MakeoverState>(INITIAL_STATE);

  const handleCharacterSelect = (char: CharacterConfig) => {
    setGameState({ ...INITIAL_STATE, character: char });
    setStage(GameStage.SPA);
  };

  const updateSpaState = (update: Partial<MakeoverState['spa']>) => {
    setGameState(prev => ({ ...prev, spa: { ...prev.spa, ...update } }));
  };

  const updateMakeupState = (category: MakeupCategory, value: string) => {
    setGameState(prev => ({
      ...prev,
      makeup: { ...prev.makeup, [category]: value }
    }));
  };

  const toggleLashes = () => {
    setGameState(prev => ({
      ...prev,
      makeup: { ...prev.makeup, eyelashes: !prev.makeup.eyelashes }
    }));
  };

  const setDress = (id: number) => {
    setGameState(prev => ({ ...prev, outfit: { ...prev.outfit, dressId: id } }));
  };

  const setAccessory = (id: number) => {
    setGameState(prev => ({ ...prev, outfit: { ...prev.outfit, accessoryId: id } }));
  };

  const restartGame = () => {
    setStage(GameStage.CHARACTER_SELECT);
    setGameState(INITIAL_STATE);
  };

  // Progress Bar Logic
  const steps = ['Select', 'Spa', 'Makeup', 'Dress Up', 'Reveal'];
  const currentStepIndex = Object.values(GameStage).indexOf(stage as unknown as string); // Enum value check
  // Simple int mapping for progress
  const progressPercent = ((stage + 1) / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 overflow-x-hidden">
      
      {/* Navigation / Header */}
      <nav className="p-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
            <div className="bg-pink-500 text-white p-2 rounded-lg font-bold shadow-md">PG</div>
            <span className="font-bold text-pink-700 tracking-wider hidden sm:block">Princess Gloria</span>
        </div>
        
        {stage !== GameStage.REVEAL && stage !== GameStage.CHARACTER_SELECT && (
            <div className="w-full max-w-md mx-4 bg-white/50 rounded-full h-3 relative">
                <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min((stage / 4) * 100, 100)}%` }}
                />
            </div>
        )}

        <div className="text-sm font-semibold text-slate-600">
             {steps[stage]}
        </div>
      </nav>

      <main className="container mx-auto pb-8">
        {stage === GameStage.CHARACTER_SELECT && (
          <CharacterSelection onSelect={handleCharacterSelect} />
        )}
        
        {stage === GameStage.SPA && (
          <SpaStage 
            state={gameState} 
            updateState={updateSpaState} 
            onComplete={() => setStage(GameStage.MAKEUP)} 
          />
        )}
        
        {stage === GameStage.MAKEUP && (
          <MakeupStage 
            state={gameState} 
            updateState={updateMakeupState} 
            toggleLashes={toggleLashes}
            onComplete={() => setStage(GameStage.DRESS_UP)} 
          />
        )}
        
        {stage === GameStage.DRESS_UP && (
          <DressUpStage 
            state={gameState}
            setDress={setDress}
            setAccessory={setAccessory}
            onComplete={() => setStage(GameStage.REVEAL)}
          />
        )}
        
        {stage === GameStage.REVEAL && (
          <FinalReveal 
            state={gameState} 
            onRestart={restartGame} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
