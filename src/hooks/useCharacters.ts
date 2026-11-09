import { useState, useEffect, useCallback } from 'react';
import { characterService } from '../api/characterService';
import type { Character, ApiResponse } from '../types/character';

export function useCharacters(initialPage = 1) {
  const [data, setData] = useState<ApiResponse<Character> | null>(null);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = useCallback(async (currentPage: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await characterService.getCharacters(currentPage);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar personajes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters(page);
  }, [page, fetchCharacters]);

  return {
    characters: data?.results ?? [],
    info: data?.info,
    page,
    setPage,
    loading,
    error,
    refetch: () => fetchCharacters(page),
  };
}