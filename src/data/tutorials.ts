import type { AcademyCatalogItem, TutorialMeta } from "../types";

/**
 * Full Academy catalog list.
 *
 * Insert section separators anywhere in this array and they will
 * render in the same order on the Academy page.
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
    books: [
      
    ],
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
    slug: "computer_vision/convolutional-neural-networks",
    title:
      "Convolutional Neural Networks: From Biological Visual Cortex to Deep Learning",
    date: "2026-07-10",
    tags: ["AI/ML", "Computer Vision", "Deep Learning"],
    description:
      "Exploring how modern computer vision models mirror the biological visual cortex, tracing CNN history from the Neocognitron to deep architectures.",
    books: [
      {
        title: "Deep Learning",
        author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
        cover: "/assets/books/deep-learning.jpg",
        url: "https://www.deeplearningbook.org/",
        note: "The standard reference for deep learning fundamentals.",
      },
      {
        title: "We Know It When We See It",
        author: "Richard Masland",
        cover: "/assets/books/we-know-it-when-we-see-it.jpg",
        url: "https://inquisitivebiologist.com/2021/04/20/book-review-we-know-it-when-we-see-it-what-the-neurobiology-of-vision-tells-us-about-how-we-think/",
        note: "Fun and approchable read about human vision and how it inspires computer vision systems.",
      },
    ],
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
    slug: "quantum_computing/quantum-computing-basics",
    title: "Quantum Computing Basics: Superposition, Entanglement, and Qubits",
    date: "2026-07-15",
    tags: ["Quantum", "Computing", "Physics"],
    description:
      "An introduction to quantum mechanics principles including qubits, superposition, entanglement, and quantum logic gates.",
    books: [
      {
        title: "Quantum Computing for Everyone",
        author: "Chris Bernhardt",
        cover: "/assets/books/quantum-computing-for-everyone.webp",
        url: "https://github.com/shyamsantoki/Qubit_Quantuam-Computing_Notes/blob/main/Quantum%20computing%20for%20everyone%20by%20Bernhardt%2C%20Chris%20(z-lib.org).pdf",
        note: "Great beginner-friendly introduction to quantum computing.",
      },
    ],
  },
];

/**
 * Backwards-compatible export containing only actual tutorials.
 */
export const tutorials: TutorialMeta[] = academyCatalog.filter(
  (item): item is TutorialMeta => item.type !== "section"
);