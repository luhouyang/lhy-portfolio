import { publicationsData } from "../data/publications";
import { ExternalLink, BookText } from "lucide-react";

export default function Publications() {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-4xl font-semibold mb-4 text-[#292524] dark:text-[#fafaf9]">Publications</h1>
        <p className="text-lg text-[#44403c] dark:text-[#d6d3d1]">
          Academic papers, conference proceedings, and research contributions.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {publicationsData.map((section) => (
          <section key={section.year} className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold border-b border-[#e7e5e4] dark:border-[#44403c] pb-2 text-[#292524] dark:text-[#fafaf9]">
              {section.year}
            </h2>
            <div className="flex flex-col gap-6">
              {section.items.map((pub) => (
                <div key={pub.id} className="archival-card group transition-transform duration-300 hover:-translate-y-0.5">
                  <h3 className="text-xl font-medium text-[#292524] dark:text-[#fafaf9] group-hover:text-[#c2410c] transition-colors mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-[#78716c] dark:text-[#a8a29e] mb-3 text-sm font-mono">
                    {pub.authors.join(", ")}
                  </p>
                  <p className="text-[#44403c] dark:text-[#d6d3d1] mb-4 text-sm flex items-start gap-2">
                    <BookText size={16} className="mt-0.5 shrink-0 text-[#c2410c]" />
                    <span>{pub.booktitle}</span>
                  </p>
                  <div className="flex flex-wrap gap-3 items-center justify-between border-t border-[#e7e5e4] dark:border-[#44403c] pt-4">
                    <span className="text-xs text-[#78716c] dark:text-[#a8a29e] italic">
                      {pub.note}
                    </span>
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-[#c2410c] hover:text-[#9a3412] transition-colors flex items-center gap-1"
                      >
                        View Paper <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}