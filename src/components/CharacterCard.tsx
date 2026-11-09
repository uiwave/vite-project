import React from 'react';
import type { Character } from '../types/character';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const statusColors = {
    Alive: 'bg-emerald-500',
    Dead: 'bg-rose-500',
    unknown: 'bg-zinc-400',
  };

  return (
    <div className="flex bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700/50 hover:border-slate-600 transition-all hover:-translate-y-1">
      <img
        src={character.image}
        alt={character.name}
        className="w-36 h-auto object-cover sm:w-44"
        loading="lazy"
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide hover:text-emerald-400 transition-colors">
            {character.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-2.5 h-2.5 rounded-full ${statusColors[character.status]}`}
            />
            <span className="text-sm font-medium text-slate-300">
              {character.status} - {character.species}
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Última ubicación conocida:</span>
            <span className="text-slate-200 text-sm font-semibold">{character.location.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Origen:</span>
            <span className="text-slate-200 text-sm font-semibold">{character.origin.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};