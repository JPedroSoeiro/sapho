'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAircraft } from '@/contexts/AircraftContext';
import { useParts } from '@/hooks/useParts';
import { HelicopterMission } from '@/types/mission';
import { HelicopterPart, PartStatus } from '@/types/part';
import { missionService } from '@/services/missionService';
import { partService } from '@/services/partService';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { MissionList } from '@/components/modules/missions/MissionList';
import { MissionFormModal } from '@/components/modules/missions/MissionFormModal';
import { DeleteMissionModal } from '@/components/modules/missions/DeleteMissionModal';
import { Plus, ChevronLeft, TrendingUp, TrendingDown } from 'lucide-react';

const STATUS_SEVERITY: Record<PartStatus, number> = { OK: 0, WARNING: 1, CRITICAL_AOG: 2 };

function summarizeImpact(before: HelicopterPart[], after: HelicopterPart[]) {
  const beforeMap = new Map(before.map((p) => [p.id, p.status]));
  let worsened = 0;
  let improved = 0;

  for (const part of after) {
    const prevStatus = beforeMap.get(part.id);
    if (!prevStatus) continue;

    const prevSeverity = STATUS_SEVERITY[prevStatus];
    const newSeverity = STATUS_SEVERITY[part.status];

    if (newSeverity > prevSeverity) worsened++;
    else if (newSeverity < prevSeverity) improved++;
  }

  return { worsened, improved, total: after.length };
}

export default function MissionsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const aircraftId = params.aircraftId as string;

  const { getAircraftById } = useAircraft();
  const { fetchParts } = useParts();

  const [missions, setMissions] = useState<HelicopterMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<HelicopterMission | undefined>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [missionToDelete, setMissionToDelete] = useState<HelicopterMission | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [impact, setImpact] = useState<{ worsened: number; improved: number; total: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const aircraft = getAircraftById(aircraftId);

  const loadMissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await missionService.getMissionsByAircraft(aircraftId);
      setMissions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar missões');
    } finally {
      setLoading(false);
    }
  }, [aircraftId]);

  useEffect(() => {
    loadMissions();
  }, [loadMissions]);

  const handleOpenForm = (mission?: HelicopterMission) => {
    setSelectedMission(mission);
    setImpact(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedMission(undefined);
  };

  const handleFormSubmit = async (data: Omit<HelicopterMission, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsSubmitting(true);
    try {
      const partsBefore = await partService.getByAircraft(aircraftId);

      const result = selectedMission
        ? await missionService.updateMission(selectedMission.id, data)
        : await missionService.createMission(data);

      const updatedParts = result?.updatedParts ?? [];

      setImpact(summarizeImpact(partsBefore, updatedParts));
      await loadMissions();
      await fetchParts();
      handleCloseForm();
    } catch (err) {
      console.error('Erro ao salvar missão:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar missão');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (mission: HelicopterMission) => {
    setMissionToDelete(mission);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!missionToDelete) return;

    setIsSubmitting(true);
    try {
      const partsBefore = await partService.getByAircraft(aircraftId);
      const result = await missionService.deleteMission(missionToDelete.id);

      if (result.success) {
        setImpact(summarizeImpact(partsBefore, result.updatedParts));
        await loadMissions();
        await fetchParts();
        setIsDeleteOpen(false);
        setMissionToDelete(undefined);
      }
    } catch (err) {
      console.error('Erro ao deletar missão:', err);
      setError(err instanceof Error ? err.message : 'Erro ao deletar missão');
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
        <Button variant="secondary" size="sm" onClick={() => router.back()} className="gap-1">
          <ChevronLeft size={16} />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Missões - {aircraft.registration}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {aircraft.name} • {missions.length} missões registradas
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {impact && (impact.worsened > 0 || impact.improved > 0) && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex flex-wrap items-center gap-4">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            🔧 {impact.total} peças recalculadas nesta aeronave.
          </p>
          {impact.worsened > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-red-700 dark:text-red-300 font-medium">
              <TrendingUp size={16} />
              {impact.worsened} peça{impact.worsened > 1 ? 's' : ''} piorou{impact.worsened > 1 ? 'ram' : ''} de status
            </span>
          )}
          {impact.improved > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-green-700 dark:text-green-300 font-medium">
              <TrendingDown size={16} />
              {impact.improved} peça{impact.improved > 1 ? 's' : ''} melhorou{impact.improved > 1 ? 'ram' : ''} de status
            </span>
          )}
        </div>
      )}

      <div className="mb-6 flex justify-end">
        <Button variant="primary" onClick={() => handleOpenForm()} className="gap-2">
          <Plus size={18} />
          Nova Missão
        </Button>
      </div>

      <MissionList
        missions={missions}
        onEdit={handleOpenForm}
        onDelete={handleDeleteClick}
        loading={loading}
      />

      <MissionFormModal
        isOpen={isFormOpen}
        mission={selectedMission}
        aircraftId={aircraftId}
        loading={isSubmitting}
        onSubmit={handleFormSubmit}
        onClose={handleCloseForm}
      />

      <DeleteMissionModal
        isOpen={isDeleteOpen}
        mission={missionToDelete}
        loading={isSubmitting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </Container>
  );
}
