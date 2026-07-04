import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="relative p-2 rounded-full border border-[#fed7aa] dark:border-[#fdba74] 
                 bg-[#9a3412] dark:bg-[#431407]
                 hover:bg-[#7c2d12] dark:hover:bg-[#9a3412]
                 text-[#fdfbf7] dark:text-[#fafaf9] 
                 transition-all duration-300 ease-in-out shadow-sm"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <Sun className={`absolute inset-0 w-5 h-5 transition-transform duration-500 ${
          theme === 'dark' ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
        }`} />
        <Moon className={`absolute inset-0 w-5 h-5 transition-transform duration-500 ${
          theme === 'dark' ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`} />
      </div>
    </button>
  );
}