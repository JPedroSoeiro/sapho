'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error);
    console.error('Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-4">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Erro ao carregar página
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {this.state.error?.message || 'Ocorreu um erro desconhecido'}
            </p>
            <details className="text-sm text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto max-h-48">
              <summary className="cursor-pointer font-medium">Detalhes do erro</summary>
              <pre className="mt-2 text-xs whitespace-pre-wrap break-words">
                {this.state.error?.stack || 'Sem stack trace'}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
