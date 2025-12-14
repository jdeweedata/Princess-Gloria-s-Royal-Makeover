import { CharacterId, CharacterConfig, ItemOption } from './types';

export const CHARACTERS: CharacterConfig[] = [
  {
    id: CharacterId.GLORIA,
    name: "Gloria",
    description: "The winter princess with royal purple style.",
    baseColor: "bg-purple-100",
    hairColor: "text-purple-800"
  },
  {
    id: CharacterId.JULIET,
    name: "Juliet",
    description: "A rose garden beauty with golden locks.",
    baseColor: "bg-pink-100",
    hairColor: "text-yellow-500"
  },
  {
    id: CharacterId.BELLE,
    name: "Belle",
    description: "Smart and elegant with rich dark hair.",
    baseColor: "bg-orange-100",
    hairColor: "text-amber-900"
  }
];

export const LIP_COLORS = [
  { name: 'Classic Red', class: 'text-red-500', hex: '#ef4444' }, // Using text classes for SVG fill="currentColor"
  { name: 'Hot Pink', class: 'text-pink-500', hex: '#ec4899' },
  { name: 'Frozen Blue', class: 'text-cyan-400', hex: '#22d3ee' },
  { name: 'Deep Berry', class: 'text-purple-700', hex: '#7e22ce' },
  { name: 'Icy Nude', class: 'text-stone-300', hex: '#d6d3d1' },
];

export const EYE_COLORS = [
  { name: 'Sky Blue', class: 'text-blue-400', hex: '#60a5fa' },
  { name: 'Emerald', class: 'text-emerald-500', hex: '#10b981' },
  { name: 'Violet', class: 'text-violet-400', hex: '#a78bfa' },
  { name: 'Gold Dust', class: 'text-yellow-400', hex: '#facc15' },
  { name: 'Smokey', class: 'text-slate-600', hex: '#475569' },
];

export const DRESSES: ItemOption[] = [
  { id: 1, name: "Ice Queen Gown", image: "https://picsum.photos/id/100/200/300", styleDescription: "an elegant icy blue gown" },
  { id: 2, name: "Rose Petal Dress", image: "https://picsum.photos/id/102/200/300", styleDescription: "a romantic pink floral dress" },
  { id: 3, name: "Royal Gold Ballgown", image: "https://picsum.photos/id/103/200/300", styleDescription: "a magnificent golden ballgown" },
  { id: 4, name: "Winter Fur Coat", image: "https://picsum.photos/id/104/200/300", styleDescription: "a chic winter outfit with fur accents" },
];

export const ACCESSORIES: ItemOption[] = [
  { id: 1, name: "Diamond Tiara", image: "https://picsum.photos/id/110/100/100", styleDescription: "a sparkling diamond tiara" },
  { id: 2, name: "Flower Crown", image: "https://picsum.photos/id/111/100/100", styleDescription: "a delicate flower crown" },
  { id: 3, name: "Ruby Necklace", image: "https://picsum.photos/id/112/100/100", styleDescription: "a deep red ruby necklace" },
  { id: 4, name: "Magic Wand", image: "https://picsum.photos/id/113/100/100", styleDescription: "a glittering magic wand" },
];
