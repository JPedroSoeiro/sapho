'use client';

import React from 'react';
import { HelicopterPart } from '@/types/part';
import { Modal } from '@/components/ui/Modal';
import { PartForm } from './PartForm';
import { PartWearHistory } from './PartWearHistory';

interface PartModalProps {
  isOpen: boolean;
  part?: HelicopterPart;
  aircraftId?: string;
  loading?: boolean;
  onSubmit: (partData: Omit<HelicopterPart, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onClose: () => void;
}

export function PartModal({
  isOpen,
  part,
  aircraftId,
  loading = false,
  onSubmit,
  onClose,
}: PartModalProps) {
  const isEditing = !!part;
  const title = isEditing ? '✏️ Editar Componente' : '➕ Nova Peça';
  const subtitle = isEditing
    ? `${part.name} (${part.serialNumber})`
    : 'Cadastre um novo componente no inventário';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-xs text-blue-800 dark:text-blue-300">
            💡 <span className="font-semibold">Dica:</span> Preencha todos os campos corretamente. Os valores de TBO e horas de voo são usados para calcular automaticamente o status da peça.
          </p>
        </div>

        {isEditing && <PartWearHistory partId={part.id} />}

        <PartForm
          part={part}
          aircraftId={aircraftId}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </Modal>
  );
}
