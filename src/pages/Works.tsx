import { useState } from 'react';
import { portfolioWorks } from '../data/works'; 
import { Star, GitFork, ExternalLink } from 'lucide-react';
import Sticker from '../components/UI/Sticker';

const langColors: Record<string, string> = {
  'Python': '#3572A5', 'Dart': '#00B4AB', 'C++': '#f34b7d',
  'TypeScript': '#3178c6', 'JavaScript': '#f1e05a',
};

export default function Works() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'AI/ML', 'Robotics', 'Computer Vision', 'Flutter', 'Community'];

  const displayedWorks = filter === 'All' 
    ? portfolioWorks 
    : portfolioWorks.filter(work => work.tags.includes(filter as any));

  // Helper to render a cluster of stickers on a specific side
  const renderStickerCluster = (work: typeof portfolioWorks[0], side: 'left' | 'right') => {
    const sideStickers = work.stickers?.filter(s => s.position === side) || [];
    if (sideStickers.length === 0) return null;

    return (
      <div className="relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 hidden md:block">
        {sideStickers.map((sticker, idx) => (
          <div 
            key={idx} 
            className="absolute" 
            style={{ 
              left: `${sticker.offsetX || 0}px`, 
              top: `${sticker.offsetY || 0}px`,
              zIndex: idx // Later stickers in the array render on top
            }}
          >
            <Sticker 
              src={sticker.src} 
              alt={sticker.alt || work.title}
              size={sticker.size || 80}
              initialRotation={sticker.rotation || 0}
            />
          </div>
        ))}
      </div>
    );
  };

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

      <div className="flex flex-col gap-16">
        {displayedWorks.map(work => (
          <div key={work.id} className="flex flex-col md:flex-row items-center gap-8">
            
            {/* LEFT STICKER CLUSTER */}
            {renderStickerCluster(work, 'left')}

            {/* THE ARCHIVAL CARD */}
            <div className="archival-card flex flex-col group w-full max-w-2xl relative z-10">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-medium text-[#292524] dark:text-[#fafaf9] group-hover:text-[#c2410c] transition-colors">
                  {work.title}
                </h3>
                <span className="text-xs font-mono text-[#78716c] dark:text-[#a8a29e]">{new Date(work.date).getFullYear()}</span>
              </div>
              
              <p className="text-[#44403c] dark:text-[#d6d3d1] mb-6 flex-grow text-sm leading-relaxed">{work.description}</p>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#e7e5e4] dark:border-[#44403c]">
                <div className="flex items-center gap-4 text-xs font-mono text-[#78716c] dark:text-[#a8a29e]">
                  {work.tags.includes('Flutter') && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: langColors['Dart'] }}></span> Dart
                    </span>
                  )}
                  {work.tags.includes('AI/ML') && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: langColors['Python'] }}></span> Python
                    </span>
                  )}
                  {work.githubUrl && work.stars !== undefined && <span className="flex items-center gap-1"><Star size={14} /> {work.stars}</span>}
                  {work.githubUrl && work.forks !== undefined && <span className="flex items-center gap-1"><GitFork size={14} /> {work.forks}</span>}
                </div>

                <a href={work.githubUrl || '#'} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#c2410c] hover:text-[#9a3412] transition-colors flex items-center gap-1">
                  View <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* RIGHT STICKER CLUSTER */}
            {renderStickerCluster(work, 'right')}

          </div>
        ))}
      </div>
    </div>
  );
}