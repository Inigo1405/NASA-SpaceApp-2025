// src/components/layout/MainLayout.tsx
import type { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;