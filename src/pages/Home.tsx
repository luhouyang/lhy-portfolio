import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Timeline Data based on your actual journey
const timelineEvents = [
  {
    date: "April 2024",
    title: "E3S2 Hackathon Champion",
    location: "Universiti Teknologi PETRONAS",
    description: "Led the development of the winning application, collaborating with a team to solve complex campus challenges under strict time constraints.",
    tags: ["Flutter", "Hackathon"]
  },
  {
    date: "2024",
    title: "RoboCup Malaysia Open",
    location: "Malaysia",
    description: "Built a robot from scratch to compete in the first RoboCup in Malaysia. Integrated YOLOv8 for person-following and Whisper for speech recognition.",
    tags: ["Robotics", "AI/ML", "YOLOv8"]
  },
  {
    date: "2024",
    title: "Head of PR, Campus Venture (CAVE)",
    location: "UTP",
    description: "Managed communications for UTP's massive CAVE event, attracting over 1,000 students and 80 clubs and societies.",
    tags: ["Leadership", "Community"]
  },
  {
    date: "Ongoing",
    title: "Open-Genome Project (XAI)",
    location: "Open Source",
    description: "Building an open-source genome database for Explainable AI (XAI) models to help researchers regulate development towards a safer, humanity-aligned future.",
    tags: ["Research", "XAI", "Python"]
  }
];

function TimelineItem({ event, index }: { event: typeof timelineEvents[0], index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  
  return (
    <div 
      ref={ref}
      className={`flex gap-6 md:gap-10 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* The Line & Dot */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-[#c2410c] shadow-[0_0_10px_rgba(194,65,12,0.4)] z-10 border-2 border-[#fdfbf7] dark:border-[#1c1917]" />
        {index < timelineEvents.length - 1 && (
          <div className="w-0.5 flex-grow bg-[#e7e5e4] dark:bg-[#44403c] mt-2" />
        )}
      </div>
      
      {/* The Content */}
      <div className="pb-12 max-w-xl">
        <div className="flex flex-wrap items-center gap-3 mb-2 text-sm font-mono text-[#78716c] dark:text-[#a8a29e]">
          <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
          <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
        </div>
        <h3 className="text-xl font-bold text-[#292524] dark:text-[#fafaf9] mb-2">{event.title}</h3>
        <p className="text-[#44403c] dark:text-[#d6d3d1] leading-relaxed mb-4">{event.description}</p>
        <div className="flex flex-wrap gap-2">
          {event.tags.map(tag => (
            <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-[#f5f5f4] dark:bg-[#292524] text-[#78716c] dark:text-[#a8a29e] border border-[#e7e5e4] dark:border-[#44403c]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      {/* 1. HERO REGION */}
      <section className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-[#292524] dark:text-[#fafaf9] tracking-tight">
          Lu Hou Yang
        </h1>
        <h2 className="text-xl text-[#78716c] dark:text-[#a8a29e] font-mono">
          CS @ UTP | AI/ML Researcher | Robotics Engineer
        </h2>
        <p className="text-lg text-[#44403c] dark:text-[#d6d3d1] leading-relaxed">
          Currently pursuing a Bachelor's in Computer Science at Universiti Teknologi PETRONAS. 
          I build high-performance data architectures, train computer vision models, and engineer autonomous robotic systems. 
          When I'm not coding or organizing tech communities, you can find me playing the piano.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <a href="mailto:luhouyang@gmail.com" className="px-6 py-2 bg-[#292524] dark:bg-[#fafaf9] dark:text-[#1c1917] text-white rounded-lg hover:bg-[#c2410c] dark:hover:bg-[#c2410c] dark:hover:text-white transition-colors font-medium flex items-center gap-2">
            <Mail size={18} /> Contact
          </a>
          <Link to="/works" className="px-6 py-2 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium flex items-center gap-2">
            View Works <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 2. INTERACTIVE TIMELINE */}
      <section className="flex flex-col gap-8">
        <h3 className="text-2xl font-semibold border-b border-[#e7e5e4] dark:border-[#44403c] pb-4 text-[#292524] dark:text-[#fafaf9]">Research & Engineering Journey</h3>
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>
      </section>

      {/* 3. COLLABORATION PORTAL */}
      <section className="p-8 md:p-12 rounded-2xl border border-[#e7e5e4] dark:border-[#44403c] bg-[#fdfbf7]/60 dark:bg-[#1c1917]/60 shadow-sm text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#292524] dark:text-[#fafaf9]">Let's Build Something Impactful</h2>
        <p className="text-[#44403c] dark:text-[#d6d3d1] max-w-2xl mx-auto text-lg">
          Whether you are looking to collaborate on XAI research, robotics integration, or community workshops, I am always open to connecting with fellow engineers and researchers.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a href="mailto:luhouyang@gmail.com" className="px-6 py-3 bg-[#c2410c] text-white rounded-lg hover:bg-[#9a3412] transition-colors font-medium flex items-center gap-2 shadow-lg shadow-[#c2410c]/20">
            <Mail size={18} /> Email Me
          </a>
          <a href="https://github.com/luhouyang" target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium flex items-center gap-2">
            <Github size={18} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/lu-hou-yang-ab69192a9" target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium flex items-center gap-2">
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}