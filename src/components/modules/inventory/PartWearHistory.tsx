'use client';

import React, { useEffect, useState } from 'react';
import { WearLedgerEntry } from '@/types/wearLedger';
import { missionService } from '@/services/missionService';
import { formatDateTime } from '@/utils/formatters';
import { History, TrendingUp, TrendingDown } from 'lucide-react';

interface PartWearHistoryProps {
  partId: string;
}

function formatSignedHours(hours: number): string {
  const sign = hours >= 0 ? '+' : '';
  return `${sign}${hours.toFixed(2)}h`;
}

export function PartWearHistory({ partId }: PartWearHistoryProps) {
  const [entries, setEntries] = useState<WearLedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    missionService.getWearContributionsForPart(partId).then((data) => {
      if (!cancelled) {
        setEntries(data);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [partId]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <History size={16} className="text-gray-500 dark:text-gray-400" />
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          Histórico de Desgaste por Missão
        </h4>
      </div>

      {loading ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">Carregando histórico...</p>
      ) : entries.length === 0 ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Nenhuma missão registrada nesta sessão para esta peça. O desgaste inicial vem do
          histórico da frota, não de missões individuais rastreadas.
        </p>
      ) : (
        <ul className="space-y-1.5 max-h-40 overflow-y-auto">
          {entries.map((entry) => {
            const isPositive = entry.hoursApplied >= 0;
            return (
              <li key={entry.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  {isPositive ? (
                    <TrendingUp size={13} className="text-red-500 flex-shrink-0" />
                  ) : (
                    <TrendingDown size={13} className="text-green-500 flex-shrink-0" />
                  )}
                  <span className="text-gray-700 dark:text-gray-300 truncate" title={entry.missionTitle}>
                    {entry.missionTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-gray-400 dark:text-gray-500">{formatDateTime(entry.appliedAt)}</span>
                  <span
                    className={
                      isPositive
                        ? 'text-red-600 dark:text-red-400 font-medium'
                        : 'text-green-600 dark:text-green-400 font-medium'
                    }
                  >
                    {formatSignedHours(entry.hoursApplied)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
