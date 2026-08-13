'use client';

import React from 'react';
import { HelicopterMission } from '@/types/mission';
import { Modal } from '@/components/ui/Modal';
import { MissionForm } from './MissionForm';

interface MissionFormModalProps {
  isOpen: boolean;
  mission?: HelicopterMission;
  aircraftId: string;
  loading?: boolean;
  onSubmit: (data: Omit<HelicopterMission, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onClose: () => void;
}

export function MissionFormModal({
  isOpen,
  mission,
  aircraftId,
  loading = false,
  onSubmit,
  onClose,
}: MissionFormModalProps) {
  const isEditing = !!mission;
  const title = isEditing ? '✏️ Editar Missão' : '➕ Nova Missão';
  const subtitle = isEditing
    ? `${mission.title} (${mission.missionType})`
    : 'Registre uma missão realizada por esta aeronave';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-xs text-blue-800 dark:text-blue-300">
            ⚙️ <span className="font-semibold">Atenção:</span> as horas desta missão serão somadas ao
            desgaste de todos os componentes da aeronave, ponderadas pelo fator de estresse de cada peça
            (rotor principal, transmissão, motor, estrutura).
          </p>
        </div>

        <MissionForm mission={mission} aircraftId={aircraftId} onSubmit={onSubmit} loading={loading} />
      </div>
    </Modal>
  );
}
