'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, actions, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 transition-opacity"
          onClick={onClose}
        />

        <div
          className={clsx(
            'inline-block align-bottom bg-white dark:bg-gray-800',
            'rounded-lg text-left overflow-hidden shadow-xl',
            'transform transition-all sm:align-middle w-full',
            sizeStyles[size]
          )}
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 id="modal-title" className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-6 py-4 text-gray-700 dark:text-gray-300">{children}</div>

          {actions && <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 flex gap-3 justify-end">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
