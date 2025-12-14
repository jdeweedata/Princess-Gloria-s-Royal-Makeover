import React from 'react';
import { MakeoverState } from '../types';

interface AvatarCanvasProps {
  state: MakeoverState;
  showBody?: boolean;
  className?: string;
  zoom?: boolean;
}

const AvatarCanvas: React.FC<AvatarCanvasProps> = ({ state, showBody = false, className = "", zoom = false }) => {
  const { character, makeup, spa } = state;

  if (!character) return null;

  // Colors based on the screenshot art style
  const skinColors: Record<string, string> = {
    Gloria: '#d69e76', // Medium Tan/Honey (Screenshot match)
    Juliet: '#fbd8b8', // Fair
    Belle: '#8d5e38',  // Dark
  };
  
  const hairColors: Record<string, string> = {
    Gloria: '#581c87', // Deep Purple (Screenshot match)
    Juliet: '#facc15', // Blonde
    Belle: '#451a03',  // Dark Brown
  };

  const skinFill = skinColors[character.id] || skinColors['Gloria'];
  const hairFill = hairColors[character.id] || hairColors['Gloria'];
  
  // Default eye color (Brown/Hazel from screenshot)
  const irisColor = '#603813'; 

  return (
    <div className={`relative flex justify-center items-end overflow-hidden border-4 border-pink-300 rounded-full bg-blue-50 shadow-xl ${className} ${zoom ? 'scale-125 origin-bottom' : ''}`}>
      
      <svg
        viewBox="0 0 400 500" 
        className="w-full h-full absolute bottom-0"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* --- Background Hair (Volume) --- */}
        <path 
            d="M 60 150 
               Q 40 80 120 60 
               Q 200 40 280 60 
               Q 360 80 340 150 
               Q 380 250 340 350 
               L 300 450 L 100 450 L 60 350 
               Q 20 250 60 150" 
            fill={hairFill} 
        />

        {/* --- Neck --- */}
        <path d="M 130 320 L 130 450 Q 130 480 80 500 L 320 500 Q 270 480 270 450 L 270 320 Z" fill={skinFill} />
        <path d="M 130 330 Q 200 360 270 330 L 270 360 Q 200 390 130 360 Z" fill="#000" opacity="0.1" />

        {/* --- Dress --- */}
        {showBody && (
            <>
             <path d="M 80 500 Q 200 530 320 500 L 340 550 L 60 550 Z" fill="#ec4899" />
             <path d="M 200 500 L 200 550" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            </>
        )}

        {/* --- Ears --- */}
        <path d="M 85 240 Q 75 260 90 280" fill={skinFill} />
        <path d="M 315 240 Q 325 260 310 280" fill={skinFill} />

        {/* --- Face Shape --- */}
        <path 
            d="M 90 180 
               C 90 180, 80 260, 100 310 
               Q 110 370 200 390 
               Q 290 370 300 310 
               C 320 260, 310 180, 310 180
               Q 200 120 90 180" 
            fill={skinFill} 
        />

        {/* --- Spa Mask --- */}
        {spa.maskApplied && !spa.maskRinsed && (
             <path 
                d="M 95 185 C 95 185, 85 260, 105 310 Q 115 365 200 380 Q 285 365 295 310 C 315 260, 305 185, 305 185 Q 200 125 95 185" 
                fill="#a7f3d0" opacity="0.85" 
            />
        )}

        {/* --- Eyebrows --- */}
        <g fill="#2c1205">
            <path d="M 100 200 Q 130 180 160 195 L 162 205 Q 130 190 100 208 Z" />
            <path d="M 300 200 Q 270 180 240 195 L 238 205 Q 270 190 300 208 Z" />
        </g>

        {/* --- Eyes --- */}
        <g transform="translate(0, 10)">
            {/* Left Eye */}
            <g transform="translate(135, 230)">
                <ellipse cx="0" cy="0" rx="35" ry="18" fill="white" />
                <circle cx="0" cy="0" r="15" fill={irisColor} />
                <circle cx="0" cy="0" r="7" fill="black" />
                <circle cx="5" cy="-5" r="4" fill="white" opacity="0.9" />
                {/* Lash Line */}
                <path d="M -35 0 Q 0 -22 35 0" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
                {/* Lower Lash Line */}
                <path d="M -30 5 Q 0 20 30 5" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
                
                {/* Makeup: Eyeshadow */}
                {makeup.eyeshadow && (
                    <path d="M -35 -2 Q 0 -35 35 -2" className={makeup.eyeshadow} fill="none" stroke="currentColor" strokeWidth="12" opacity="0.6" filter="url(#glow)" />
                )}

                {/* Lashes */}
                {makeup.eyelashes && (
                     <g stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round">
                        <path d="M -35 -2 L -48 -12" />
                        <path d="M -25 -10 L -32 -22" />
                        <path d="M -10 -15 L -12 -28" />
                        <path d="M 10 -15 L 12 -28" />
                        <path d="M 25 -10 L 35 -20" />
                        <path d="M 35 -2 L 48 -8" />
                     </g>
                )}
            </g>

            {/* Right Eye */}
            <g transform="translate(265, 230)">
                <ellipse cx="0" cy="0" rx="35" ry="18" fill="white" />
                <circle cx="0" cy="0" r="15" fill={irisColor} />
                <circle cx="0" cy="0" r="7" fill="black" />
                <circle cx="-5" cy="-5" r="4" fill="white" opacity="0.9" />
                {/* Lash Line */}
                <path d="M -35 0 Q 0 -22 35 0" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
                {/* Lower Lash Line */}
                <path d="M -30 5 Q 0 20 30 5" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

                 {/* Makeup: Eyeshadow */}
                 {makeup.eyeshadow && (
                    <path d="M -35 -2 Q 0 -35 35 -2" className={makeup.eyeshadow} fill="none" stroke="currentColor" strokeWidth="12" opacity="0.6" filter="url(#glow)" />
                )}

                {/* Lashes */}
                {makeup.eyelashes && (
                     <g stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round">
                        <path d="M 35 -2 L 48 -12" />
                        <path d="M 25 -10 L 32 -22" />
                        <path d="M 10 -15 L 12 -28" />
                        <path d="M -10 -15 L -12 -28" />
                        <path d="M -25 -10 L -35 -20" />
                        <path d="M -35 -2 L -48 -8" />
                     </g>
                )}
            </g>
        </g>

        {/* --- Nose --- */}
        <g transform="translate(200, 300)" opacity="0.6">
             <path d="M -10 0 Q 0 5 10 0" stroke="#8d5e38" strokeWidth="2" fill="none" />
             <path d="M -12 -2 Q -15 2 -8 4" stroke="#8d5e38" strokeWidth="1" fill="none" />
             <path d="M 12 -2 Q 15 2 8 4" stroke="#8d5e38" strokeWidth="1" fill="none" />
        </g>

        {/* --- Blush --- */}
        {makeup.blush && (
            <>
                <circle cx="120" cy="310" r="20" className={makeup.blush} fill="currentColor" opacity="0.2" filter="url(#glow)" />
                <circle cx="280" cy="310" r="20" className={makeup.blush} fill="currentColor" opacity="0.2" filter="url(#glow)" />
            </>
        )}

        {/* --- Lips --- */}
        <g transform="translate(200, 360)">
             {/* Upper Lip */}
             <path 
                d="M -35 0 Q -18 -15 0 -8 Q 18 -15 35 0" 
                fill={makeup.lipstick ? 'currentColor' : '#dba6a6'} 
                className={makeup.lipstick || ''}
            />
            {/* Lower Lip */}
             <path 
                d="M -35 0 Q 0 25 35 0" 
                fill={makeup.lipstick ? 'currentColor' : '#dba6a6'} 
                className={makeup.lipstick || ''}
            />
            {/* Gloss/Teeth */}
            {makeup.lipstick && (
                <>
                <path d="M -10 -2 Q 0 2 10 -2" stroke="white" strokeWidth="1" opacity="0.5" fill="none" />
                <circle cx="10" cy="5" r="3" fill="white" opacity="0.4" />
                </>
            )}
        </g>

        {/* --- Spa Pimples --- */}
        {!spa.clean && !spa.maskApplied && (
            <g fill="#f87171" opacity="0.6">
                <circle cx="150" cy="200" r="4" />
                <circle cx="260" cy="320" r="5" />
                <circle cx="180" cy="370" r="3" />
                <circle cx="220" cy="180" r="4" />
            </g>
        )}

        {/* --- Front Hair & Bangs --- */}
        <path 
            d="M 60 180 
               Q 40 50 200 60 
               Q 360 50 340 180 
               Q 350 100 200 80 
               Q 50 100 60 180" 
            fill={hairFill} 
        />
        {/* Flyaways */}
        <path d="M 60 180 Q 50 220 70 250" fill="none" stroke={hairFill} strokeWidth="8" />
        <path d="M 340 180 Q 350 220 330 250" fill="none" stroke={hairFill} strokeWidth="8" />

        {/* --- Face Paint / Diamonds (Gloria's Special) --- */}
        {makeup.eyeshadow && (
            <g opacity="0.9">
                {/* Above Right Eye Swirl */}
                <path d="M 290 190 Q 310 180 320 195" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                <path d="M 295 185 Q 305 175 315 185" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
                
                {/* Diamonds */}
                <path d="M 120 190 L 125 195 L 120 200 L 115 195 Z" fill="#60a5fa" />
                <path d="M 130 185 L 134 189 L 130 193 L 126 189 Z" fill="#60a5fa" />
                <path d="M 140 190 L 144 194 L 140 198 L 136 194 Z" fill="#60a5fa" />
            </g>
        )}

        {/* --- Accessories --- */}
        {state.outfit.accessoryId === 1 && ( // Tiara
             <g transform="translate(200, 90)">
                <path d="M -50 20 L -70 0 L -30 10 L 0 -25 L 30 10 L 70 0 L 50 20 Z" fill="none" stroke="#fbbf24" strokeWidth="4" />
                <circle cx="0" cy="-25" r="5" fill="#3b82f6" />
                <circle cx="-30" cy="10" r="3" fill="#ef4444" />
                <circle cx="30" cy="10" r="3" fill="#ef4444" />
             </g>
        )}
        {state.outfit.accessoryId === 2 && ( // Flower Crown
             <g transform="translate(200, 100)">
                 <circle cx="-50" cy="0" r="15" fill="#f472b6" />
                 <circle cx="0" cy="-10" r="20" fill="#f472b6" />
                 <circle cx="50" cy="0" r="15" fill="#f472b6" />
             </g>
        )}
      </svg>
    </div>
  );
};

export default AvatarCanvas;
