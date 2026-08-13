'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Package, Plane } from 'lucide-react';
import clsx from 'clsx';

export function TabNavigation() {
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Monitoramento',
      href: '/monitoring',
      icon: Activity,
      description: 'Vida útil e desgaste',
    },
    {
      name: 'Estoque',
      href: '/inventory',
      icon: Package,
      description: 'Gestão de peças',
    },
    {
      name: 'Missões',
      href: '/missions',
      icon: Plane,
      description: 'Registro de voos',
    },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={clsx(
                  'flex items-center gap-2.5 px-1 py-4 border-b-2 text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                )}
              >
                <Icon size={18} />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
