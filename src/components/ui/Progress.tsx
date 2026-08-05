import React from 'react';
import clsx from 'clsx';

interface ProgressProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'healthy' | 'alert' | 'critical';
}

export function Progress({ value, max = 100, showLabel = true, size = 'md', variant = 'healthy' }: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3',
  };

  const variantStyles = {
    healthy: 'bg-green-500 dark:bg-green-600',
    alert: 'bg-yellow-500 dark:bg-yellow-600',
    critical: 'bg-red-500 dark:bg-red-600',
  };

  const variantBgStyles = {
    healthy: 'bg-green-100 dark:bg-green-900',
    alert: 'bg-yellow-100 dark:bg-yellow-900',
    critical: 'bg-red-100 dark:bg-red-900',
  };

  return (
    <div className="w-full">
      <div className={clsx('w-full rounded-full overflow-hidden', variantBgStyles[variant], sizeStyles[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-300', variantStyles[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
          {value.toFixed(1)} / {max.toFixed(1)} ({percentage.toFixed(1)}%)
        </p>
      )}
    </div>
  );
}
