import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowRight, MapPin, Calendar, Award, Terminal, Database, Code, Download } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type TimelineEvent = {
  date: string;
  title: string;
  location: string;
  description: string;
  tags: string[];
  highlight?: boolean;
};

// Timeline Data integrating resume journey
const timelineEvents: TimelineEvent[] = [
  {
    date: "Jun 2026",
    title: "AWS x UTP GenAI Hackathon Champion",
    location: "Chancellor Hall, UTP",
    description:
      "Won 1st Place (RM 1,200) at the AWS x UTP GenAI Hackathon 2026, building innovative generative AI applications with my team under tight time constraints.",
    tags: ["Hackathon", "AI/ML", "Competition"],
  },
  {
    date: "Mar 2026",
    title: "Codexia Competition Champion",
    location: "UTP Computing Department",
    description:
      "Achieved 1st place and won RM 2,000 at the Codexia Competition, collaborating with teammates to deliver an exceptional software solution.",
    tags: ["Hackathon", "Competition", "Software Development"],
  },
  {
    date: "Feb 2026",
    title: "Research Sharing & AI Workshop Speaker",
    location: "UTP",
    description:
      "Co-hosted an internship sharing session presenting insights from my NUIS Japan research internship, and delivered the beginner-friendly 'AI Unlocked!' workshop introducing AI and Small Language Models.",
    tags: ["Research", "Mixed Reality", "AI/ML", "Workshop"],
  },
  {
    date: "May 2025 - Dec 2025",
    title: "Overseas Research Intern",
    location: "NUIS, Japan",
    description:
      "Developed Mixed Reality experiences for Microsoft HoloLens 2 using Unity 3D. Collected and analyzed multimodal eye-tracking, voice, and emotion data from 300+ students, and co-authored research findings.",
    tags: ["Mixed Reality", "Unity 3D", "AI/ML", "Research"],
    highlight: true,
  },
  {
    date: "Jul 2024",
    title: "E3S2 Hackathon Champion",
    location: "Universiti Teknologi PETRONAS",
    description:
      "Achieved 1st place and won a RM 1,500 prize by collaborating with a team of tech enthusiasts to build an innovative solution under strict time constraints.",
    tags: ["Hackathon", "Competition", "Software Development"],
  },
  {
    date: "May 2024 - Jun 2024",
    title: "Head Trainer & Technical Speaker",
    location: "UTP GDSC & Syntech Club",
    description:
      "Prepared modules and delivered multiple technical workshops, including a 3-Day Flutter Firebase Bootcamp and a TensorFlow Computer Vision session for OCR modeling.",
    tags: ["Flutter", "Firebase", "TensorFlow", "Workshop"],
  },
  {
    date: "May 2024",
    title: "Head of PR, Campus Venture (CAVE)",
    location: "Universiti Teknologi PETRONAS",
    description:
      "Managed public relations and communications, liaising with VIPs, performers, and over 160 school visitors while leading a team of 4 for social media outreach.",
    tags: ["Leadership", "Public Relations", "Event Management"],
  },
  {
    date: "Sept 2023 - Present",
    title: "BSc Computer Science (Hons) & GDSC Mobile Development Lead",
    location: "Universiti Teknologi PETRONAS",
    description:
      "Maintaining a 3.90 CGPA with 4-time Dean's List honors. Serving as Mobile Development Lead for GDSC-UTP, conducting workshops on Flutter, Firebase, TensorFlow, and GitHub.",
    tags: ["Computer Science", "GDSC Lead", "Dean's List"],
    highlight: true,
  },
];

// Skills & Credentials Data
const skillsData = [
  {
    category: "Languages & Frameworks",
    icon: (
      <Code
        size={20}
        className="text-[#c2410c]"
      />
    ),
    items: ["Python", "Java", "C++", "SQL", "Flutter", "React", "Angular"], //[cite: 3]
  },
  {
    category: "Cloud & Environments",
    icon: (
      <Database
        size={20}
        className="text-[#c2410c]"
      />
    ),
    items: ["Google Cloud Platform (GCP)", "AWS", "Microsoft Azure", "Git & GitHub", "Unity 3D"], //[cite: 3]
  },
  {
    category: "Core Competencies",
    icon: (
      <Terminal
        size={20}
        className="text-[#c2410c]"
      />
    ),
    items: ["AI/ML Models", "Computer Vision", "Data Analytics", "OOP", "App Development"], //[cite: 3]
  },
];

