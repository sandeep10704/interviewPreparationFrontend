import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#01080E]/80 backdrop-blur-xl">
      <div className="flex flex-col items-center">
        {/* CSS Neural Core Animation - No external dependencies to fail */}
        <div className="relative w-32 h-32 flex items-center justify-center">
           {/* Inner Core */}
           <div className="absolute w-4 h-4 bg-accent-main rounded-full shadow-[0_0_20px_#32d0c8]"></div>
           
           {/* Orbit 1 */}
           <div className="absolute w-12 h-12 border border-accent-main/30 rounded-full animate-ping"></div>
           
           {/* Orbit 2 */}
           <div className="absolute w-20 h-20 border border-white/10 rounded-full animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent-main rounded-full shadow-[0_0_10px_#32d0c8]"></div>
           </div>

           {/* Pulse Ring */}
           <div className="absolute inset-0 border-2 border-accent-main/20 rounded-[40px] animate-pulse"></div>
        </div>

        <div className="mt-12 text-center space-y-3">
          <p className="text-accent-main font-black tracking-[0.4em] animate-pulse uppercase text-[10px]">
            Neural Network Initialization
          </p>
          <div className="flex gap-2 justify-center opacity-30">
            <span className="w-1 h-3 bg-accent-main rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-3 bg-accent-main rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-3 bg-accent-main rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
