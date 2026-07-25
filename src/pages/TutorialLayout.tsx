import { useEffect, useState, Suspense, lazy, type ComponentType } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import Sticker from "../components/UI/Sticker";

// Standard Archival Elements
import { H1, H2, H3, P, A, Blockquote, UL, OL, LI, IMG, Pre, Code } from "../components/Interactive/MDXElements";

import { tutorials } from "../data/tutorials";
import type { RecommendedBook } from "../types";

// Recursive glob: matches MDX files at any folder depth under content/academy
const mdxModules = import.meta.glob("../content/academy/**/*.mdx");

// Lazy load the heavy interactive engines
const Mermaid = lazy(() => import("../components/Interactive/Visualizers").then((mod) => ({ default: mod.Mermaid })));
const RoPEVisualizer = lazy(() =>
  import("../components/Interactive/Visualizers").then((mod) => ({ default: mod.RoPEVisualizer })),
);
const SwarmCanvas = lazy(() => import("../components/Interactive/Visualizers").then((mod) => ({ default: mod.SwarmCanvas })));
const MathSurfacePlotter = lazy(() =>
  import("../components/Interactive/Visualizers").then((mod) => ({ default: mod.MathSurfacePlotter })),
);
const ChaosCanvas = lazy(() => import("../components/Interactive/Visualizers").then((mod) => ({ default: mod.ChaosCanvas })));
const DiffusionCanvas = lazy(() =>
  import("../components/Interactive/Visualizers").then((mod) => ({ default: mod.DiffusionCanvas })),
);
const CNNKernelVisualizer = lazy(() =>
  import("../components/Interactive/Visualizers").then((mod) => ({ default: mod.CNNKernelVisualizer })),
);
const QuantumGateSimulator = lazy(() =>
  import("../components/Interactive/Visualizers").then((mod) => ({ default: mod.QuantumGateSimulator })),
);

const Skeleton = () => (
  <div className="h-64 bg-[#f5f5f4] dark:bg-[#292524] animate-pulse rounded-lg my-8 border border-[#e7e5e4] dark:border-[#44403c]" />
);

type ReadingMode = "simple" | "full";

const MODE_STORAGE_KEY = "lhy-academy-reading-mode";

