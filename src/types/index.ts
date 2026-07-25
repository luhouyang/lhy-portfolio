export type WorkCategory = "publication" | "software" | "project";

export type WorkTag =
  // AI & Data Science
  | "AI/ML"
  | "Machine Learning"
  | "Computer Vision"
  | "Cognitive"
  | "Algorithm"
  | "TensorFlow"
  | "Scikit-Learn"
  // Development & Tech Stack
  | "Flutter"
  | "React"
  | "Firebase"
  | "Unity"
  | "Systems Engineering"
  | "Cybersecurity"
  | "Automation"
  | "Quantum"
  // Domains & Mediums
  | "App"
  | "Service"
  | "Game"
  | "Mixed Reality"
  | "AR"
  | "Android"
  | "Hardware"
  | "Robotics"
  // Fields & Industries
  | "Research"
  | "Finance"
  | "Education"
  | "Environment"
  | "Sustainability"
  // Community, Events & Extracurriculars
  | "Community"
  | "Event"
  | "Workshop"
  | "Hackathon"
  | "Competition"
  | "GDG"
  | "Organizing"
  | "Volunteering"
  | "Public Relations"
  | "Sports";

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
  languages?: string[];
  date: string;
  description: string;
  doi?: string;
  githubUrl?: string;
  stars?: number;
  forks?: number;
  stickers?: WorkSticker[];
}

export interface RecommendedBook {
  title: string;
  author?: string;
  cover: string;
  url: string;
  note?: string;
}

export interface TutorialMeta {
  type?: "tutorial";
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  books?: RecommendedBook[];
}

export interface TutorialSectionSeparator {
  type: "section";
  id: string;
  title: string;
  description?: string;
}

export type AcademyCatalogItem = TutorialMeta | TutorialSectionSeparator;