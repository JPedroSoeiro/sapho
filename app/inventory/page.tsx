'use client';

import React, { useState } from 'react';
import { useParts } from '@/hooks/useParts';
import { HelicopterPart } from '@/types/part';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Container } from '@/components/layout/Container';
import { InventoryTable } from '@/components/modules/inventory/InventoryTable';
import { PartForm } from '@/components/modules/inventory/PartForm';
import { Input } from '@/components/ui/Input';
import { Plus, Search, Trash2 } from 'lucide-react';

export default function InventoryPage() {
  const { parts, loading, error, addPart, updatePart, deletePart, searchParts } = useParts();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<HelicopterPart | undefined>();
  const [partToDelete, setPartToDelete] = useState<HelicopterPart | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredParts = searchQuery ? searchParts(searchQuery) : parts;

  const handleOpenForm = (part?: HelicopterPart) => {
    setSelectedPart(part);
    setIsFormModalOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormModalOpen(false);
    setSelectedPart(undefined);
  };

  const handleFormSubmit = async (partData: Omit<HelicopterPart, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsSubmitting(true);
    try {
      if (selectedPart) {
        await updatePart(selectedPart.id, partData);
      } else {
        await addPart(partData);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Erro ao salvar peça:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (part: HelicopterPart) => {
    setPartToDelete(part);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (partToDelete) {
      try {
        await deletePart(partToDelete.id);
        setIsDeleteModalOpen(false);
        setPartToDelete(undefined);
      } catch (error) {
        console.error('Erro ao deletar peça:', error);
      }
    }
  };

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gestão de Estoque</h1>
        <p className="text-gray-600 dark:text-gray-400">Cadastre, edite e remova componentes do inventário</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome ou serial number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>

          <Button variant="primary" onClick={() => handleOpenForm()} className="gap-2">
            <Plus size={18} />
            Nova Peça
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <InventoryTable
          parts={filteredParts}
          onEdit={handleOpenForm}
          onDelete={handleDeleteClick}
          loading={loading}
        />
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseForm}
        title={selectedPart ? 'Editar Peça' : 'Cadastrar Nova Peça'}
        size="lg"
      >
        <PartForm part={selectedPart} onSubmit={handleFormSubmit} loading={isSubmitting} />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Deletar
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Trash2 className="text-red-500 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Tem certeza que deseja deletar esta peça?
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <strong>{partToDelete?.name}</strong> ({partToDelete?.serialNumber})
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Esta ação não pode ser desfeita.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
