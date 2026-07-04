import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-12 relative z-10">
        <Outlet />
      </main>
      <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800">
        <p>&copy; {new Date().getFullYear()} Aspiring Researcher. Built with React & WebGL.</p>
      </footer>
    </div>
  );
}