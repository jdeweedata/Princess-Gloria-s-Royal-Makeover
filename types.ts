export enum GameStage {
  CHARACTER_SELECT,
  SPA,
  MAKEUP,
  DRESS_UP,
  REVEAL
}

export enum CharacterId {
  GLORIA = 'Gloria',
  JULIET = 'Juliet',
  BELLE = 'Belle'
}

export interface CharacterConfig {
  id: CharacterId;
  name: string;
  description: string;
  baseColor: string;
  hairColor: string;
}

export interface MakeoverState {
  character: CharacterConfig | null;
  spa: {
    clean: boolean;
    maskApplied: boolean;
    maskRinsed: boolean;
    pimplesPopped: boolean;
    eyebrowsPlucked: boolean;
  };
  makeup: {
    lipstick: string; // Tailwind color class
    eyeshadow: string; // Tailwind color class
    blush: string; // Tailwind color class
    eyelashes: boolean;
  };
  outfit: {
    dressId: number;
    accessoryId: number;
    hairId: number;
  };
}

export type MakeupCategory = 'lipstick' | 'eyeshadow' | 'blush';

export interface ItemOption {
  id: number;
  name: string;
  image: string; // URL
  styleDescription: string;
}
