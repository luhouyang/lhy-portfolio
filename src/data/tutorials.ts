import type { AcademyCatalogItem, TutorialMeta } from "../types";

/**
 * This is the full Academy catalog list.
 *
 * You can insert section separators anywhere in this array
 * and they will render in the same order on the Academy page.
 *
 * Example section separator:
 *
 * {
 *   type: "section",
 *   id: "robotics",
 *   title: "Robotics",
 *   description: "Autonomous systems, perception, and control."
 * }
 */
export const academyCatalog: AcademyCatalogItem[] = [
  {
    type: "section",
    id: "featured-demo",
    title: "Featured Demo",
    description: "Interactive experiments and visual system simulations.",
  },

  {
    type: "tutorial",
    slug: "complex-systems",
    title: "DEMO | Modeling Complex Systems: From Topology to Emergence",
    date: "2026-07-04",
    tags: ["Reinforcement Learning", "Chaos", "WebGL"],
    description:
      "Exploring how autonomous agents navigate chaotic environments using PPO, strange attractors, and swarm mechanics.",
  },

  {
    type: "section",
    id: "ai-and-machine-learning",
    title: "AI & Machine Learning",
    description:
      "Deep learning, computer vision, and model intuition through interactive explanations.",
  },

  {
    type: "tutorial",
    slug: "convolutional-neural-networks",
    title:
      "Convolutional Neural Networks: From Biological Visual Cortex to Deep Learning",
    date: "2026-07-10",
    tags: ["AI/ML", "Computer Vision", "Deep Learning"],
    description:
      "Exploring how modern computer vision models mirror the biological visual cortex, tracing CNN history from the Neocognitron to deep architectures.",
  },

  {
    type: "section",
    id: "quantum-computing",
    title: "Quantum Computing",
    description:
      "Qubits, superposition, entanglement, and quantum gates explained visually.",
  },

  {
    type: "tutorial",
    slug: "quantum-computing-basics",
    title: "Quantum Computing Basics: Superposition, Entanglement, and Qubits",
    date: "2026-07-15",
    tags: ["Quantum", "Computing", "Physics"],
    description:
      "An introduction to quantum mechanics principles including qubits, superposition, entanglement, and quantum logic gates.",
  },
];

/**
 * Backwards-compatible export containing only actual tutorials.
 * Useful if other parts of the app expect only TutorialMeta items.
 */
export const tutorials: TutorialMeta[] = academyCatalog.filter(
  (item): item is TutorialMeta => item.type !== "section"
);