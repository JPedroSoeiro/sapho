'use client';

import React from 'react';
import { HelicopterMission, MissionType } from '@/types/mission';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate, formatDurationHHMM, formatFlightHours } from '@/utils/formatters';
import {
  Calendar,
  Clock,
  User,
  Edit2,
  Trash2,
  HeartPulse,
  Shield,
  Package,
  Flame,
  GraduationCap,
  Wrench,
  MoreHorizontal,
  type LucideIcon,
} from 'lucide-react';

interface MissionCardProps {
  mission: HelicopterMission;
  onEdit: (mission: HelicopterMission) => void;
  onDelete: (mission: HelicopterMission) => void;
}

const MISSION_TYPE_ICON: Record<MissionType, LucideIcon> = {
  'Resgate Aeromédico': HeartPulse,
  Patrulhamento: Shield,
  Transporte: Package,
  'Combate a Incêndio': Flame,
  Treinamento: GraduationCap,
  'Manutenção/Teste': Wrench,
  Outro: MoreHorizontal,
};

const MISSION_TYPE_ICON_COLOR: Record<MissionType, string> = {
  'Resgate Aeromédico': 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  Patrulhamento: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  Transporte: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  'Combate a Incêndio': 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20',
  Treinamento: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20',
  'Manutenção/Teste': 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700',
  Outro: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700',
};

export function MissionCard({ mission, onEdit, onDelete }: MissionCardProps) {
  const Icon = MISSION_TYPE_ICON[mission.missionType];
  const iconColor = MISSION_TYPE_ICON_COLOR[mission.missionType];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 p-2.5 rounded-lg ${iconColor}`}>
          <Icon size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">{mission.title}</h3>
            <Badge variant="default" size="sm">
              {mission.missionType}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(mission.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {formatFlightHours(mission.durationHours)} ({formatDurationHHMM(mission.durationHours)})
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {mission.pilotInCommand}
            </span>
          </div>

          {mission.notes && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">{mission.notes}</p>
          )}
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(mission)}
            className="p-1.5"
            title="Editar"
          >
            <Edit2 size={16} />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(mission)}
            className="p-1.5"
            title="Deletar"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
