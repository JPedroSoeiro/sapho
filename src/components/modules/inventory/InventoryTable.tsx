'use client';

import React, { useState } from 'react';
import { HelicopterPart } from '@/types/part';
import { formatDate, formatFlightHours } from '@/utils/formatters';
import { Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface InventoryTableProps {
  parts: HelicopterPart[];
  onEdit: (part: HelicopterPart) => void;
  onDelete: (part: HelicopterPart) => void;
  loading?: boolean;
}

export function InventoryTable({ parts, onEdit, onDelete, loading = false }: InventoryTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof HelicopterPart>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'OK':
        return 'ok';
      case 'WARNING':
        return 'warning';
      case 'CRITICAL_AOG':
        return 'critical';
      default:
        return 'default';
    }
  };

  const sortedParts = [...parts].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
              <button
                onClick={() => {
                  setSortColumn('name');
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }}
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Nome
              </button>
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
              Serial Number
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
              Categoria
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
              Data de Instalação
            </th>
            <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
              Status
            </th>
            <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                Carregando...
              </td>
            </tr>
          ) : parts.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                Nenhuma peça cadastrada
              </td>
            </tr>
          ) : (
            sortedParts.map((part) => (
              <tr
                key={part.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{part.name}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300 font-mono">{part.serialNumber}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{part.category}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(part.installDate)}</td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={getStatusBadgeVariant(part.status)} size="sm">
                    {part.status === 'OK' && 'OK'}
                    {part.status === 'WARNING' && 'Alerta'}
                    {part.status === 'CRITICAL_AOG' && 'Crítico'}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(part)}
                    className="p-1.5"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(part)}
                    className="p-1.5"
                    title="Deletar"
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
