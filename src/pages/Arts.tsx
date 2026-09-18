// src/pages/Arts.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { artsLayout, collectPieces, type ArtNode, type ArtCategory } from "../data/arts";
import Sticker from "../components/UI/Sticker";
import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type Filter = ArtCategory | "All";

/* ------------------------- single-active-clip audio control ------------------------- */
let activeAudio: HTMLAudioElement | null = null;
function stopActiveAudio(next: HTMLAudioElement | null) {
  if (activeAudio && activeAudio !== next) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }
  activeAudio = next;
}

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

/* ------------------- auto-composition engine for filtered view ------------------- */
const ROW_PATTERNS: number[][] = [
  [2, 1],
  [1, 1],
  [1, 1, 1],
  [1, 2],
];

function autoCompose(pieces: ArtNode[]): ArtNode {
  const rows: ArtNode[] = [];
  let i = 0;
  let p = 0;
  while (i < pieces.length) {
    const pattern = ROW_PATTERNS[p % ROW_PATTERNS.length];
    const chunk = pieces.slice(i, i + pattern.length);
    rows.push({
      id: `auto-row-${p}`,
      type: "row",
      gap: 24,
      align: "start",
      children: chunk.map((piece, j) => ({ ...piece, width: pattern[j] })),
    });
    i += chunk.length;
    p += 1;
  }
  return { id: "auto-root", type: "column", gap: 44, children: rows };
}

/* ------------------------- vinyl: spins + GIF overlay + clip ------------------------- */

// One full rotation in seconds — raise for slower, lower for faster
const VINYL_SPIN_SECONDS = 8;

// Browsers refuse audio until the user clicks/keys anywhere once.
// Track that "sticky activation" so hover-play knows when it's allowed.
let userActivated = false;
if (typeof window !== "undefined") {
  const unlock = () => {
    userActivated = true;
  };
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
}