function RecommendedBooks({ books }: { books: RecommendedBook[] }) {
  // Slight scattered rotations for an organic, sticker-sheet feel
  const rotations = [-5, 3, -2, 6, -4, 2];

  return (
    <section className="pt-10 border-t border-[#e7e5e4] dark:border-[#44403c]">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen
          size={22}
          className="text-[#c2410c]"
        />
        <h2 className="text-2xl font-semibold text-[#292524] dark:text-[#fafaf9]">Recommended Books</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book, index) => {
          const rotation = rotations[index % rotations.length];

          return (
            <div
              key={book.title}
              className="group flex flex-col items-center gap-3 text-center"
            >
              {/* Draggable book-cover sticker */}
              <div className="relative flex items-center justify-center h-56 w-full">
                <Sticker
                  src={book.cover}
                  alt={`${book.title} book cover`}
                  size={160}
                  initialRotation={rotation}
                />
              </div>

              {/* Book details */}
              <div>
                <h3 className="font-medium text-[#292524] dark:text-[#fafaf9] group-hover:text-[#c2410c] transition-colors leading-snug">
                  {book.title}
                </h3>

                {book.author && <p className="text-sm text-[#78716c] dark:text-[#a8a29e] mt-1">{book.author}</p>}

                {book.note && <p className="text-xs text-[#78716c] dark:text-[#a8a29e] mt-2 leading-relaxed">{book.note}</p>}
              </div>

              {/* Kept separate from the sticker so dragging and clicking don't conflict */}
              <a
                href={book.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-[#c2410c] hover:text-[#9a3412] transition-colors"
              >
                Get Book <ExternalLink size={12} />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function TutorialLayout() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [Content, setContent] = useState<ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  // The wildcard route (/academy/*) puts the full nested path into params["*"]
  // e.g. "quantum-computing-basics" or "ai-ml/convolutional-neural-networks"
  const slug = (params["*"] ?? "").replace(/^\/+|\/+$/g, "");

  const tutorial = tutorials.find((item) => item.slug === slug);

  const mode: ReadingMode = (() => {
    const paramMode = searchParams.get("mode");

    if (paramMode === "simple" || paramMode === "full") {
      return paramMode;
    }

    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem(MODE_STORAGE_KEY);

      if (storedMode === "simple" || storedMode === "full") {
        return storedMode;
      }
    }

    return "full";
  })();

  // Nested-aware paths. For slug "ai-ml/cnn" these resolve to:
  //   ../content/academy/ai-ml/cnn.simple.mdx
  //   ../content/academy/ai-ml/cnn.mdx
  const simplePath = `../content/academy/${slug}.simple.mdx`;
  const fullPath = `../content/academy/${slug}.mdx`;

  const hasSimple = Boolean(mdxModules[simplePath]);
  const hasFull = Boolean(mdxModules[fullPath]);

  const preferredPath = mode === "simple" ? simplePath : fullPath;
  const fallbackPath = mode === "simple" ? fullPath : simplePath;

  const selectedPath = mdxModules[preferredPath] ? preferredPath : mdxModules[fallbackPath] ? fallbackPath : undefined;

  const effectiveMode: ReadingMode = selectedPath === simplePath ? "simple" : "full";

  const otherMode: ReadingMode = effectiveMode === "simple" ? "full" : "simple";

  const canSwitchToOther = otherMode === "simple" ? hasSimple : hasFull;

  const setMode = (nextMode: ReadingMode) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(MODE_STORAGE_KEY, nextMode);
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("mode", nextMode);
    setSearchParams(nextParams, { replace: true });
  };

  useEffect(() => {
    let cancelled = false;

    setContent(null);
    setError(null);

    if (!slug) {
      setError("Article not found.");
      return;
    }

    if (!selectedPath) {
      setError("Article not found.");
      return;
    }

    const loadModule = mdxModules[selectedPath];

    if (!loadModule) {
      setError("Article not found.");
      return;
    }

    loadModule()
      .then((module: any) => {
        if (!cancelled) {
          setContent(() => module.default);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Failed to load article.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug, selectedPath]);

  if (error) {
    return (
      <div className="text-center py-20 space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#991b1b] dark:text-red-400">{error}</h2>

        <Link
          to="/academy"
          className="text-[#c2410c] hover:underline"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  if (!Content) {
    return <Skeleton />;
  }

  // THE MASTER DICTIONARY
  const mdxComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    a: A,
    blockquote: Blockquote,
    ul: UL,
    ol: OL,
    li: LI,
    img: IMG,
    pre: Pre,
    code: Code,

    Mermaid: (props: any) => (
      <Suspense fallback={<Skeleton />}>
        <Mermaid {...props} />
      </Suspense>
    ),
    RoPEVisualizer: (props: any) => (
      <Suspense fallback={<Skeleton />}>
        <RoPEVisualizer {...props} />
      </Suspense>
    ),
    SwarmCanvas: (props: any) => (
      <Suspense fallback={<Skeleton />}>
        <SwarmCanvas {...props} />
      </Suspense>
    ),
    MathSurfacePlotter: (props: any) => (
      <Suspense fallback={<Skeleton />}>
        <MathSurfacePlotter {...props} />
      </Suspense>
    ),
    ChaosCanvas: (props: any) => (
      <Suspense fallback={<Skeleton />}>
        <ChaosCanvas {...props} />
      </Suspense>
    ),
    DiffusionCanvas: (props: any) => (
      <Suspense fallback={<Skeleton />}>
        <DiffusionCanvas {...props} />
      </Suspense>
    ),
    CNNKernelVisualizer: (props: any) => (
      <Suspense fallback={<Skeleton />}>
        <CNNKernelVisualizer {...props} />
      </Suspense>
    ),
    QuantumGateSimulator: (props: any) => (
      <Suspense fallback={<Skeleton />}>
        <QuantumGateSimulator {...props} />
      </Suspense>
    ),
    Sticker: Sticker,
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      {/* Top navigation + reading mode toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/academy"
          className="inline-flex items-center gap-2 text-sm font-mono text-[#78716c] dark:text-[#a8a29e] hover:text-[#c2410c] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Catalogue
        </Link>

        <div className="inline-flex items-center gap-1 rounded-lg border border-[#e7e5e4] dark:border-[#44403c] bg-[#f5f5f4] dark:bg-[#292524] p-1">
          <button
            type="button"
            onClick={() => setMode("simple")}
            disabled={!hasSimple || mode === "simple"}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              mode === "simple" ? "bg-[#c2410c] text-white" : "text-[#44403c] dark:text-[#d6d3d1] hover:text-[#c2410c]"
            }`}
          >
            Simple
          </button>

          <button
            type="button"
            onClick={() => setMode("full")}
            disabled={!hasFull || mode === "full"}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              mode === "full" ? "bg-[#c2410c] text-white" : "text-[#44403c] dark:text-[#d6d3d1] hover:text-[#c2410c]"
            }`}
          >
            Full
          </button>
        </div>
      </div>

      {/* Fallback notices */}
      {mode === "simple" && effectiveMode === "full" && hasFull && !hasSimple && (
        <div className="text-sm font-mono text-[#78716c] dark:text-[#a8a29e] rounded-lg border border-[#e7e5e4] dark:border-[#44403c] bg-[#f5f5f4] dark:bg-[#292524] px-4 py-3">
          Simple version not available yet. Showing full article.
        </div>
      )}

      {mode === "full" && effectiveMode === "simple" && hasSimple && !hasFull && (
        <div className="text-sm font-mono text-[#78716c] dark:text-[#a8a29e] rounded-lg border border-[#e7e5e4] dark:border-[#44403c] bg-[#f5f5f4] dark:bg-[#292524] px-4 py-3">
          Full version not available yet. Showing simple article.
        </div>
      )}

      {/* The Article */}
      <article>
        <Suspense fallback={<Skeleton />}>
          <Content components={mdxComponents} />
        </Suspense>
      </article>

      {/* Recommended books */}
      {tutorial?.books && tutorial.books.length > 0 && <RecommendedBooks books={tutorial.books} />}

      {/* Bottom navigation */}
      <div className="pt-8 border-t border-[#e7e5e4] dark:border-[#44403c] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/academy"
          className="inline-flex items-center gap-2 text-sm font-mono text-[#78716c] dark:text-[#a8a29e] hover:text-[#c2410c] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Catalogue
        </Link>

        {canSwitchToOther && (
          <button
            type="button"
            onClick={() => setMode(otherMode)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#e7e5e4] dark:border-[#44403c] bg-[#f5f5f4] dark:bg-[#292524] px-4 py-2 text-sm font-medium text-[#292524] dark:text-[#d6d3d1] hover:border-[#c2410c] hover:text-[#c2410c] transition-colors"
          >
            Read {otherMode === "simple" ? "Simple" : "Full"} Version
          </button>
        )}
      </div>
    </div>
  );
}
