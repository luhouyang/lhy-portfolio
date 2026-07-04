import { useState } from 'react';
import { portfolioWorks } from '../data/works'; 

export default function Works() {
  const [filter, setFilter] = useState('All');
  // Updated to match your real skills
  const filters = ['All', 'AI/ML', 'Robotics', 'Computer Vision', 'Flutter', 'Community'];

  const displayedWorks = filter === 'All' 
    ? portfolioWorks 
    : portfolioWorks.filter(work => work.tags.includes(filter as any));

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-4xl font-semibold mb-6 text-[#292524] dark:text-[#fafaf9]">Portfolio & Research</h1>
        <div className="flex flex-wrap gap-3">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-mono transition-colors border ${
                filter === f 
                  ? 'bg-[#c2410c] text-white border-[#c2410c]' 
                  : 'bg-[#f5f5f4] dark:bg-[#292524] text-[#44403c] dark:text-[#d6d3d1] hover:border-[#c2410c] hover:text-[#c2410c] border-[#e7e5e4] dark:border-[#44403c]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedWorks.map(work => (
          <div key={work.id} className="archival-card flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-medium text-[#292524] dark:text-[#fafaf9]">{work.title}</h3>
              <span className="text-xs font-mono text-[#78716c] dark:text-[#a8a29e]">{new Date(work.date).getFullYear()}</span>
            </div>
            <p className="text-[#44403c] dark:text-[#d6d3d1] mb-6 flex-grow">{work.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex gap-2 flex-wrap">
                {work.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-[#f5f5f4] dark:bg-[#1c1917] rounded text-[#78716c] dark:text-[#a8a29e] border border-[#e7e5e4] dark:border-[#44403c]">{tag}</span>
                ))}
              </div>
              <a 
                href={work.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-sm font-semibold text-[#c2410c] hover:text-[#9a3412] transition-colors ml-4 whitespace-nowrap"
              >
                View &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}