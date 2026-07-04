import { Github, Linkedin, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      {/* HERO REGION */}
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
        <div className="flex gap-4 mt-4">
          <a href="mailto:your.email@example.com" className="px-6 py-2 bg-[#292524] dark:bg-[#fafaf9] dark:text-[#1c1917] text-white rounded-lg hover:bg-[#c2410c] dark:hover:bg-[#c2410c] dark:hover:text-white transition-colors font-medium flex items-center gap-2">
            <Mail size={18} /> Contact
          </a>
          <a href="https://github.com/luhouyang" target="_blank" rel="noreferrer" className="px-6 py-2 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium flex items-center gap-2">
            <Github size={18} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/lu-hou-yang-ab69192a9" target="_blank" rel="noreferrer" className="px-6 py-2 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium flex items-center gap-2">
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>
      </section>

      {/* TIMELINE REGION */}
      <section className="flex flex-col gap-8">
        <h3 className="text-2xl font-semibold border-b border-[#e7e5e4] dark:border-[#44403c] pb-4 text-[#292524] dark:text-[#fafaf9]">Key Milestones</h3>
        
        <div className="flex flex-col gap-6">
          <div className="archival-card">
            <span className="text-sm font-mono text-[#78716c] dark:text-[#a8a29e]">2024</span>
            <h4 className="text-lg font-medium text-[#292524] dark:text-[#fafaf9] mt-1">DevFest George Town & GDG</h4>
            <p className="text-[#44403c] dark:text-[#d6d3d1] mt-2">Served on the organizing committee for Google DevFest, connecting fellow developers and practitioners through technical talks and workshops.</p>
          </div>

          <div className="archival-card">
            <span className="text-sm font-mono text-[#78716c] dark:text-[#a8a29e]">2024</span>
            <h4 className="text-lg font-medium text-[#292524] dark:text-[#fafaf9] mt-1">RoboCup Malaysia Open</h4>
            <p className="text-[#44403c] dark:text-[#d6d3d1] mt-2">Built a robot from scratch to compete in the first RoboCup in Malaysia, focusing on software-hardware integration and autonomous AI systems.</p>
          </div>

          <div className="archival-card">
            <span className="text-sm font-mono text-[#78716c] dark:text-[#a8a29e]">2024</span>
            <h4 className="text-lg font-medium text-[#292524] dark:text-[#fafaf9] mt-1">Head of PR, Campus Venture (CAVE)</h4>
            <p className="text-[#44403c] dark:text-[#d6d3d1] mt-2">Managed communications for UTP's massive CAVE event, attracting over 1,000 students and 80 clubs and societies.</p>
          </div>
        </div>
      </section>
    </div>
  );
}