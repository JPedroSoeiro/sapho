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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome da Peça"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Ex: Rotor Principal"
          required
        />

        <Input
          label="Serial Number"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          error={errors.serialNumber}
          placeholder="Ex: RMB-2024-001"
          required
        />

        <Input
          label="Categoria"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
          placeholder="Ex: Rotores"
          required
        />

        <Input
          label="Data de Instalação"
          name="installDate"
          type="date"
          value={installDateValue}
          onChange={handleChange}
          required
        />

        <Input
          label="Dias de Vida Útil (Calendário)"
          name="maxLifespanDays"
          type="number"
          value={formData.maxLifespanDays}
          onChange={handleChange}
          error={errors.maxLifespanDays}
          placeholder="Ex: 3650"
          required
        />

        <Input
          label="Horas de Voo Atuais"
          name="currentFlightHours"
          type="number"
          value={formData.currentFlightHours}
          onChange={handleChange}
          error={errors.currentFlightHours}
          placeholder="Ex: 2500"
          required
        />

        <Input
          label="TBO - Horas de Voo Máximas"
          name="maxFlightHoursTBO"
          type="number"
          value={formData.maxFlightHoursTBO}
          onChange={handleChange}
          error={errors.maxFlightHoursTBO}
          placeholder="Ex: 5000"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="OK">OK</option>
            <option value="WARNING">Alerta</option>
            <option value="CRITICAL_AOG">Crítico (AOG)</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" isLoading={loading}>
          {part ? 'Atualizar Peça' : 'Adicionar Peça'}
        </Button>
      </div>
    </form>
  );
}
