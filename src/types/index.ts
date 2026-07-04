export type WorkCategory = 'publication' | 'software' | 'project';

export type WorkTag = 
  | 'AI/ML' 
  | 'Research' 
  | 'Robotics' 
  | 'Computer Vision' 
  | 'Flutter' 
  | 'Community'
  | 'Machine Learning' 
  | 'Systems Engineering' 
  | 'Cybersecurity' 
  | 'React' 
  | 'Automation';

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
}

export interface TutorialMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
}