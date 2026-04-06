import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout Component
 * Wrapper para todas as páginas com Navbar e Footer
 */

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
