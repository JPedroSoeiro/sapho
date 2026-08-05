import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  variant?: 'ok' | 'warning' | 'critical' | 'default';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Badge({ variant = 'default', size = 'md', children, icon }: BadgeProps) {
  const variantStyles = {
    ok: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span className={clsx('inline-flex items-center gap-1.5 font-medium rounded-full', variantStyles[variant], sizeStyles[size])}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
