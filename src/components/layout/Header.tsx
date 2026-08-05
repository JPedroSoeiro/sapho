import React from 'react';
import { Wind } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
              <Wind className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">SAPHO</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Helicopter Part Management</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