const certificationsData = [
  "Customizing your model with TensorFlow 2 (Imperial College London)", //[cite: 3]
  "Google Data Analytics Professional Certificate", //[cite: 3]
  "Introduction to Large Language Models (Google)", //[cite: 3]
  "React Basics & Intro to Front End Development (Meta)", //[cite: 3]
  "Introduction to Microsoft Azure Cloud Services", //[cite: 3]
  "AWS Cloud Foundations", //[cite: 3]
  "Git and GitHub Essentials (IBM)", //[cite: 3]
];

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`flex gap-6 md:gap-10 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* The Line & Dot */}
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full z-10 border-2 border-[#fdfbf7] dark:border-[#1c1917] transition-all ${
            event.highlight
              ? "bg-[#c2410c] shadow-[0_0_14px_rgba(194,65,12,0.55)] ring-4 ring-[#c2410c]/10"
              : "bg-[#d6d3d1] dark:bg-[#57534e]"
          }`}
        />

        {index < timelineEvents.length - 1 && <div className="w-0.5 flex-grow bg-[#e7e5e4] dark:bg-[#44403c] mt-2" />}
      </div>

      {/* The Content */}
      <div className="pb-12 max-w-xl">
        <div className="flex flex-wrap items-center gap-3 mb-2 text-sm font-mono text-[#78716c] dark:text-[#a8a29e]">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {event.date}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {event.location}
          </span>
        </div>

        <h3
          className={`text-xl font-bold mb-2 flex flex-wrap items-center gap-2 ${
            event.highlight ? "text-[#c2410c] dark:text-[#fb923c]" : "text-[#292524] dark:text-[#fafaf9]"
          }`}
        >
          {event.title}

          {event.highlight && (
            <span className="inline-flex items-center rounded-full border border-[#c2410c]/30 bg-[#c2410c]/10 px-2 py-0.5 text-xs font-mono text-[#c2410c] dark:text-[#fb923c]">
              Key Milestone
            </span>
          )}
        </h3>

        <p className="text-[#44403c] dark:text-[#d6d3d1] leading-relaxed mb-4">{event.description}</p>

        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-1 rounded bg-[#f5f5f4] dark:bg-[#292524] text-[#78716c] dark:text-[#a8a29e] border border-[#e7e5e4] dark:border-[#44403c]"
            >
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
        <h1 className="text-4xl md:text-6xl font-bold text-[#292524] dark:text-[#fafaf9] tracking-tight">Lu Hou Yang</h1>
        <h2 className="text-xl text-[#78716c] dark:text-[#a8a29e] font-mono">Software Developer | AI/ML & App Dev Specialist</h2>
        <p className="text-lg text-[#44403c] dark:text-[#d6d3d1] leading-relaxed">
          Currently pursuing a Bachelor's in Computer Science at Universiti Teknologi PETRONAS with a CGPA of 3.90. I build
          intelligent applications, train computer vision models, and lead technical workshops. When I'm not developing mobile
          architectures or analyzing data, you can find me playing the piano.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <a
            href="mailto:luhouyang@gmail.com"
            className="px-6 py-2 bg-[#292524] dark:bg-[#fafaf9] dark:text-[#1c1917] text-white rounded-lg hover:bg-[#c2410c] dark:hover:bg-[#c2410c] dark:hover:text-white transition-colors font-medium flex items-center gap-2"
          >
            <Mail size={18} /> Contact
          </a>

          <a
            href="/assets/resume/lu-hou-yang-resume.pdf"
            download="Lu_Hou_Yang_Resume.pdf"
            className="px-6 py-2 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium flex items-center gap-2"
          >
            <Download size={16} /> Download Resume
          </a>

          <Link
            to="/works"
            className="px-6 py-2 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium flex items-center gap-2"
          >
            View Works <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 2. INTERACTIVE TIMELINE */}
      <section className="flex flex-col gap-8">
        <h3 className="text-2xl font-semibold border-b border-[#e7e5e4] dark:border-[#44403c] pb-4 text-[#292524] dark:text-[#fafaf9]">
          Experience & Education
        </h3>
        <div className="relative mt-4">
          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={index}
              event={event}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* 3. CREDENTIALS & SKILLS (NEW SECTION) */}
      <section className="flex flex-col gap-8">
        <h3 className="text-2xl font-semibold border-b border-[#e7e5e4] dark:border-[#44403c] pb-4 text-[#292524] dark:text-[#fafaf9]">
          Skills & Certifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
          {/* Technical Skills Map */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-[#292524] dark:text-[#fafaf9] mb-2">Technical Capabilities</h4>
            {skillsData.map((skillGroup, index) => (
              <div
                key={index}
                className="flex gap-4"
              >
                <div className="mt-1">{skillGroup.icon}</div>
                <div>
                  <h5 className="font-semibold text-[#44403c] dark:text-[#d6d3d1] mb-2">{skillGroup.category}</h5>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-sm px-3 py-1 bg-[#fdfbf7] dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-[#44403c] rounded-md text-[#78716c] dark:text-[#a8a29e]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications List */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-[#292524] dark:text-[#fafaf9] mb-4">Professional Certifications</h4>
            <div className="space-y-4">
              {certificationsData.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <Award
                    size={18}
                    className="text-[#c2410c] mt-0.5 shrink-0"
                  />
                  <span className="text-sm font-medium text-[#44403c] dark:text-[#d6d3d1] leading-relaxed">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. COLLABORATION PORTAL */}
      <section className="p-8 md:p-12 rounded-2xl border border-[#e7e5e4] dark:border-[#44403c] bg-[#fdfbf7]/60 dark:bg-[#1c1917]/60 shadow-sm text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#292524] dark:text-[#fafaf9]">Let's Build Something Impactful</h2>
        <p className="text-[#44403c] dark:text-[#d6d3d1] max-w-2xl mx-auto text-lg">
          Whether you are looking to collaborate on AI modeling, application development, or community workshops, I am always open
          to connecting with fellow developers and engineers.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="mailto:luhouyang@gmail.com"
            className="px-6 py-3 bg-[#c2410c] text-white rounded-lg hover:bg-[#9a3412] transition-colors font-medium flex items-center gap-2 shadow-lg shadow-[#c2410c]/20"
          >
            <Mail size={18} /> Email Me
          </a>
          <a
            href="https://github.com/luhouyang"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium flex items-center gap-2"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/lu-hou-yang-ab69192a9"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium flex items-center gap-2"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>
      </section>

      {/* 5. ONGOING PROJECTS */}
      <div className="wrapper mt-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-[#292524] dark:text-[#fafaf9]">Ongoing Projects</h2>
        <hr className="border-[#e7e5e4] dark:border-[#44403c] mb-8" />

        <div className="flex flex-col gap-10">
          <div
            className="flex flex-col md:flex-row gap-8"
            id="googleclassroom"
          >
            <img
              src="assets/ongoing/gdsc_utp_logo.webp"
              alt="Google Classroom Image"
              className="w-48 object-contain rounded-xl"
            />
            <div className="flex flex-col justify-center gap-4">
              <p className="text-[#44403c] dark:text-[#d6d3d1] leading-relaxed">
                Google Classroom started to share workshop materials to all UTP students and other interested people. With
                hands-on tutorials and full explanations on latest technologies such as TensorFlow, Flutter, Firebase, GitHub and
                more. The materials are maintained by me and my friends as a side project and initiative to raise technicality
                level of students.
              </p>
              <div>
                <a
                  href="https://classroom.google.com/c/NjkzNzI5NzE5NTUy?cjc=tlab4o7"
                  className="inline-flex px-5 py-2.5 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Google Classroom
                </a>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row gap-8"
            id="gdggt"
          >
            <img
              src="assets/ongoing/gdg_gt.png"
              alt="GDG George Town 2024"
              className="w-48 object-contain rounded-xl"
            />
            <div className="flex flex-col justify-center gap-4">
              <p className="text-[#44403c] dark:text-[#d6d3d1] leading-relaxed">
                Organizing committee of events held by GDG George Town 2024. Such as Devfest George Town 2024. These
                community-organized events focus on learning, building, and connecting with fellow developers and tech
                practitioners. They offer a variety of activities, including technical talks, workshops, and networking
                opportunities.
              </p>
              <div>
                <a
                  href="https://gdg.community.dev/gdg-george-town/"
                  className="inline-flex px-5 py-2.5 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit GDG Site
                </a>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row gap-8"
            id="ogp"
          >
            <img
              src="assets/ongoing/OG_logo.png"
              alt="Open-Genome Project Logo"
              className="w-48 object-contain rounded-xl"
            />
            <div className="flex flex-col justify-center gap-4">
              <p className="text-[#44403c] dark:text-[#d6d3d1] leading-relaxed">
                Open-source genome database for XAI (Explainable Artificial Intelligence) Models. Aims to map out areas of
                interest in various AI models that contribute to the skill & behaviour of models. Help researchers, ML engineers &
                decision makers, better understand & regulate AI development towards a safer, more useful, "humanity aligned"
                future.
              </p>
              <div>
                <a
                  href="https://open-genome-project.org/"
                  className="inline-flex px-5 py-2.5 bg-[#f5f5f4] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1] border border-[#e7e5e4] dark:border-[#44403c] rounded-lg hover:border-[#c2410c] hover:text-[#c2410c] transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
