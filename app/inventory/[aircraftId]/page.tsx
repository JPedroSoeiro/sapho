'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useParts } from '@/hooks/useParts';
import { useAircraft } from '@/contexts/AircraftContext';
import { HelicopterPart } from '@/types/part';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { InventoryTable } from '@/components/modules/inventory/InventoryTable';
import { PartModal } from '@/components/modules/inventory/PartModal';
import { DeletePartModal } from '@/components/modules/inventory/DeletePartModal';
import { Input } from '@/components/ui/Input';
import { Plus, Search, ChevronLeft } from 'lucide-react';

export default function InventoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const aircraftId = params.aircraftId as string;

  const { getAircraftById } = useAircraft();
  const { parts, loading, error, addPart, updatePart, deletePart, searchParts } = useParts();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<HelicopterPart | undefined>();
  const [partToDelete, setPartToDelete] = useState<HelicopterPart | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const aircraft = getAircraftById(aircraftId);
  const aircraftParts = parts.filter((p) => p.aircraftId === aircraftId);
  const filteredParts = searchQuery ? searchParts(searchQuery).filter((p) => p.aircraftId === aircraftId) : aircraftParts;

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
    setIsSubmitting(true);
    try {
      if (partToDelete) {
        await deletePart(partToDelete.id);
        setIsDeleteModalOpen(false);
        setPartToDelete(undefined);
      }
    } catch (error) {
      console.error('Erro ao deletar peça:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  if (!aircraft) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400 text-lg">Aeronave não encontrada</p>
          <Button variant="primary" onClick={() => router.back()} className="mt-4">
            Voltar
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* Header com botão voltar */}
      <div className="mb-8 flex items-center gap-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.back()}
          className="gap-1"
        >
          <ChevronLeft size={16} />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Estoque - {aircraft.registration}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {aircraft.name} • {aircraftParts.length} peças cadastradas
          </p>
        </div>
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

      <PartModal
        isOpen={isFormModalOpen}
        part={selectedPart}
        aircraftId={aircraftId}
        loading={isSubmitting}
        onSubmit={handleFormSubmit}
        onClose={handleCloseForm}
      />

      <DeletePartModal
        isOpen={isDeleteModalOpen}
        part={partToDelete}
        loading={isSubmitting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </Container>
  );
}
