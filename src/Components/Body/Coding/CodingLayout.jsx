import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../../Common";
import { getCodingSets } from "../../../store/codingSetSlice";
import { generateQuestions, resetGeneration } from "../../../store/codingQuestionSlice";
import {
  ModeCard,
  AIHeroSection,
  GenerationConfigModal,
  GenerationStatusModal,
  ChallengeSetSelector
} from "./Components";

const CodingLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: codingSets, loading: setsLoading } = useSelector(
    (state) => state.codingSets
  );

  const { status: genStatus, generatedSetId } = useSelector(
    (state) => state.codingQuestions
  );

  const [mode, setMode] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showGenModal, setShowGenModal] = useState(false);
  const [countdown, setCountdown] = useState(300);
  
  // default easy
  const [config, setConfig] = useState({
    difficulty: "easy",
    count: 1
  });
  
  useEffect(() => {
    if (mode) dispatch(getCodingSets());
  }, [mode, dispatch]);

  useEffect(() => {
    let timer;
    if (genStatus === "generating" && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [genStatus, countdown]);

  useEffect(() => {
    if (genStatus === "completed" && generatedSetId) {
      navigate(`/coding/normal/${generatedSetId}`);
      dispatch(resetGeneration());
      setShowGenModal(false);
    }
  }, [genStatus, generatedSetId, navigate, dispatch]);

  const handleStartGeneration = () => {
    const payload = {
      count: config.count,
      level: [config.difficulty]
    };

    dispatch(generateQuestions(payload));

    setShowConfigModal(false);

    // ensure latest config used
    setTimeout(() => {
      setShowGenModal(true);
    }, 0);

    setCountdown(300);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const practiceModes = [
    {
      id: "normal",
      title: "Self practice",
      desc: "Simulate a real coding interview at your own pace.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-cyan-500/20 to-blue-500/20",
      accent: "text-cyan-400"
    },
    {
      id: "realtime",
      title: "Realtime Battle",
      desc: "Face an AI interviewer or other candidates in real-time.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "from-violet-500/20 to-purple-500/20",
      accent: "text-violet-400"
    },
    {
      id: "playground",
      title: "Free Playground",
      desc: "No restrictions. Experiment with code snippets and logic.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: "from-emerald-500/20 to-teal-500/20",
      accent: "text-emerald-400"
    }
  ];

  return (
    <div className="py-12 px-6 lg:px-20 max-w-7xl mx-auto space-y-16 animate-fade-in relative z-10">

      <div className="space-y-4 text-center">
        <Typography
          variant="h1"
          className="!text-5xl lg:!text-6xl font-black tracking-tighter 
          bg-clip-text text-transparent bg-gradient-to-r 
          from-white via-white/80 to-white/40"
        >
          Master the <span className="text-accent-main">Algorithms.</span>
        </Typography>

        <Typography
          variant="body"
          className="max-w-2xl mx-auto text-text-subtle text-lg leading-relaxed"
        >
          Choose your environment and sharpen your technical edge with
          personalized AI feedback and real-time execution.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {practiceModes.map((m) => (
          <ModeCard
            key={m.id}
            mode={m}
            onClick={() =>
              m.id === "playground" ? navigate("playground") : setMode(m.id)
            }
          />
        ))}
      </div>

      <AIHeroSection onGenerateClick={() => setShowConfigModal(true)} />

      <GenerationConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        config={config}
        setConfig={setConfig}
        onStart={handleStartGeneration}
      />

      <GenerationStatusModal
        isOpen={showGenModal}
        onClose={() => setShowGenModal(false)}
        genStatus={genStatus}
        countdown={countdown}
        config={{ ...config }}
        formatTime={formatTime}
      />

      <ChallengeSetSelector
        isOpen={!!mode}
        onClose={() => setMode(null)}
        mode={mode}
        setsLoading={setsLoading}
        codingSets={codingSets}
        onSelect={(set) => {
          navigate(`/coding/${mode || "normal"}/${set.coding_set_id}`);
          setMode(null);
        }}
      />
    </div>
  );
};

export default CodingLayout;