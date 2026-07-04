import { useMemo, type ReactNode } from 'react';

interface TornPaperProps {
  children: ReactNode;
  className?: string;
}

export default function TornPaper({ children, className = '' }: TornPaperProps) {
  // Randomly pick a tear variation on mount
  const tearClass = useMemo(() => {
    const variations = ['tear-1', 'tear-2', 'tear-3', 'tear-4'];
    return variations[Math.floor(Math.random() * variations.length)];
  }, []);

  return (
    <div className={`torn-paper ${tearClass} bg-[#fcfbf8] dark:bg-[#1e242b] p-8 ${className}`}>
      {children}
    </div>
  );
}