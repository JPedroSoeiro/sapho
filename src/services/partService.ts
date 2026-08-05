import { HelicopterPart, PartStatus } from '@/types/part';
import { INITIAL_PARTS_MOCK } from '@/data/initialPartsMock';

let partsCache = [...INITIAL_PARTS_MOCK];
let nextId = INITIAL_PARTS_MOCK.length + 1;

export const partService = {
  // GET - Obter todas as peças
  async getAll(): Promise<HelicopterPart[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...partsCache]), 300);
    });
  },

  // GET - Obter peça por ID
  async getById(id: string): Promise<HelicopterPart | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const part = partsCache.find((p) => p.id === id);
        resolve(part || null);
      }, 200);
    });
  },

  // POST - Criar nova peça
  async create(partData: Omit<HelicopterPart, 'id' | 'createdAt' | 'updatedAt'>): Promise<HelicopterPart> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPart: HelicopterPart = {
          ...partData,
          id: `part-${String(nextId++).padStart(3, '0')}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        partsCache.push(newPart);
        resolve(newPart);
      }, 300);
    });
  },

  // PUT - Atualizar peça existente
  async update(id: string, partData: Partial<Omit<HelicopterPart, 'id' | 'createdAt'>>): Promise<HelicopterPart | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = partsCache.findIndex((p) => p.id === id);
        if (index === -1) {
          resolve(null);
          return;
        }

        partsCache[index] = {
          ...partsCache[index],
          ...partData,
          updatedAt: new Date(),
        };
        resolve({ ...partsCache[index] });
      }, 300);
    });
  },

  // DELETE - Deletar peça
  async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = partsCache.length;
        partsCache = partsCache.filter((p) => p.id !== id);
        resolve(partsCache.length < initialLength);
      }, 250);
    });
  },

  // Filtrar por status
  async getByStatus(status: PartStatus): Promise<HelicopterPart[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(partsCache.filter((p) => p.status === status));
      }, 200);
    });
  },

  // Filtrar por categoria
  async getByCategory(category: string): Promise<HelicopterPart[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(partsCache.filter((p) => p.category.toLowerCase() === category.toLowerCase()));
      }, 200);
    });
  },

  // Resetar dados para testes
  async reset(): Promise<void> {
    partsCache = [...INITIAL_PARTS_MOCK];
    nextId = INITIAL_PARTS_MOCK.length + 1;
  },
};
