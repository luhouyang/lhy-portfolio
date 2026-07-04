import { useState, useMemo } from 'react';
import type { WorkTag } from '../types';
import { portfolioWorks } from '../data/works';

export function useWorksFilter() {
  const [activeTags, setActiveTags] = useState<WorkTag[]>([]);

  const toggleTag = (tag: WorkTag) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // O(N) filtering via useMemo for zero-lag performance
  const filteredWorks = useMemo(() => {
    if (activeTags.length === 0) return portfolioWorks;
    return portfolioWorks.filter(work => 
      work.tags.some(tag => activeTags.includes(tag))
    );
  }, [activeTags]);

  return { activeTags, toggleTag, filteredWorks };
}