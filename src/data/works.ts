import type { Work } from "../types";

export const portfolioWorks: Work[] = [
  {
    id: "proj-000",
    category: "software",
    title: "HoloLens 2 for Jomon Kaen Artefacts",
    tags: ["Unity", "Mixed Reality", "Cognitive"],
    date: "2025-07-01",
    description:
      "Unity application to collect eye gaze, voice & emotion data on Japanese Pottery and Dogu. Conduct analysis and deep learning modeling of data.",
    githubUrl: "https://github.com/luhouyang/JomonKaenGazeData",
    stars: 1,
    forks: 0,
    stickers: [
      { src: "assets/stickers/doguu.png", position: "right", rotation: 12, size: 100, offsetX: -20, offsetY: -20 },
      { src: "assets/stickers/doki_joumon.png", position: "right", rotation: -12, size: 120, offsetX: 60, offsetY: 60 },
    ],
  },
  {
    id: "proj-001",
    category: "software",
    title: "Open-Genome Project (XAI)",
    tags: ["AI/ML", "Research"],
    date: "2024-10-01",
    description:
      "Open-source genome database for Explainable AI (XAI) models. Mapping areas of interest in AI models to help researchers regulate development towards a safer, humanity-aligned future.",
    githubUrl: "https://github.com/luhouyang/open-genome-project",
    stars: 1,
    forks: 0,
  },
  {
    id: "proj-002",
    category: "software",
    title: "Autonomous Robot AI System",
    tags: ["Robotics", "AI/ML"],
    date: "2024-05-15",
    description:
      "Integrated YOLOv8 for person-following, OpenAI Whisper for speech recognition, and gTTS for voice feedback. Competed in RoboCup Malaysia Open 2024.",
    githubUrl: "https://github.com/luhouyang/robocup2024",
    stars: 1,
    forks: 0,
    stickers: [{ src: "assets/stickers/robot.png", position: "left", rotation: -2, size: 100, offsetX: 0, offsetY: 0 }],
  },
  {
    id: "proj-003",
    category: "software",
    title: "Change Detection with DSIFN",
    tags: ["AI/ML", "Computer Vision"],
    date: "2024-02-20",
    description:
      "Utilized Deeply Supervised Image Fusion Network (DSIFN) and Deeplabv3 for semantic change detection of forests, water, barren land, and human activity.",
    githubUrl: "https://github.com/luhouyang/Deep_Learning-Based_Change_Detection_of_Urban_Landscape",
    stars: 1,
    forks: 0,
  },
  {
    id: "proj-004",
    category: "project",
    title: "Plant Health & OCR Systems",
    tags: ["Flutter", "AI/ML"],
    date: "2023-08-05",
    description:
      "Developed mobile applications for identifying plant macronutrient deficiencies and built custom CNN models for Optical Character Recognition (OCR) using TensorFlow.",
    githubUrl: "https://github.com/luhouyang/plant-health-flutter-app",
    stars: 0,
    forks: 0,
  },
  {
    id: "event-001",
    category: "project",
    title: "E3S2 Hackathon Champion",
    tags: ["Community", "Flutter"],
    date: "2024-04-12",
    description:
      "Led the development of the winning application at the UTP E3S2 Hackathon, collaborating with a team to solve complex campus challenges under time constraints.",
    githubUrl: "https://github.com/luhouyang/nutsnbolts",
    stars: 0,
    forks: 0,
  },
];
