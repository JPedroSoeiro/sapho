'use client';

import React, { createContext, useContext } from 'react';
import { Aircraft } from '@/types/aircraft';
import { INITIAL_AIRCRAFT_MOCK } from '@/lib/mock/initialAircraftMock';

interface AircraftContextType {
  aircraft: Aircraft[];
  getAircraftById: (id: string) => Aircraft | undefined;
}

const AircraftContext = createContext<AircraftContextType | undefined>(undefined);

export function AircraftProvider({ children }: { children: React.ReactNode }) {
  const getAircraftById = (id: string) => {
    return INITIAL_AIRCRAFT_MOCK.find((a) => a.id === id);
  };

  return (
    <AircraftContext.Provider
      value={{
        aircraft: INITIAL_AIRCRAFT_MOCK,
        getAircraftById,
      }}
    >
      {children}
    </AircraftContext.Provider>
  );
}

export function useAircraft() {
  const context = useContext(AircraftContext);
  if (!context) {
    throw new Error('useAircraft deve ser usado dentro de AircraftProvider');
  }
  return context;
}
