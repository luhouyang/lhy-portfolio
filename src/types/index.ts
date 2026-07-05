export type WorkCategory = "publication" | "software" | "project";

export type WorkTag =
  | "AI/ML"
  | "Research"
  | "Robotics"
  | "Computer Vision"
  | "Flutter"
  | "Community"
  | "Machine Learning"
  | "Systems Engineering"
  | "Cybersecurity"
  | "React"
  | "Automation"
  | "Quantum"
  | "Mixed Reality"
  | "Cognitive"
  | "Unity";

export interface WorkSticker {
  src: string;
  alt?: string;
  position?: "left" | "right";
  rotation?: number;
  size?: number;
  offsetX?: number;
  offsetY?: number;
}

export interface Work {
  id: string;
  category: WorkCategory;
  title: string;
  tags: WorkTag[];
  date: string;
  description: string;
  doi?: string;
  githubUrl?: string;
  stars?: number;
  forks?: number;
  stickers?: WorkSticker[];
}

export interface TutorialMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
}
