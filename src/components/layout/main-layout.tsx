import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
      {children}
    </main>
  );
}
