'use client';

import React from 'react';
import { HelicopterMission } from '@/types/mission';
import { MissionCard } from './MissionCard';
import { Plane } from 'lucide-react';

interface MissionListProps {
  missions: HelicopterMission[];
  onEdit: (mission: HelicopterMission) => void;
  onDelete: (mission: HelicopterMission) => void;
  loading?: boolean;
}

export function MissionList({ missions, onEdit, onDelete, loading = false }: MissionListProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Carregando missões...</p>
      </div>
    );
  }

  if (missions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
        <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
          <Plane className="text-gray-400 dark:text-gray-500" size={28} />
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Sem missões realizadas para esta aeronave
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          Registre a primeira missão para começar a acompanhar o desgaste dos componentes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {missions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
