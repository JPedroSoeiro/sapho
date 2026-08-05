'use client';

import React from 'react';
import { HelicopterPart } from '@/types/part';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

interface DeletePartModalProps {
  isOpen: boolean;
  part?: HelicopterPart;
  loading?: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export function DeletePartModal({
  isOpen,
  part,
  loading = false,
  onConfirm,
  onCancel,
}: DeletePartModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Confirmar Exclusão"
      size="md"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white">
              Deseja realmente deletar esta peça?
            </p>
            {part && (
              <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Nome:</span> {part.name}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Serial:</span> {part.serialNumber}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Categoria:</span> {part.category}
                </p>
              </div>
            )}
            <p className="mt-4 text-xs text-red-600 dark:text-red-400">
              ⚠️ Esta ação não pode ser desfeita. Os dados será permanentemente removido.
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-2 justify-end border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={loading}
          >
            Deletar Peça
          </Button>
        </div>
      </div>
    </Modal>
  );
}
