'use client';

import React, { useState, useEffect } from 'react';
import { HelicopterPart, PartStatus } from '@/types/part';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface PartFormProps {
  part?: HelicopterPart;
  aircraftId?: string;
  onSubmit: (partData: Omit<HelicopterPart, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  loading?: boolean;
}

export function PartForm({ part, aircraftId = '', onSubmit, loading = false }: PartFormProps) {
  const [formData, setFormData] = useState<Omit<HelicopterPart, 'id' | 'createdAt' | 'updatedAt'>>({
    aircraftId: part?.aircraftId || aircraftId,
    name: '',
    serialNumber: '',
    category: '',
    installDate: new Date(),
    maxLifespanDays: 3650,
    currentFlightHours: 0,
    maxFlightHoursTBO: 5000,
    status: 'OK',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (part) {
      setFormData({
        aircraftId: part.aircraftId,
        name: part.name,
        serialNumber: part.serialNumber,
        category: part.category,
        installDate: part.installDate,
        maxLifespanDays: part.maxLifespanDays,
        currentFlightHours: part.currentFlightHours,
        maxFlightHoursTBO: part.maxFlightHoursTBO,
        status: part.status,
      });
    }
  }, [part]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.serialNumber.trim()) newErrors.serialNumber = 'Serial Number é obrigatório';
    if (!formData.category.trim()) newErrors.category = 'Categoria é obrigatória';
    if (formData.maxLifespanDays <= 0) newErrors.maxLifespanDays = 'Dias de vida útil deve ser maior que 0';
    if (formData.currentFlightHours < 0) newErrors.currentFlightHours = 'Horas de voo não pode ser negativa';
    if (formData.maxFlightHoursTBO <= 0) newErrors.maxFlightHoursTBO = 'TBO deve ser maior que 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      if (!part) {
        setFormData({
          aircraftId,
          name: '',
          serialNumber: '',
          category: '',
          installDate: new Date(),
          maxLifespanDays: 3650,
          currentFlightHours: 0,
          maxFlightHoursTBO: 5000,
          status: 'OK',
        });
      }
      setErrors({});
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'installDate') {
      setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
    } else if (['maxLifespanDays', 'currentFlightHours', 'maxFlightHoursTBO'].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const installDateValue = formData.installDate instanceof Date
    ? formData.installDate.toISOString().split('T')[0]
    : '';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Linha 1: Nome e Serial Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome da Peça"
            className="w-full px-4 py-3 bg-gray-700 dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            placeholder="Serial Number"
            className="w-full px-4 py-3 bg-gray-700 dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.serialNumber && <p className="text-red-500 text-xs mt-1">{errors.serialNumber}</p>}
        </div>
      </div>

      {/* Linha 2: Categoria e Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Categoria"
            className="w-full px-4 py-3 bg-gray-700 dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        <div>
          <input
            type="date"
            name="installDate"
            value={installDateValue}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Linha 3: Dias de Vida e Horas Atuais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="number"
            name="maxLifespanDays"
            value={formData.maxLifespanDays}
            onChange={handleChange}
            placeholder="Dias de Vida Útil"
            className="w-full px-4 py-3 bg-gray-700 dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.maxLifespanDays && <p className="text-red-500 text-xs mt-1">{errors.maxLifespanDays}</p>}
        </div>

        <div>
          <input
            type="number"
            name="currentFlightHours"
            value={formData.currentFlightHours}
            onChange={handleChange}
            placeholder="Horas de Voo Atuais"
            className="w-full px-4 py-3 bg-gray-700 dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.currentFlightHours && <p className="text-red-500 text-xs mt-1">{errors.currentFlightHours}</p>}
        </div>
      </div>

      {/* Linha 4: TBO */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <input
            type="number"
            name="maxFlightHoursTBO"
            value={formData.maxFlightHoursTBO}
            onChange={handleChange}
            placeholder="TBO - Horas Máximas"
            className="w-full px-4 py-3 bg-gray-700 dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.maxFlightHoursTBO && <p className="text-red-500 text-xs mt-1">{errors.maxFlightHoursTBO}</p>}
        </div>
      </div>

      {/* Linha 5: Status */}
      <div className="grid grid-cols-1 gap-4">
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700 dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="OK">Status: OK</option>
          <option value="WARNING">Status: Alerta</option>
          <option value="CRITICAL_AOG">Status: Crítico (AOG)</option>
        </select>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-6 border-t border-gray-600 dark:border-gray-500">
        <Button type="submit" variant="primary" isLoading={loading}>
          {part ? 'Atualizar Peça' : 'Salvar Peça'}
        </Button>
      </div>
    </form>
  );
}
