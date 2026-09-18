import { Github, Linkedin, Mail, MapPin, Calendar, Award, Terminal, Database, Code, Download } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// TopoJSON for the clean stylized world map
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// --- Timeline distance scaling config ---
const TIMELINE_PX_PER_MONTH = 8; // px of vertical distance per month spent
const TIMELINE_MIN_GAP_PX = 64; // shortest allowed gap between nodes
const TIMELINE_MAX_GAP_PX = 196; // hard limit — no gap ever exceeds this

function timelineGapPx(months: number): number {
  return Math.max(TIMELINE_MIN_GAP_PX, Math.min(TIMELINE_MAX_GAP_PX, months * TIMELINE_PX_PER_MONTH));
}

type TimelineEvent = {
  date: string;
  title: string;
  location: string;
  description: string;
  tags: string[];
  highlight?: boolean;
  durationMonths: number;
};

const timelineEvents: TimelineEvent[] = [
  {
    date: "June 2004 - July 2022",
    title: "Sabahan",
    location: "Kota Kinabalu, Sabah",
    description: "Enjoying the mountain and beaches of Sabah",
    tags: ["Gunung Kinabalu", "Sang Yuk Mee"],
    highlight: true,
    durationMonths: 217,
  },
  {
    date: "July 2022 - May 2023",
    title: "Physical Sciences",
    location: "Kolej Matrikulasi Labuan (KML)",
    description: "Gratuated with 4.00 CGPA. Developed an interest in programming by joining hackathons.",
    tags: ["Tax Free Chocolate", "UK IYKYK"],
    highlight: true,
    durationMonths: 10,
  },
  {
    date: "Sept 2023 - May 2025",
    title: "BSc Computer Science (Hons) & GDSC Mobile Development Lead",
    location: "Universiti Teknologi PETRONAS",
    description:
      "Maintaining a 3.90 CGPA with 4-time Dean's List honors. Serving as Mobile Development Lead for GDSC-UTP, conducting workshops on Flutter, Firebase, TensorFlow, and GitHub.",
    tags: ["Computer Science", "GDSC Lead", "Dean's List"],
    highlight: true,
    durationMonths: 20,
  },
  {
    date: "May 2025 - Dec 2025",
    title: "Overseas Research Intern",
    location: "NUIS, Japan",
    description:
      "Developed Mixed Reality experiences for Microsoft HoloLens 2 using Unity 3D. Collected and analyzed multimodal eye-tracking, voice, and emotion data from 300+ students, and co-authored research findings.",
    tags: ["Mixed Reality", "Unity 3D", "AI/ML", "Research"],
    highlight: true,
    durationMonths: 7,
  },
  {
    date: "Dec 2025 - Present",
    title: "BSc Computer Science (Hons)",
    location: "Universiti Teknologi PETRONAS",
    description:
      "Final year in UTP, with a focus on conducting research on Extended Reality (XR), Digital Twin, Fundamental AI, Cultural, Cognition.",
    tags: ["Computer Science", "Research", "XR", "AI/ML"],
    highlight: true,
    durationMonths: 10,
  },
];

// Map coordinates + mercator scale (zoom) for each timeline location
const locationCoordinates: Record<string, { lat: number; lng: number; scale: number }> = {
  "Kota Kinabalu, Sabah": { lat: 5.9804, lng: 116.0735, scale: 1300 },
  "Kolej Matrikulasi Labuan (KML)": { lat: 5.2831, lng: 115.2308, scale: 1400 },
  "Universiti Teknologi PETRONAS": { lat: 4.386, lng: 100.979, scale: 1500 },
  "NUIS, Japan": { lat: 37.8465, lng: 138.9669, scale: 1100 },
};

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
    items: ["Python", "Java", "C++", "SQL", "Flutter", "React", "Angular"],
  },
  {
    category: "Cloud & Environments",
    icon: (
      <Database
        size={20}
        className="text-[#c2410c]"
      />
    ),
    items: ["Google Cloud Platform (GCP)", "AWS", "Microsoft Azure", "Git & GitHub", "Unity 3D"],
  },
  {
    category: "Core Competencies",
    icon: (
      <Terminal
        size={20}
        className="text-[#c2410c]"
      />
    ),
    items: ["AI/ML Models", "Computer Vision", "Data Analytics", "OOP", "App Development"],
  },
];

const certificationsData = [
  "Customizing your model with TensorFlow 2 (Imperial College London)",
  "Google Data Analytics Professional Certificate",
  "Introduction to Large Language Models (Google)",
  "React Basics & Intro to Front End Development (Meta)",
  "Introduction to Microsoft Azure Cloud Services",
  "AWS Cloud Foundations",
  "Git and GitHub Essentials (IBM)",
];

