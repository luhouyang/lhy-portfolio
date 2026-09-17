// src/pages/Arts.tsx
import React from "react";
import { artsLayout, type ArtNode } from "../data/arts";
import Sticker from "../components/UI/Sticker";
import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

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

/* ------------------------- piece: content first, meta below ------------------------- */

function PieceView({ node }: { node: ArtNode }) {
  const media = node.media;
  if (!media) return null;

  return (
    <figure className="w-full min-w-0 group">
      {/* CONTENT FIRST */}
      {media.kind === "image" ? (
        <div
          className="w-full overflow-hidden rounded-xl bg-[#f5f5f4] dark:bg-[#292524]"
          style={{ height: media.height || "280px" }}
        >
          {media.href ? (
            <a href={media.href} target="_blank" rel="noreferrer" className="block w-full h-full">
              <img
                src={media.src}
                alt={media.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </a>
          ) : (
            <img
              src={media.src}
              alt={media.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          )}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center" style={{ height: media.height || "240px" }}>
          <Sticker src={media.src} alt={media.alt} size={media.size || 140} initialRotation={media.rotation || 0} />
        </div>
      )}

      {/* META SECOND — always small, always below */}
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
            {node.linkText} <ExternalLink size={11} />
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
        <div key={child.id} className="min-w-0" style={isRow ? { flex: `${child.width ?? 1} 1 0px` } : undefined}>
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

/* ------------------------- page: the feed starts with content ------------------------- */

export default function Arts() {
  const root = artsLayout;

  return (
    <div className="flex flex-col pb-24" style={{ gap: root.gap ?? 44 }}>
      {root.children?.map((child) => (
        <RevealSection key={child.id}>
          <NodeView node={child} />
        </RevealSection>
      ))}
    </div>
  );
}