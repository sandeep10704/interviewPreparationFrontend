import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Typography } from "../../Common";
import TechnicalHero from "./Components/TechnicalHero";
import GenerateCard from "./Components/GenerateCard";
import SetCard from "./Components/SetCard";

const TechnicalLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isArenaRoot = location.pathname === "/technical" || location.pathname === "/technical/";

  // Static Mock Data for UI demonstration
  const techSets = [
    { id: "tech-1", isAttempted: true },
    { id: "tech-2", isAttempted: false },
    { id: "tech-3", isAttempted: true },
    { id: "tech-4", isAttempted: false },
    { id: "tech-5", isAttempted: false },
    { id: "tech-6", isAttempted: false },
  ];

  const handleSetClick = (set) => {
    if (set.isAttempted) {
      navigate(`/technical/${set.id}/question-form?view=feedback`);
    } else {
      navigate(`/technical/${set.id}/question-form`);
    }
  };

  if (!isArenaRoot) return <Outlet />;

  return (
    <div className="w-full min-h-screen bg-[#01080E] px-6 lg:px-20 py-12 space-y-12 animate-fade-in relative overflow-hidden text-left">
      <div className="relative z-10 space-y-12 max-w-7xl mx-auto">
        <TechnicalHero />
        
        <GenerateCard onGenerate={() => navigate(`/technical/tech-new/question-form`)} />

        {/* Section Label */}
        <div className="flex items-center gap-4">
           <Typography variant="h4" className="!mb-0 uppercase tracking-[0.4em] text-[10px] font-black text-accent-main opacity-50">Operational Sets</Typography>
           <div className="flex-1 h-px bg-gradient-to-r from-accent-main/20 via-white/5 to-transparent"></div>
        </div>

        {/* Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {techSets.map((set, index) => (
             <SetCard 
                key={set.id} 
                set={set} 
                index={index} 
                onClick={() => handleSetClick(set)} 
             />
           ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalLayout;