// --- Flat Square White Map (no globe, no mask) with smooth pan/zoom ---
function FlatMap({ activeLocation }: { activeLocation: string }) {
  const target = locationCoordinates[activeLocation] || { lat: 4.2105, lng: 101.9758, scale: 700 };
  const targetCenter: [number, number] = [target.lng, target.lat];
  const targetScale = target.scale;

  const [view, setView] = useState<{ center: [number, number]; scale: number }>({
    center: targetCenter,
    scale: targetScale,
  });
  const viewRef = useRef(view);

  // Ref-based rAF loop: guaranteed to re-trigger on every target change
  useEffect(() => {
    let frameId: number;
    const step = () => {
      const cur = viewRef.current;
      const dx = targetCenter[0] - cur.center[0];
      const dy = targetCenter[1] - cur.center[1];
      const ds = targetScale - cur.scale;

      if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01 && Math.abs(ds) < 0.5) {
        viewRef.current = { center: targetCenter, scale: targetScale };
        setView(viewRef.current);
        return; // stop loop
      }

      const next = {
        center: [cur.center[0] + dx * 0.08, cur.center[1] + dy * 0.08] as [number, number],
        scale: cur.scale + ds * 0.08,
      };
      viewRef.current = next;
      setView(next);
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetCenter[0], targetCenter[1], targetScale]);

  return (
    <div className="w-full h-full relative bg-[#d6d3d1] overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: view.center, scale: view.scale }}
        width={800}
        height={800}
        className="w-full h-full"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#ffffff"
                stroke="#1c1917"
                strokeWidth={0.75}
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{ outline: "none" }}
              />
            ))
          }
        </Geographies>

        {/* Active location marker */}
        <Marker coordinates={targetCenter}>
          <circle
            r={14}
            fill="#c2410c"
            opacity={0.25}
            className="animate-pulse"
          />
          <circle
            r={5}
            fill="#c2410c"
            stroke="#ffffff"
            strokeWidth={1.5}
          />
        </Marker>
      </ComposableMap>
    </div>
  );
}

// --- Timeline Item ---
function TimelineItem({ event, index, isActive }: { event: TimelineEvent; index: number; isActive: boolean }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const isLast = index === timelineEvents.length - 1;
  const gapPx = timelineGapPx(event.durationMonths);

  return (
    <div
      ref={ref}
      className={`flex gap-6 md:gap-8 transition-all duration-700 ease-out py-4 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${isActive ? "scale-100 opacity-100" : "scale-[0.96] opacity-30"}`}
    >
      {/* The Line & Dot */}
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full z-10 border-2 border-[#fdfbf7] dark:border-[#1c1917] transition-all duration-500 ${
            isActive
              ? "bg-[#c2410c] shadow-[0_0_14px_rgba(194,65,12,0.8)] ring-4 ring-[#c2410c]/20"
              : event.highlight
                ? "bg-[#d6d3d1] dark:bg-[#57534e]"
                : "bg-[#e7e5e4] dark:bg-[#44403c]"
          }`}
        />
        {/* flex-grow makes the line stretch to fill the scaled gap */}
        {!isLast && <div className="w-0.5 flex-grow bg-[#e7e5e4] dark:bg-[#44403c] mt-2 min-h-[40px]" />}
      </div>

      {/* The Content — bottom padding now scales with time spent (was pb-12) */}
      <div
        className="max-w-xl"
        style={{ paddingBottom: isLast ? 24 : gapPx }}
      >
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
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  // Live rect-based center detection: never goes stale, never skips, always re-fires
  const handleTimelineScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const centerLine = containerRect.top + containerRect.height / 2;

    const nodes = Array.from(container.querySelectorAll(".timeline-node")) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;

    nodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const nodeCenter = rect.top + rect.height / 2;
      const distance = Math.abs(centerLine - nodeCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeTimelineIndex) {
      setActiveTimelineIndex(closestIndex);
    }
  };

  return (
    <div className="flex flex-col gap-24">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. HERO REGION */}
      <section className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-[#292524] dark:text-[#fafaf9] tracking-tight">Lu Hou Yang</h1>
        <h2 className="text-xl text-[#78716c] dark:text-[#a8a29e] font-mono">Researcher | AI/ML & App Dev Specialist</h2>
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
        </div>
      </section>

      {/* 2. INTERACTIVE TIMELINE & SQUARE WHITE MAP */}
      <section className="flex flex-col gap-8">
        <h3 className="text-2xl font-semibold border-b border-[#e7e5e4] dark:border-[#44403c] pb-4 text-[#292524] dark:text-[#fafaf9]">
          Experience & Education
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[550px] mt-4 relative">
          {/* Scrollable Timeline */}
          <div
            onScroll={handleTimelineScroll}
            className="overflow-y-auto pl-8 pr-4 scroll-smooth hide-scrollbar relative"
          >
            <div className="h-[16px]"></div>

            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className="timeline-node"
              >
                <TimelineItem
                  event={event}
                  index={index}
                  isActive={activeTimelineIndex === index}
                />
              </div>
            ))}

            <div className="h-[200px]"></div>
          </div>

          {/* Square white map panel */}
          <div className="hidden lg:flex h-full w-full items-center justify-center sticky top-0">
            <div className="relative w-full max-w-[550px] aspect-square bg-white shadow-sm">
              <FlatMap activeLocation={timelineEvents[activeTimelineIndex].location} />
              <div className="absolute top-4 right-4 z-10 bg-[#fdfbf7]/90 dark:bg-[#1c1917]/90 px-4 py-2 rounded-lg border border-[#e7e5e4] dark:border-[#44403c] backdrop-blur-sm shadow-sm pointer-events-none">
                <p className="text-sm font-mono font-bold text-[#fb923c]">{timelineEvents[activeTimelineIndex].location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CREDENTIALS & SKILLS */}
      <section className="flex flex-col gap-8">
        <h3 className="text-2xl font-semibold border-b border-[#e7e5e4] dark:border-[#44403c] pb-4 text-[#292524] dark:text-[#fafaf9]">
          Skills & Certifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
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
