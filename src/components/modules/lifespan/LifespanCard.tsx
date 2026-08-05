import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { PartWithCalculatedLifespan } from '@/types/part';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { formatDate } from '@/utils/formatters';

interface LifespanCardProps {
  part: PartWithCalculatedLifespan;
}

export function LifespanCard({ part }: LifespanCardProps) {
  const getStatusIcon = (criticalityLevel: string) => {
    switch (criticalityLevel) {
      case 'healthy':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'alert':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'critical':
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{part.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">SN: {part.serialNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(part.criticalityLevel)}
          <Badge
            variant={part.criticalityLevel === 'healthy' ? 'ok' : part.criticalityLevel === 'alert' ? 'warning' : 'critical'}
            size="sm"
          >
            {part.criticalityLevel === 'healthy' && 'OK'}
            {part.criticalityLevel === 'alert' && 'Alerta'}
            {part.criticalityLevel === 'critical' && 'Crítico'}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tempo de Calendário</label>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {part.daysUsed}d / {part.maxLifespanDays}d
            </span>
          </div>
          <Progress
            value={part.calendarPercentage}
            max={100}
            variant={part.criticalityLevel}
            size="md"
            showLabel={false}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Horas de Voo (TBO)</label>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {part.currentFlightHours}h / {part.maxFlightHoursTBO}h
            </span>
          </div>
          <Progress
            value={part.hoursPercentage}
            max={100}
            variant={part.criticalityLevel}
            size="md"
            showLabel={false}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Dias Restantes</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{Math.max(0, part.daysRemaining)}d</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Horas Restantes</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{Math.max(0, part.hoursRemaining)}h</p>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Instalado em: {formatDate(part.installDate)}
      </div>
    </div>
  );
}
