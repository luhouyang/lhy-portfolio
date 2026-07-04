import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { BookOpen, FolderGit2, Home } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home", icon: Home },
    { path: "/works", label: "Works", icon: FolderGit2 },
    { path: "/academy", label: "Academy", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#c2410c] dark:bg-[#7c2d12] shadow-lg shadow-[#c2410c]/20 dark:shadow-black/40 transition-colors duration-300">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-[#fdfbf7] dark:text-[#fafaf9]"
        >
          Lu Hou Yang<span className="text-[#fed7aa]">.</span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 text-sm font-medium transition-all pb-1 border-b-2
                  ${
                    isActive
                      ? "text-[#ffffff] border-[#ffffff]"
                      : "text-[#fed7aa] dark:text-[#fdba74] border-transparent hover:text-[#ffffff] hover:border-[#ffffff]/50"
                  }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