function VinylView({ media, title }: { media: NonNullable<ArtNode["media"]>; title?: string }) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gifRef = useRef<HTMLImageElement | null>(null);

  const ensureAudio = () => {
    if (!media.audioSrc) return null;
    if (!audioRef.current) {
      const a = new Audio(media.audioSrc);
      a.preload = "auto";
      a.volume = 0.85;
      a.addEventListener("ended", () => {
        setPlaying(false);
        stopActiveAudio(null);
      });
      audioRef.current = a;
    }
    return audioRef.current;
  };

  const tryPlay = () => {
    const a = ensureAudio();
    if (!a) return;
    stopActiveAudio(a);
    a.currentTime = 0; // music always restarts
    a.play()
      .then(() => {
        setPlaying(true);
        setBlocked(false);
      })
      .catch(() => {
        setPlaying(false);
        setBlocked(true);
      });
  };

  // Force the GIF to replay from its first frame (reload from cache)
  const restartGif = () => {
    const img = gifRef.current;
    if (!img || !media.gifSrc) return;
    const url = media.gifSrc;
    img.src = "";
    img.src = url;
  };

  const start = () => {
    setHovered(true);
    restartGif(); // GIF from frame 0, every single hover
    if (userActivated) tryPlay();
    else setBlocked(true);
  };

  const stop = () => {
    setHovered(false);
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
    stopActiveAudio(null);
    setPlaying(false);
  };

  useEffect(() => () => audioRef.current?.pause(), []);

  const spinning = hovered || playing;
  const slotSize = media.height || "280px";

  return (
    <div
      className="w-full flex items-center justify-center select-none"
      style={{ height: slotSize }}
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      {/* Square stage exactly the disc's size — nothing can escape it */}
      <div
        className="relative"
        style={{ width: `min(100%, ${slotSize})`, aspectRatio: "1 / 1" }}
      >
        <button
          type="button"
          aria-label={`Play clip: ${title || "music"}`}
          onClick={() => {
            if (playing) {
              stop();
            } else {
              userActivated = true;
              setBlocked(false);
              restartGif();
              setHovered(true);
              tryPlay();
            }
          }}
          className="absolute inset-0 rounded-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]/60 drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
        >
          {/* REST STATE: sharp cover • HOVER: blurs + zooms into a soft backdrop under the GIF */}
          <img
            src={media.src}
            alt={media.alt}
            draggable={false}
            className="w-full h-full object-cover rounded-full transition-all duration-500 ease-out"
            style={{
              filter: spinning && media.gifSrc ? "blur(16px)" : "blur(0px)",
              transform: spinning && media.gifSrc ? "scale(1.12)" : "scale(1)",
            }}
          />

          {/* HOVER STATE: the GIF — fit mode comes from the data file */}
          {media.gifSrc && (
            <img
              ref={gifRef}
              src={media.gifSrc}
              alt=""
              aria-hidden
              draggable={false}
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out ${
                spinning ? "opacity-100" : "opacity-0"
              }`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: media.gifFit || "cover",
                objectPosition: "center",
                borderRadius: "50%",
                transform: `scale(${media.gifScale ?? 1})`,
              }}
            />
          )}

          {/* Spindle hole */}
          <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-[#1c1917]/70 dark:bg-[#fafaf9]/70 pointer-events-none" />
        </button>

        {/* HOVER STATE: mini cover disc blooms in at top-right, then spins */}
        <div
          className={`absolute -top-2 -right-2 rounded-full overflow-hidden shadow-xl ring-4 ring-[#fdfbf7]/80 dark:ring-[#1c1917]/80 pointer-events-none transition-all duration-500 ease-out ${
            spinning ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{ width: "34%", aspectRatio: "1 / 1" }}
        >
          <img
            src={media.src}
            alt=""
            aria-hidden
            draggable={false}
            className="w-full h-full object-cover"
            style={{
              animation: `vinyl-spin ${VINYL_SPIN_SECONDS}s linear infinite`,
              animationPlayState: spinning ? "running" : "paused",
            }}
          />
          <span className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#1c1917]/60 dark:bg-[#fafaf9]/60 pointer-events-none" />
        </div>

        {/* Hint badge — only when a hover was blocked by autoplay policy */}
        <span
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-mono whitespace-nowrap bg-[#1c1917]/85 text-[#fafaf9] dark:bg-[#fafaf9]/85 dark:text-[#1c1917] pointer-events-none transition-opacity duration-200"
          style={{ opacity: blocked && !playing ? 1 : 0 }}
        >
          click for sound
        </span>
      </div>
    </div>
  );
}

/* ------------------------- piece: content first, meta below ------------------------- */

function PieceView({ node }: { node: ArtNode }) {
  const media = node.media;
  if (!media) return null;

  return (
    <figure className="w-full min-w-0 group">
      {/* CONTENT FIRST */}
      {media.kind === "vinyl" ? (
        <VinylView
          media={media}
          title={node.title}
        />
      ) : media.kind === "image" ? (
        <div
          className="w-full overflow-hidden rounded-xl bg-[#f5f5f4] dark:bg-[#292524]"
          style={{ height: media.height || "280px" }}
        >
          {media.href ? (
            <a
              href={media.href}
              target="_blank"
              rel="noreferrer"
              className="block w-full h-full"
            >
              <img
                src={media.src}
                alt={media.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </a>
          ) : (
            <img
              src={media.src}
              alt={media.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{ height: media.height || "240px" }}
        >
          <Sticker
            src={media.src}
            alt={media.alt}
            size={media.size || 140}
            initialRotation={media.rotation || 0}
          />
        </div>
      )}

      {/* META SECOND — small, below */}
      <figcaption className="mt-3 space-y-1 max-w-prose">
        {(node.category || node.date) && (
          <p className="text-[11px] font-mono text-[#78716c] dark:text-[#a8a29e]">
            {node.category && <span className="text-[#c2410c] dark:text-[#fb923c]">{node.category}</span>}
            {node.category && node.date && <span> • </span>}
            {node.date}
          </p>
        )}
        {node.title && <h3 className="text-sm font-semibold text-[#292524] dark:text-[#fafaf9] leading-snug">{node.title}</h3>}
        {node.description && <p className="text-xs text-[#78716c] dark:text-[#a8a29e] leading-relaxed">{node.description}</p>}
        {node.href && node.linkText && (
          <a
            href={node.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#c2410c] hover:underline"
          >
            {node.linkText} <ExternalLink size={12} />
          </a>
        )}
      </figcaption>
    </figure>
  );
}

/* ------------------------- note: small prose, never a title ------------------------- */

function NoteView({ node }: { node: ArtNode }) {
  return <p className="text-sm font-mono text-[#78716c] dark:text-[#a8a29e] leading-relaxed max-w-prose">{node.body}</p>;
}

/* ------------------------- recursive containers ------------------------- */

function NodeView({ node }: { node: ArtNode }) {
  if (node.type === "piece") return <PieceView node={node} />;
  if (node.type === "note") return <NoteView node={node} />;

  const isRow = node.type === "row";

  return (
    <div
      className={`flex min-w-0 ${isRow ? "flex-col md:flex-row" : "flex-col"} ${alignMap[node.align || "start"]} ${
        justifyMap[node.justify || "start"]
      } ${node.wrap ? "flex-wrap" : ""}`}
      style={{ gap: node.gap ?? 24 }}
    >
      {node.children?.map((child) => (
        <div
          key={child.id}
          className="min-w-0"
          style={isRow ? { flex: `${child.width ?? 1} 1 0px` } : undefined}
        >
          <NodeView node={child} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------- scroll reveal per flow block ------------------------- */

function RevealSection({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------ page ------------------------------------ */

export default function Arts() {
  const [filter, setFilter] = useState<Filter>("All");

  const allPieces = useMemo(() => collectPieces(artsLayout), []);

  const categories = useMemo<ArtCategory[]>(() => {
    const seen: ArtCategory[] = [];
    allPieces.forEach((p) => {
      if (p.category && !seen.includes(p.category)) seen.push(p.category);
    });
    return seen;
  }, [allPieces]);

  const activeTree = useMemo<ArtNode>(() => {
    if (filter === "All") return artsLayout;
    return autoCompose(allPieces.filter((p) => p.category === filter));
  }, [filter, allPieces]);

  const countFor = (cat: Filter) => (cat === "All" ? allPieces.length : allPieces.filter((p) => p.category === cat).length);

  return (
    <div className="flex flex-col pb-24">
      {/* Vinyl spin keyframes */}
      <style>{`@keyframes vinyl-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 -mx-2 px-2 py-3 mb-10 bg-[#fdfbf7]/85 dark:bg-[#1c1917]/85 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-[#78716c] dark:text-[#a8a29e] mr-1">filter:</span>
          {(["All", ...categories] as Filter[]).map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                  active
                    ? "bg-[#c2410c] text-white"
                    : "bg-[#f5f5f4] dark:bg-[#292524] text-[#78716c] dark:text-[#a8a29e] hover:text-[#c2410c] dark:hover:text-[#fb923c]"
                }`}
              >
                {cat}
                <span className={`ml-1.5 ${active ? "text-white/70" : "text-[#a8a29e] dark:text-[#78716c]"}`}>
                  {countFor(cat)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feed */}
      <div
        key={filter}
        className="flex flex-col"
        style={{ gap: activeTree.gap ?? 44 }}
      >
        {activeTree.children?.map((child) => (
          <RevealSection key={child.id}>
            <NodeView node={child} />
          </RevealSection>
        ))}
        {(!activeTree.children || activeTree.children.length === 0) && (
          <p className="text-sm font-mono text-[#78716c] dark:text-[#a8a29e]">Nothing in this collection yet.</p>
        )}
      </div>
    </div>
  );
}
