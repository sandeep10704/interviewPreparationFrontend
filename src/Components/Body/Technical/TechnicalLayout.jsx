import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../../Common";
import { getTechnicalSets, generateTechnicalQuestions } from "../../../store/technicalSlice";
import TechnicalHero from "./Components/TechnicalHero";
import GenerateCard from "./Components/GenerateCard";
import SetCard from "./Components/SetCard";

const TechnicalLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { sets, loading, generating } = useSelector((state) => state.technical);
  const isArenaRoot = location.pathname === "/technical" || location.pathname === "/technical/";

  useEffect(() => {
    if (isArenaRoot) {
      dispatch(getTechnicalSets());
    }
  }, [isArenaRoot, dispatch]);

  const handleGenerate = async () => {
    console.log("Initiating Technical Synthesis...");
    const resultAction = await dispatch(generateTechnicalQuestions());
    if (generateTechnicalQuestions.fulfilled.match(resultAction)) {
       console.log("Synthesis Success:", resultAction.payload);
       const newSetId = resultAction.payload.technical_set_id;
       if (newSetId) {
          // Default to question form for new generations
          navigate(`/technical/${newSetId}/question-form`);
       } else {
          console.error("Critical: technical_set_id missing from response.");
       }
    } else {
       console.error("Synthesis Failed:", resultAction.payload);
    }
  };

  const navigateToMode = (set, mode) => {
    const id = set.technical_set_id || set.id;
    console.log(`Routing session ${id} to ${mode} mode...`);
    if (id) {
       navigate(`/technical/${id}/${mode}`);
    }
  };

  if (!isArenaRoot) return <Outlet />;

  return (
    <div className="w-full min-h-screen bg-[#01080E] px-6 lg:px-20 py-12 space-y-12 animate-fade-in relative overflow-hidden text-left font-inter">
      <div className="relative z-10 space-y-12 max-w-7xl mx-auto">
        <TechnicalHero />
        
        <GenerateCard 
           onGenerate={handleGenerate} 
           disabled={generating}
        />

        {/* Section Label */}
        <div className="flex items-center gap-4">
           <Typography variant="h4" className="!mb-0 uppercase tracking-[0.4em] text-[10px] font-black text-accent-main opacity-50">Operational Sets</Typography>
           <div className="flex-1 h-px bg-gradient-to-r from-accent-main/20 via-white/5 to-transparent"></div>
        </div>

        {/* Loading State or Sets Grid */}
        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                 <div key={i} className="h-80 rounded-[40px] bg-white/5 border border-white/10"></div>
              ))}
           </div>
        ) : sets.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sets.map((set, index) => (
                <SetCard 
                   key={set.technical_set_id || index} 
                   set={{ ...set, id: set.technical_set_id }} 
                   index={index} 
                   onStandard={() => navigateToMode(set, "question-form")}
                   onRealtime={() => navigateToMode(set, "realtime")}
                />
              ))}
           </div>
        ) : (
           <div className="py-20 text-center border border-dashed border-white/10 rounded-[48px]">
              <Typography className="text-text-subtle opacity-40 uppercase tracking-widest font-black text-xs">No active sessions localized</Typography>
           </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalLayout;
