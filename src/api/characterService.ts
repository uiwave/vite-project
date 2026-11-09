import { fetchClient } from './fetchClient';
import type { Character, ApiResponse } from '../types/character';

export const characterService = {
  // Obtener lista paginada de personajes
  getCharacters: (page = 1) => {
    return fetchClient<ApiResponse<Character>>(`/character?page=${page}`);
  },

  // Obtener un personaje por ID
  getCharacterById: (id: number) => {
    return fetchClient<Character>(`/character/${id}`);
  },
  
  // Filtrar personajes por nombre o estado
  searchCharacters: (name: string, status?: string) => {
    const query = new URLSearchParams({ name, ...(status && { status }) }).toString();
    return fetchClient<ApiResponse<Character>>(`/character/?${query}`);
  }
};