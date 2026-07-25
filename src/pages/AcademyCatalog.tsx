import { Link } from "react-router-dom";
import { academyCatalog } from "../data/tutorials";
import type { AcademyCatalogItem, TutorialMeta, TutorialSectionSeparator } from "../types";

function isSectionSeparator(item: AcademyCatalogItem): item is TutorialSectionSeparator {
  return item.type === "section";
}

function SectionSeparator({ section }: { section: TutorialSectionSeparator }) {
  return (
    <div className="md:col-span-2 pt-6 first:pt-0">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold text-[#292524] dark:text-[#fafaf9]">{section.title}</h2>

        <div className="h-px flex-1 bg-[#e7e5e4] dark:bg-[#44403c]" />
      </div>

      {section.description && <p className="mt-2 text-sm text-[#78716c] dark:text-[#a8a29e] max-w-2xl">{section.description}</p>}
    </div>
  );
}

function TutorialCard({ tutorial }: { tutorial: TutorialMeta }) {
  return (
    <Link
      to={`/academy/${tutorial.slug}`}
      className="group block"
    >
      <div className="archival-card group-hover:border-[#c2410c] transition-all duration-300 group-hover:-translate-y-0.5">
        <span className="text-sm font-mono text-[#78716c] dark:text-[#a8a29e] block mb-2">{tutorial.date}</span>

        <h3 className="text-2xl font-medium text-[#292524] dark:text-[#fafaf9] group-hover:text-[#c2410c] transition-colors">
          {tutorial.title}
        </h3>

        <p className="text-[#44403c] dark:text-[#d6d3d1] mt-3 flex items-center gap-2">
          Read Interactive Article <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tutorial.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-1 rounded bg-[#f5f5f4] dark:bg-[#292524] text-[#78716c] dark:text-[#a8a29e] border border-[#e7e5e4] dark:border-[#44403c]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function AcademyCatalog() {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-4xl font-semibold mb-4 text-[#292524] dark:text-[#fafaf9]">Open Academy</h1>

        <p className="text-lg text-[#44403c] dark:text-[#d6d3d1]">
          Interactive visual guides to complex systems, machine learning, and mathematics.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {academyCatalog.map((item, index) => {
          if (isSectionSeparator(item)) {
            return (
              <SectionSeparator
                key={`section-${item.id}-${index}`}
                section={item}
              />
            );
          }

          return (
            <TutorialCard
              key={item.slug}
              tutorial={item}
            />
          );
        })}
      </div>
    </div>
  );
}
