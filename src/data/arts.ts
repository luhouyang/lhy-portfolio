// src/data/arts.ts
// ---------------------------------------------------------------------------
// Content-first feed schema.
//  - "piece"  = media on top, small caption/meta below (the only content unit)
//  - "note"   = optional small prose line (never a big title)
//  - "row" / "column" = invisible containers for freeform composition
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Helpers for filtering / rearranging the feed
// ---------------------------------------------------------------------------

/** Walks the layout tree and returns every "piece" node in authored order. */
export function collectPieces(node: ArtNode): ArtNode[] {
  if (node.type === "piece") return [node];
  return (node.children ?? []).flatMap(collectPieces);
}

export type ArtCategory = "Music" | "Photography" | "Artwork";

export interface ArtNode {
  id: string;
  type: "row" | "column" | "piece" | "note";

  /* ---- container props ---- */
  children?: ArtNode[];
  gap?: number; // px
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  width?: number; // flex ratio vs. siblings in a row (2 = twice as wide as 1)

  /* ---- piece: media (content first) ---- */
  media?: {
    kind: "image" | "sticker";
    src: string;
    alt: string;
    height?: string; // images, e.g. "380px"
    size?: number; // stickers
    rotation?: number; // stickers
    href?: string; // optional: media itself becomes a link
  };

  /* ---- piece: meta (rendered small, below the media) ---- */
  title?: string;
  category?: ArtCategory;
  date?: string;
  description?: string;
  href?: string;
  linkText?: string;

  /* ---- note ---- */
  body?: string;
}

export const artsLayout: ArtNode = {
  id: "root",
  type: "column",
  gap: 44,
  children: [
    {
      id: "intro-note",
      type: "note",
      body: "Field frames, flame-style clay, and late-night piano takes — an ongoing archive of things made outside of code.",
    },

    /* ---- row 1: wide photo + music sticker ---- */
    {
      id: "r1",
      type: "row",
      gap: 24,
      align: "start",
      children: [
        {
          id: "kinabalu",
          type: "piece",
          width: 2,
          media: { kind: "image", src: "assets/arts/kinabalu.jpg", alt: "Mount Kinabalu at dawn", height: "400px" },
          title: "Mount Kinabalu at dawn",
          category: "Photography",
          date: "2022",
          description: "First light over the summit trail — Ranau, Sabah.",
        },
        {
          id: "piano-sessions",
          type: "piece",
          width: 1,
          media: { kind: "sticker", src: "assets/stickers/robot.png", alt: "Piano sessions sticker", size: 150, rotation: 6, height: "400px" },
          title: "Piano Sessions, Vol. 1",
          category: "Music",
          date: "2026",
          description: "Late-night recordings of classical studies and original arrangements.",
          href: "https://github.com/luhouyang",
          linkText: "Listen",
        },
      ],
    },

    /* ---- row 2: three equal photos ---- */
    {
      id: "r2",
      type: "row",
      gap: 24,
      align: "start",
      children: [
        {
          id: "labuan-coast",
          type: "piece",
          width: 1,
          media: { kind: "image", src: "assets/arts/labuan-coast.jpg", alt: "Labuan coastline", height: "300px" },
          title: "Labuan coastline",
          category: "Photography",
          date: "2023",
          description: "Typhoon-season clouds over the free-port shore.",
        },
        {
          id: "niigata-snow",
          type: "piece",
          width: 1,
          media: { kind: "image", src: "assets/arts/niigata-snow.jpg", alt: "Niigata in winter", height: "300px" },
          title: "Niigata in winter",
          category: "Photography",
          date: "2025",
          description: "Snow-country mornings during the research internship.",
        },
        {
          id: "concert-hall",
          type: "piece",
          width: 1,
          media: { kind: "image", src: "assets/arts/concert-hall.jpg", alt: "Concert hall lights", height: "300px" },
          title: "Concert hall lights",
          category: "Photography",
          date: "2024",
          description: "Between movements, house lights half-up.",
        },
      ],
    },

    /* ---- small prose interlude (no title, just a line) ---- */
    {
      id: "mid-note",
      type: "note",
      body: "Interludes between commissions: flame-style clay, wire armatures, and early XR sketches.",
    },

    /* ---- row 3: sticker + wide artwork ---- */
    {
      id: "r3",
      type: "row",
      gap: 24,
      align: "center",
      children: [
        {
          id: "doguu-study",
          type: "piece",
          width: 1,
          media: { kind: "sticker", src: "assets/stickers/doguu.png", alt: "Doguu clay study sticker", size: 140, rotation: -8, height: "300px" },
          title: "Doguu study (wire & clay)",
          category: "Artwork",
          date: "2025",
          description: "Hand-built study of Jomon flame-style motifs.",
        },
        {
          id: "jomon-render",
          type: "piece",
          width: 2,
          media: { kind: "image", src: "assets/arts/jomon-render.jpg", alt: "Flame-style vessel real-time render", height: "340px" },
          title: "Flame-style vessel, real-time",
          category: "Artwork",
          date: "2025",
          description: "PBR reconstruction scanned for the HoloLens 2 gaze study.",
          href: "https://github.com/luhouyang/JomonKaenGazeData",
          linkText: "View repository",
        },
      ],
    },

    /* ---- row 4: closing flow ---- */
    {
      id: "r4",
      type: "row",
      gap: 24,
      align: "start",
      children: [
        {
          id: "utp-lake",
          type: "piece",
          width: 1,
          media: { kind: "image", src: "assets/arts/utp-lake.jpg", alt: "UTP lake at sunset", height: "280px" },
          title: "UTP lake at sunset",
          category: "Photography",
          date: "2024",
          description: "Golden hour between lectures.",
        },
        {
          id: "kinabalu-ridge",
          type: "piece",
          width: 1,
          media: { kind: "image", src: "assets/arts/kinabalu-ridge.jpg", alt: "Kinabalu ridge line", height: "280px" },
          title: "Kinabalu ridge line",
          category: "Photography",
          date: "2022",
          description: "Clouds stacking against the donkey-ear peaks.",
        },
        {
          id: "metronome-sketches",
          type: "piece",
          width: 1,
          media: { kind: "sticker", src: "assets/stickers/robot.png", alt: "Metronome sketches sticker", size: 110, rotation: 10, height: "280px" },
          title: "Metronome sketches",
          category: "Music",
          date: "2025",
          description: "Five-finger exercises, recorded on a phone.",
        },
      ],
    },

    {
      id: "end-note",
      type: "note",
      body: "Everything on this page is composed in src/data/arts.ts — add a piece and it flows into the feed.",
    },
  ],
};