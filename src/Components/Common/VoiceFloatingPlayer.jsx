import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stopVoice } from "../../store/sarvamSlice";

const VoiceFloatingPlayer = () => {
  const { isPlaying, audioUrl, text } = useSelector(
    (state) => state.sarvam
  );

  const audioRef = useRef(null);
  const dispatch = useDispatch();

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  /* 🎧 AUDIO PLAY */
  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio();
    audioRef.current = audio;

    audio.src = audioUrl;
    audio.preload = "auto";

    audio.oncanplaythrough = () => {
      audio.play().catch(err => {
        console.error("play failed:", err);
      });
    };

    audio.onended = () => {
      dispatch(stopVoice());
      setDisplayText("");
      setIndex(0);
    };

    audio.onerror = () => {
      dispatch(stopVoice());
    };

    audio.load();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [audioUrl, dispatch]);

  /* 🔥 SUBTITLE EFFECT */
  useEffect(() => {
    if (!text) return;

    setDisplayText("");
    setIndex(0);

    const cleanText = text.replace(/[*#`]/g, "");

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + cleanText.charAt(index));
      setIndex((prev) => prev + 1);
    }, 20); // speed (lower = faster)

    return () => clearInterval(interval);
  }, [text]);

  if (!isPlaying) return null;

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-[#0B0F17] border border-white/10 rounded-2xl shadow-2xl p-4 z-50">

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />

        <div>
          <p className="text-xs text-gray-400">
            AI Interviewer
          </p>
          <p className="text-sm text-white">
            Speaking...
          </p>
        </div>
      </div>

      {/* 🔥 SUBTITLE TEXT */}
      <div className="mt-3 text-sm text-white/90 leading-relaxed min-h-[60px]">
        {displayText}
        <span className="animate-pulse">|</span>
      </div>

    </div>
  );
};

export default VoiceFloatingPlayer;