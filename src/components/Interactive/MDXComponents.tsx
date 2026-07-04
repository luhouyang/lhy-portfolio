import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#f5f3ee',
    primaryTextColor: '#334155',
    primaryBorderColor: '#cbd5e1',
    lineColor: '#64748b',
    secondaryColor: '#e8e4d9',
    tertiaryColor: '#161618',
    fontFamily: 'Inter, system-ui, sans-serif'
  }
});

interface MermaidRendererProps {
  chart: string;
}

export const MermaidRenderer = ({ chart }: MermaidRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = chart;
      mermaid.run({ nodes: [containerRef.current] });
    }
  }, [chart]);

  return <div ref={containerRef} className="my-8 flex justify-center bg-white/50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800" />;
};