import { Link } from 'react-router-dom';
import { tutorials } from '../data/tutorials';

export default function AcademyCatalog() {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-4xl font-semibold mb-4 text-[#292524] dark:text-[#fafaf9]">Open Academy</h1>
        <p className="text-lg text-[#44403c] dark:text-[#d6d3d1]">Interactive visual guides to complex systems, machine learning, and mathematics.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map(tutorial => (
          <Link key={tutorial.slug} to={`/academy/${tutorial.slug}`} className="group block">
            <div className="archival-card group-hover:border-[#c2410c] transition-colors">
              <span className="text-sm font-mono text-[#78716c] dark:text-[#a8a29e] block mb-2">{tutorial.date}</span>
              <h3 className="text-2xl font-medium text-[#292524] dark:text-[#fafaf9] group-hover:text-[#c2410c] transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-[#44403c] dark:text-[#d6d3d1] mt-3 flex items-center gap-2">
                Read Interactive Article <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}