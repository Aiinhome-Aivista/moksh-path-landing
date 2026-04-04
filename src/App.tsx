import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import "./App.css";

import ProgramSelector from "./components/home/mokshPathDashboard";
import { useEffect, useState } from 'react'


function App() {
  // 1. Unified navigation state
  const [view, setView] = useState<"HOME" | "LANDING" | "REGISTRATION" | "DASHBOARD">("HOME");



  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    const observeAll = () => {
      document.querySelectorAll(".fade-in:not(.visible)").forEach((el) => {
        intersectionObserver.observe(el);
      });
    };

    observeAll();

    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [view]); // Run observer logic whenever the view switches







  return (
    <>
      {/* 2. Logic-driven Rendering: Only one view shows at a time */}

      {view === "HOME" && (
        <ProgramSelector onSelectAccelerated={() => setView("LANDING")} />
      )}


    </>
  );
}

export default App;