'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { HelicopterPart, PartStatus } from '@/types/part';
import { partService } from '@/services/partService';

interface PartContextType {
  parts: HelicopterPart[];
  loading: boolean;
  error: string | null;
  fetchParts: () => Promise<void>;
  addPart: (part: Omit<HelicopterPart, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updatePart: (id: string, part: Partial<Omit<HelicopterPart, 'id' | 'createdAt'>>) => Promise<void>;
  deletePart: (id: string) => Promise<void>;
  filterByStatus: (status: PartStatus) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  searchParts: (query: string) => HelicopterPart[];
  getPartsByAircraft: (aircraftId: string) => HelicopterPart[];
}

const PartContext = createContext<PartContextType | undefined>(undefined);

export function PartProvider({ children }: { children: React.ReactNode }) {
  const [parts, setParts] = useState<HelicopterPart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await partService.getAll();
      setParts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar peças');
    } finally {
      setLoading(false);
    }
  }, []);

  const addPart = useCallback(
    async (partData: Omit<HelicopterPart, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setError(null);
        const newPart = await partService.create(partData);
        setParts((prev) => [...prev, newPart]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao adicionar peça');
        throw err;
      }
    },
    []
  );

  const updatePart = useCallback(
    async (id: string, partData: Partial<Omit<HelicopterPart, 'id' | 'createdAt'>>) => {
      try {
        setError(null);
        const updated = await partService.update(id, partData);
        if (updated) {
          setParts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao atualizar peça');
        throw err;
      }
    },
    []
  );

  const deletePart = useCallback(async (id: string) => {
    try {
      setError(null);
      const success = await partService.delete(id);
      if (success) {
        setParts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar peça');
      throw err;
    }
  }, []);

  const filterByStatus = useCallback(async (status: PartStatus) => {
    try {
      setError(null);
      const filtered = await partService.getByStatus(status);
      setParts(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao filtrar peças');
    }
  }, []);

  const filterByCategory = useCallback(async (category: string) => {
    try {
      setError(null);
      const filtered = await partService.getByCategory(category);
      setParts(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao filtrar peças');
    }
  }, []);

  const searchParts = useCallback(
    (query: string): HelicopterPart[] => {
      const lowerQuery = query.toLowerCase();
      return parts.filter(
        (part) =>
          part.name.toLowerCase().includes(lowerQuery) ||
          part.serialNumber.toLowerCase().includes(lowerQuery) ||
          part.category.toLowerCase().includes(lowerQuery)
      );
    },
    [parts]
  );

  const getPartsByAircraft = useCallback((aircraftId: string): HelicopterPart[] => {
    return parts.filter((part) => part.aircraftId === aircraftId);
  }, [parts]);

  // Carregar peças ao montar o componente
  useEffect(() => {
    fetchParts();
  }, [fetchParts]);

  return (
    <PartContext.Provider
      value={{
        parts,
        loading,
        error,
        fetchParts,
        addPart,
        updatePart,
        deletePart,
        filterByStatus,
        filterByCategory,
        searchParts,
        getPartsByAircraft,
      }}
    >
      {children}
    </PartContext.Provider>
  );
}

export function useParts() {
  const context = useContext(PartContext);
  if (!context) {
    throw new Error('useParts deve ser usado dentro de PartProvider');
  }
  return context;
}
