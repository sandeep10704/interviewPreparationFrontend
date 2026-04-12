import React, { useState, useEffect } from 'react';
import _Lottie from 'lottie-react';

// Handle potential ESM/Default export variations in different environments
const Lottie = _Lottie?.default || _Lottie;

const LOADING_LOTTIE_URL = "https://lottie.host/8e58122d-e6b7-4c47-aaa3-4334f59049e2/pC6oE0zB5n.json";

const Loading = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(LOADING_LOTTIE_URL)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Error loading Lottie animation:", err));
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <div className="w-48 h-48 relative">
          {animationData ? (
            <Lottie 
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          ) : (
            // Fallback high-tech spinner while Lottie JSON is fetching
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-accent-main/20 border-t-accent-main rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center space-y-2">
          <p className="text-accent-main font-bold tracking-[0.2em] animate-pulse uppercase text-sm">
            Initializing System
          </p>
          <div className="flex gap-1 justify-center">
            <span className="w-1 h-1 bg-accent-main rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 bg-accent-main rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-accent-main rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
