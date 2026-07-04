import { useEffect } from 'react';

export function useParallax() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Map mouse position to a -15px to +15px range
      const x = (e.clientX / window.innerWidth - 0.5) * 30; 
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      
      document.documentElement.style.setProperty('--mx', `${x}px`);
      document.documentElement.style.setProperty('--my', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
}