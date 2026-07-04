import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Works from './pages/Works';
import AcademyCatalog from './pages/AcademyCatalog';
import TutorialLayout from './pages/TutorialLayout';
import { useParallax } from './hooks/useParallax'; 

export default function App() {
  useParallax(); 

  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className="min-h-screen flex flex-col selection:bg-[#0ea5e9] selection:text-white text-[#334155] dark:text-[#cbd5e1] transition-colors relative z-10">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-6 max-w-5xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/academy" element={<AcademyCatalog />} />
            <Route path="/academy/:slug" element={<TutorialLayout />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}