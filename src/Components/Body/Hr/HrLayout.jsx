import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Typography } from "../../Common";
import HrHero from "./Components/HrHero";
import GenerateHrCard from "./Components/GenerateHrCard";
import HrSetCard from "./Components/HrSetCard";

const HrLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isArenaRoot = location.pathname === "/hr" || location.pathname === "/hr/";

  // Simple numeric sets for HR Arena
  const hrSets = [1, 2, 3, 4, 5, 6];

  if (!isArenaRoot) return <Outlet />;

  return (
    <div className="w-full min-h-screen bg-[#01080E] px-6 lg:px-20 py-12 space-y-12 animate-fade-in relative overflow-hidden text-left font-inter">
      <div className="relative z-10 space-y-12 max-w-7xl mx-auto">
        <HrHero />
        
        <GenerateHrCard onGenerate={() => navigate(`/hr/hr-new/question-form`)} />

        {/* Section Label */}
        <div className="flex items-center gap-4">
           <Typography variant="h4" className="!mb-0 uppercase tracking-[0.4em] text-[10px] font-black text-accent-main opacity-50">Behavioral Protocols</Typography>
           <div className="flex-1 h-px bg-gradient-to-r from-accent-main/20 via-white/5 to-transparent"></div>
        </div>

        {/* Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {hrSets.map((setNum, index) => (
             <HrSetCard 
                key={setNum} 
                index={index} 
                onClick={() => navigate(`/hr/hr-${setNum}/question-form`)} 
             />
           ))}
        </div>
      </div>
    </div>
  );
};

export default HrLayout;