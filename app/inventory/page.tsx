'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { AircraftSelector } from '@/components/modules/aircraft/AircraftSelector';
import { useAircraft } from '@/contexts/AircraftContext';

export default function InventorySelectPage() {
  const { aircraft } = useAircraft();

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Selecione uma Aeronave
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Escolha um helicóptero para gerenciar o estoque de seus componentes
        </p>
      </div>

      <AircraftSelector aircraft={aircraft} routePrefix="/inventory" />
    </Container>
  );
}
