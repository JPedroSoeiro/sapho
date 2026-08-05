'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useParts } from '@/hooks/useParts';
import { usePartLifespan } from '@/hooks/usePartLifespan';
import { useAircraft } from '@/contexts/AircraftContext';
import { Input } from '@/components/ui/Input';
import { Container } from '@/components/layout/Container';
import { LifespanCard } from '@/components/modules/lifespan/LifespanCard';
import { Search, AlertTriangle, CheckCircle, AlertCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils/formatters';

export default function MonitoringDetailPage() {
  const params = useParams();
  const router = useRouter();
  const aircraftId = params.aircraftId as string;

  const { getAircraftById } = useAircraft();
  const { parts, loading, error } = useParts();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'healthy' | 'alert' | 'critical'>('all');

  const aircraft = getAircraftById(aircraftId);
  const aircraftParts = parts.filter((p) => p.aircraftId === aircraftId);
  const partsWithLifespan = usePartLifespan(aircraftParts);

  const filteredParts = partsWithLifespan.filter((part) => {
    const matchesSearch =
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && part.criticalityLevel === filterStatus;
  });

  const criticalParts = partsWithLifespan.filter((p) => p.criticalityLevel === 'critical').length;
  const alertParts = partsWithLifespan.filter((p) => p.criticalityLevel === 'alert').length;
  const healthyParts = partsWithLifespan.filter((p) => p.criticalityLevel === 'healthy').length;

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
            {aircraft.name} - {aircraft.registration}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {aircraft.model} • {aircraft.manufacturingYear} • {aircraft.totalFlightHours}h totais
          </p>
        </div>
      </div>

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
            <div>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">Saudáveis</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{healthyParts}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={24} />
            <div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Alerta</p>
              <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{alertParts}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600 dark:text-red-400" size={24} />
            <div>
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">Crítico</p>
              <p className="text-2xl font-bold text-red-900 dark:text-red-100">{criticalParts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome ou serial number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'healthy', 'alert', 'critical'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white dark:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status === 'all' && 'Todos'}
                {status === 'healthy' && 'OK'}
                {status === 'alert' && 'Alerta'}
                {status === 'critical' && 'Crítico'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mensagens */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Componentes */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Carregando dados...</p>
        </div>
      ) : filteredParts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery ? 'Nenhuma peça encontrada' : 'Nenhuma peça cadastrada para esta aeronave'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredParts.map((part) => (
            <LifespanCard key={part.id} part={part} />
          ))}
        </div>
      )}
    </Container>
  );
}
