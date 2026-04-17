import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../../Common";
import { generateHRQuestions } from "../../../store/hrSlice";
import HrHero from "./Components/HrHero";
import GenerateHrCard from "./Components/GenerateHrCard";
import HrSetCard from "./Components/HrSetCard";

const HrLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Destructuring with default to prevent crash if state.hr is momentarily undefined
  const { generating } = useSelector((state) => state.hr || { generating: false });
  const isArenaRoot = location.pathname === "/hr" || location.pathname === "/hr/";

  const handleGenerate = async () => {
    console.log("Initiating Behavioral Synthesis...");
    // According to OpenAPI, HR questions generation requires 'role' and 'company'
    const resultAction = await dispatch(generateHRQuestions({
       role: "Software Engineer",
       company: "Modern Tech Firm"
    }));

    if (generateHRQuestions.fulfilled.match(resultAction)) {
       console.log("Behavioral Success:", resultAction.payload);
       const newHrSetId = resultAction.payload.hr_set_id;
       if (newHrSetId) {
          navigate(`/hr/${newHrSetId}/question-form`);
       } else {
          console.error("Critical: hr_set_id missing from response.");
       }
    } else {
       console.error("Behavioral Synthesis Failed:", resultAction.payload);
    }
  };

  const handleSetClick = (setNum) => {
    console.log("Navigating to static HR Prototype:", setNum);
    navigate(`/hr/hr-${setNum}/question-form`);
  };

  if (!isArenaRoot) return <Outlet />;

  return (
    <div className="w-full min-h-screen bg-[#01080E] px-6 lg:px-20 py-12 space-y-12 animate-fade-in relative overflow-hidden text-left font-inter">
      <div className="relative z-10 space-y-12 max-w-7xl mx-auto">
        <HrHero />
        
        <GenerateHrCard 
           onGenerate={handleGenerate} 
           disabled={generating}
        />

        {/* Section Label */}
        <div className="flex items-center gap-4">
           <Typography variant="h4" className="!mb-0 uppercase tracking-[0.4em] text-[10px] font-black text-accent-main opacity-50">Behavioral Protocols</Typography>
           <div className="flex-1 h-px bg-gradient-to-r from-accent-main/20 via-white/5 to-transparent"></div>
        </div>

        {/* Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[1, 2, 3, 4, 5, 6].map((setNum) => (
             <HrSetCard 
                key={setNum} 
                index={setNum - 1} 
                onClick={() => handleSetClick(setNum)} 
             />
           ))}
        </div>
      </div>
    </div>
  );
};

export default HrLayout;