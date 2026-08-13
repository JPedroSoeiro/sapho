'use client';

import React, { useState, useEffect } from 'react';
import { HelicopterMission, MissionType, MISSION_TYPES } from '@/types/mission';
import { Button } from '@/components/ui/Button';

interface MissionFormProps {
  mission?: HelicopterMission;
  aircraftId: string;
  onSubmit: (data: Omit<HelicopterMission, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  loading?: boolean;
}

type FormState = Omit<HelicopterMission, 'id' | 'createdAt' | 'updatedAt'>;

function buildEmptyForm(aircraftId: string): FormState {
  return {
    aircraftId,
    title: '',
    date: new Date(),
    durationHours: 1,
    missionType: 'Patrulhamento',
    pilotInCommand: '',
    notes: '',
  };
}

export function MissionForm({ mission, aircraftId, onSubmit, loading = false }: MissionFormProps) {
  const [formData, setFormData] = useState<FormState>(buildEmptyForm(aircraftId));
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mission) {
      setFormData({
        aircraftId: mission.aircraftId,
        title: mission.title,
        date: mission.date,
        durationHours: mission.durationHours,
        missionType: mission.missionType,
        pilotInCommand: mission.pilotInCommand,
        notes: mission.notes || '',
      });
    }
  }, [mission]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Título é obrigatório';
    if (!formData.pilotInCommand.trim()) newErrors.pilotInCommand = 'Piloto/Comandante é obrigatório';
    if (formData.durationHours <= 0) newErrors.durationHours = 'Duração deve ser maior que 0';
    if (!(formData.date instanceof Date) || isNaN(formData.date.getTime())) {
      newErrors.date = 'Data é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      if (!mission) {
        setFormData(buildEmptyForm(aircraftId));
      }
      setErrors({});
    } catch (error) {
      console.error('Erro ao submeter formulário de missão:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'date') {
      setFormData((prev) => ({ ...prev, date: new Date(value) }));
    } else if (name === 'durationHours') {
      setFormData((prev) => ({ ...prev, durationHours: Number(value) }));
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

  const dateValue = formData.date instanceof Date && !isNaN(formData.date.getTime())
    ? formData.date.toISOString().split('T')[0]
    : '';

  const inputClass =
    'w-full px-4 py-3 bg-gray-700 dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const labelClass = 'block text-xs font-medium text-gray-300 dark:text-gray-400 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Linha 1: Título */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Título da Missão
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ex: Resgate Aeromédico - Zona Rural"
          className={inputClass}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Linha 2: Categoria e Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="missionType" className={labelClass}>
            Categoria da Missão
          </label>
          <select
            id="missionType"
            name="missionType"
            value={formData.missionType}
            onChange={handleChange}
            className={inputClass}
          >
            {MISSION_TYPES.map((type: MissionType) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className={labelClass}>
            Data da Missão
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={dateValue}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>
      </div>

      {/* Linha 3: Duração e Piloto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="durationHours" className={labelClass}>
            Duração (horas)
          </label>
          <input
            id="durationHours"
            type="number"
            name="durationHours"
            step="0.1"
            min="0.1"
            value={formData.durationHours}
            onChange={handleChange}
            placeholder="Ex: 2.5"
            className={inputClass}
          />
          {errors.durationHours && <p className="text-red-500 text-xs mt-1">{errors.durationHours}</p>}
        </div>

        <div>
          <label htmlFor="pilotInCommand" className={labelClass}>
            Piloto / Comandante
          </label>
          <input
            id="pilotInCommand"
            type="text"
            name="pilotInCommand"
            value={formData.pilotInCommand}
            onChange={handleChange}
            placeholder="Ex: Cap. Ricardo Alves"
            className={inputClass}
          />
          {errors.pilotInCommand && <p className="text-red-500 text-xs mt-1">{errors.pilotInCommand}</p>}
        </div>
      </div>

      {/* Linha 4: Observações */}
      <div>
        <label htmlFor="notes" className={labelClass}>
          Observações
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Observações adicionais sobre a missão (opcional)"
          rows={3}
          className={inputClass}
        />
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-6 border-t border-gray-600 dark:border-gray-500">
        <Button type="submit" variant="primary" isLoading={loading}>
          {mission ? 'Atualizar Missão' : 'Registrar Missão'}
        </Button>
      </div>
    </form>
  );
}
