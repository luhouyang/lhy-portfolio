import { useState, useEffect, Suspense, lazy } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sticker from "../components/UI/Sticker";

// Standard Archival Elements
import { H1, H2, H3, P, A, Blockquote, UL, OL, LI, IMG, Pre, Code } from "../components/Interactive/MDXElements";

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

export default function TutorialLayout() {
  const { slug } = useParams<{ slug: string }>();
  const [Content, setContent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const modules = import.meta.glob("../content/academy/*.mdx");
    const path = `../content/academy/${slug}.mdx`;

    if (modules[path]) {
      modules[path]()
        .then((module: any) => setContent(() => module.default))
        .catch(() => setError("Failed to load article."));
    } else {
      setError("Article not found.");
    }
  }, [slug]);

  if (error) {
    return (
      <div className="text-center py-20 space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#991b1b] dark:text-red-400">{error}</h2>
        <Link
          to="/academy"
          className="text-[#c2410c] hover:underline"
        >
          Back to Academy
        </Link>
      </div>
    );
  }

  if (!Content) return <Skeleton />;

  // THE MASTER DICTIONARY
  const mdxComponents = {
    // 1. Standard Markdown Elements (Mapped to your warm archival typography)
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

    // 2. Interactive Visualizers (Lazy-loaded & Suspense-wrapped)
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
      <Link
        to="/academy"
        className="inline-flex items-center gap-2 text-sm font-mono text-[#78716c] dark:text-[#a8a29e] hover:text-[#c2410c] transition-colors"
      >
        <ArrowLeft size={16} /> Return to Catalog
      </Link>

      {/* The Article: Sitting directly on the paper texture */}
      <article>
        <Suspense fallback={<Skeleton />}>
          <Content components={mdxComponents} />
        </Suspense>
      </article>
    </div>
  );
}
