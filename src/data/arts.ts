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
    kind: "image" | "sticker" | "vinyl";
    src: string; // image/sticker: the asset • vinyl: the disc PNG
    alt: string;
    height?: string; // images & vinyl, e.g. "380px"
    size?: number; // stickers
    rotation?: number; // stickers
    href?: string; // optional: media itself becomes a link
    gifSrc?: string; // vinyl only: short GIF overlay shown on hover/play
    gifFit?: "cover" | "contain"; // "cover" = fills disc (crops) • "contain" = whole GIF visible, backdrop blurs behind
    gifScale?: number; // vinyl only: zoom factor for the GIF (use > 1 if bands are baked into the GIF)
    audioSrc?: string; // vinyl only: short music clip played on hover/play
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
      body: "Life is Art, Live Beautifully - Random Guy on the Internet",
    },

    /* ---- row 1: wide photo + music sticker ---- */
    {
      id: "r1",
      type: "row",
      gap: 32,
      align: "start",
      children: [
        {
          id: "overlooking-kota-kinabalu",
          type: "piece",
          width: 2,
          media: {
            kind: "image",
            src: "assets/art/photo/sabah_1/mount-koko.jpg",
            alt: "Overlooking Kota Kinabalu",
            height: "400px",
          },
          title: "Overlooking Kota Kinabalu",
          category: "Photography",
          date: "2021",
          description: "Land below the wind.",
        },
        {
          id: "departures-egoist",
          type: "piece",
          width: 1,
          media: {
            kind: "vinyl",
            src: "assets/art/music/egoist/departures/cover.png", // your vinyl disc (square, transparent bg recommended)
            gifSrc: "assets/art/music/egoist/departures/short.gif", // your short looping GIF overlay
            audioSrc: "assets/art/music/egoist/departures/sound.MP3", // your short clip
            alt: "Departures 〜あなたにおくるアイの歌〜",
            height: "320px",
          },
          title: "Departures 〜あなたにおくるアイの歌〜",
          category: "Music",
          date: "2011",
          description: "EGOIST, Chelly",
          href: "https://youtu.be/LKqgY0VKZX4?list=RDLKqgY0VKZX4",
          linkText: "Listen",
        },
      ],
    },

    /* ---- row 2: three equal photos ---- */
    {
      id: "r2",
      type: "row",
      gap: 32,
      align: "start",
      children: [
        {
          id: "angle-sarah",
          type: "piece",
          width: 1,
          media: {
            kind: "vinyl",
            src: "assets/art/music/sarah_mclachlan/AngelSarah.jpg",
            gifSrc: "assets/art/music/sarah_mclachlan/short.gif",
            audioSrc: "assets/art/music/sarah_mclachlan/sound.MP3",
            alt: "Angle, Sarah McLachlan",
            height: "280px",
          },
          title: "Angle",
          category: "Music",
          date: "1997",
          href: "https://youtu.be/i1GmxMTwUgs",
          description: "Sarah McLachlan",
          linkText: "Listen",
        },
        {
          id: "it-is-echoing-all-over-the-world",
          type: "piece",
          width: 1,
          media: {
            kind: "vinyl",
            src: "assets/art/music/oidupaa_vladimir/cover.jpg",
            gifSrc: "assets/art/music/oidupaa_vladimir/short.gif",
            audioSrc: "assets/art/music/oidupaa_vladimir/sound.MP3",
            alt: "It Is Echoing All Over the World",
            height: "280px",
          },
          title: "It Is Echoing All Over the World",
          category: "Music",
          date: "1999",
          href: "https://youtu.be/384C6UnHC1o",
          description: "Vladimir Oidupaa",
          linkText: "Listen",
        },
        {
          id: "family-photo-1",
          type: "piece",
          width: 1,
          media: { kind: "image", src: "assets/art/photo/sabah_1/family-photo.jpg", alt: "Family Photo", height: "300px" },
          title: "Tips of Borneo",
          category: "Photography",
          date: "2023",
          description: "",
        },
      ],
    },

    /* ---- small prose interlude (no title, just a line) ---- */
    {
      id: "mid-note",
      type: "note",
      body: "Welcome to the Japan corner",
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
          media: {
            kind: "sticker",
            src: "assets/stickers/doguu.png",
            alt: "Doguu clay study sticker",
            size: 140,
            rotation: -8,
            height: "430px",
          },
          title: "Doguu study (wire & clay)",
          category: "Artwork",
          date: "2025",
          description: "Drag and Drop the Sticker",
        },
        {
          id: "fushimi-inari-2025",
          type: "piece",
          width: 2,
          media: {
            kind: "image",
            src: "assets/art/photo/japan_1/downsized_4_fushimi_inari_2.jpg",
            alt: "Fushimi Inari, Kyoto",
            height: "430px",
          },
          title: "Fushimi Inari, Kyoto",
          category: "Photography",
          date: "2025",
          description: "Toori Gates Halfway up Fushimi Inari shrine.",
        },
      ],
    },

    /* ---- row 4: music + wide image ---- */
    {
      id: "r3",
      type: "row",
      gap: 36,
      align: "center",
      children: [
        {
          id: "mount-fuji-2025",
          type: "piece",
          width: 2,
          media: {
            kind: "image",
            src: "assets/art/photo/japan_1/downsized_32_mount_fuji.JPG",
            alt: "Fuji, Japan",
            height: "412px",
          },
          title: "Fuji, Japan",
          category: "Photography",
          date: "2025",
          description: "View of Fuji San.",
        },
        {
          id: "oblivious-kalafina",
          type: "piece",
          width: 1,
          media: {
            kind: "vinyl",
            src: "assets/art/music/kara_no_kyokai/oblivious-cover.jpg", // your vinyl disc (square, transparent bg recommended)
            gifSrc: "assets/art/music/kara_no_kyokai/short.gif", // your short looping GIF overlay
            gifFit: "contain",
            gifScale: 1.0,
            audioSrc: "assets/art/music/kara_no_kyokai/sound.MP3", // your short clip
            alt: "Oblivious",
            height: "320px",
          },
          title: "Oblivious",
          category: "Music",
          date: "2008",
          description: "Kalafina",
          href: "https://youtu.be/UI8Iy7kmRxo",
          linkText: "Listen",
        },
      ],
    },

    {
      id: "end-note",
      type: "note",
      body: "The End, for now.",
    },
  ],
};
