'use client';

import React from 'react';
import Link from 'next/link';
import { Aircraft } from '@/types/aircraft';
import { formatDate } from '@/utils/formatters';

interface AircraftSelectorProps {
  aircraft: Aircraft[];
  routePrefix: string;
}

export function AircraftSelector({ aircraft, routePrefix }: AircraftSelectorProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'maintenance':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'grounded':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Operacional';
      case 'maintenance':
        return 'Manutenção';
      case 'grounded':
        return 'Parado';
      default:
        return status;
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-700 dark:text-green-300';
      case 'maintenance':
        return 'text-yellow-700 dark:text-yellow-300';
      case 'grounded':
        return 'text-red-700 dark:text-red-300';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {aircraft.map((craft) => (
        <Link
          key={craft.id}
          href={`${routePrefix}/${craft.id}`}
          className={`border-2 rounded-lg p-6 transition-all hover:shadow-lg hover:scale-105 cursor-pointer ${getStatusColor(
            craft.operationalStatus
          )}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{craft.name}</h3>
              <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">{craft.registration}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusTextColor(craft.operationalStatus)}`}>
              {getStatusLabel(craft.operationalStatus)}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Modelo:</span>
              <span className="font-medium text-gray-900 dark:text-white">{craft.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Ano:</span>
              <span className="font-medium text-gray-900 dark:text-white">{craft.manufacturingYear}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Horas Totais:</span>
              <span className="font-medium text-gray-900 dark:text-white">{craft.totalFlightHours}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Última Manutenção:</span>
              <span className="font-medium text-gray-900 dark:text-white">{formatDate(craft.lastMaintenanceDate)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
