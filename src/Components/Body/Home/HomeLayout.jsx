import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Card } from '../../Common';

const HomeLayout = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6 lg:px-20 overflow-hidden text-left">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-main/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-main/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-bg border border-accent-border text-accent-main text-sm font-medium animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-main opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-main"></span>
              </span>
              AI-Powered Interview Preparation
            </div>

            <div className="space-y-4">
              <Typography variant="h1" className="!text-6xl lg:!text-7xl leading-[1.1]">
                Crack Your Next <br />
                Interview with <span className="text-accent-main">Confidence</span>
              </Typography>
              <Typography variant="h3" className="text-accent-main font-semibold tracking-wide">
                Your Career, Powered by AI
              </Typography>
            </div>

            <Typography variant="body" className="max-w-xl text-text-subtle">
              Practice smarter with AI-driven mock interviews, real-time coding challenges, and intelligent resume analysis.
              Get personalized feedback, improve your weak areas, and prepare for top companies with confidence.
            </Typography>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/signup">
                <Button size="lg" className="px-8 !rounded-full shadow-lg hover:shadow-accent-main/20">
                  Start Practicing Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 !rounded-full">
                Upload Resume
              </Button>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center">
            {/* Visual Element with Floating Cards */}
            <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-accent-main/10 rounded-full blur-[100px] animate-pulse"></div>

              <div className="relative w-[70%] aspect-square rounded-full border border-white/10 overflow-hidden shadow-2xl z-10">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="AI Interviewer"
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Card 1 (Top Left) */}
              <div className="absolute -left-6 top-[15%] z-20 animate-float shadow-2xl">
                <div className="bg-card/90 backdrop-blur-md border border-border-main rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-bg flex items-center justify-center text-accent-main">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-text-subtle font-bold uppercase tracking-widest">AI Resume Analysis</div>
                    <div className="text-sm font-bold text-text-main">Strong Match Identified</div>
                  </div>
                </div>
              </div>

              {/* Card 2 (Top Right) */}
              <div className="absolute -right-10 top-[35%] z-20 animate-float-delayed shadow-2xl">
                <div className="bg-card/90 backdrop-blur-md border border-border-main rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-text-subtle font-bold uppercase tracking-widest">Performance Insight</div>
                    <div className="text-sm font-bold text-text-main">Above Average</div>
                  </div>
                </div>
              </div>

              {/* Card 3 (Bottom Left) */}
              <div className="absolute bottom-[10%] -left-4 z-20 animate-float shadow-2xl">
                <div className="bg-card/90 backdrop-blur-md border border-border-main rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-text-subtle font-bold uppercase tracking-widest">Technical Skills</div>
                    <div className="text-sm font-bold text-text-main">Interview Ready</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CORE CAPABILITIES */}
      <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto text-center">
        <div className="mb-20 space-y-4">
          <Typography variant="h2" className="!text-5xl">Everything You Need to Succeed</Typography>
          <Typography variant="body" className="max-w-2xl mx-auto text-text-subtle">
            Build confidence, improve performance, and prepare effectively with an all-in-one interview practice platform.
          </Typography>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <Card className="flex flex-col hover:scale-[1.02] transition-transform group">
            <div className="w-12 h-12 rounded-xl bg-accent-bg flex items-center justify-center text-accent-main mb-6 group-hover:bg-accent-main group-hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <Typography variant="h3" className="mb-4">HR Interview Practice</Typography>
            <Typography variant="bodySmall" className="mb-8">
              Practice common interview questions and receive instant feedback to improve your communication, clarity, and confidence.
            </Typography>
            <Link to="/hr" className="mt-auto text-accent-main font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Start Practice <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </Card>

          <Card className="flex flex-col hover:scale-[1.02] transition-transform group border-accent-main/20">
            <div className="w-12 h-12 rounded-xl bg-accent-bg flex items-center justify-center text-accent-main mb-6 group-hover:bg-accent-main group-hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <Typography variant="h3" className="mb-4">Technical Interview Practice</Typography>
            <Typography variant="bodySmall" className="mb-8">
              Work through a variety of problem-solving questions designed to strengthen your logical thinking and interview readiness.
            </Typography>
            <Link to="/technical" className="mt-auto text-accent-main font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Start Practice <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </Card>

          <Card className="flex flex-col hover:scale-[1.02] transition-transform group">
            <div className="w-12 h-12 rounded-xl bg-accent-bg flex items-center justify-center text-accent-main mb-6 group-hover:bg-accent-main group-hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <Typography variant="h3" className="mb-4">Interactive Coding</Typography>
            <Typography variant="bodySmall" className="mb-8">
              Write, run, and test your code in a seamless environment built to simulate real interview scenarios.
            </Typography>
            <Link to="/coding" className="mt-auto text-accent-main font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Open Playground <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </Card>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <section className="py-32 px-6 lg:px-20 bg-card/30 border-y border-border-main/50">
        <div className="max-w-7xl mx-auto text-center space-y-24">
          <div className="space-y-4">
            <Typography variant="h2" className="!text-5xl">Why Choose Our Platform</Typography>
            <Typography variant="body" className="max-w-2xl mx-auto text-text-subtle">
              Designed to help you prepare smarter, perform better, and achieve your career goals with confidence.
            </Typography>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4 text-left p-6 rounded-2xl bg-background/40 border border-border-main/50 hover:border-accent-main/30 transition-colors">
              <div className="w-10 h-10 text-accent-main">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"></path></svg>
              </div>
              <Typography variant="h3" className="text-xl">AI-Powered Feedback</Typography>
              <Typography variant="bodySmall">Get instant insights on your performance to understand strengths and areas for improvement.</Typography>
            </div>

            <div className="space-y-4 text-left p-6 rounded-2xl bg-background/40 border border-border-main/50 hover:border-accent-main/30 transition-colors">
              <div className="w-10 h-10 text-accent-main">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>
              </div>
              <Typography variant="h3" className="text-xl">Personalized Experience</Typography>
              <Typography variant="bodySmall">Practice sessions adapt based on your progress to help you focus on what matters most.</Typography>
            </div>

            <div className="space-y-4 text-left p-6 rounded-2xl bg-background/40 border border-border-main/50 hover:border-accent-main/30 transition-colors">
              <div className="w-10 h-10 text-accent-main">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
              </div>
              <Typography variant="h3" className="text-xl">Real-Time Practice</Typography>
              <Typography variant="bodySmall">Simulate real interview environments to build confidence and improve time management.</Typography>
            </div>

            <div className="space-y-4 text-left p-6 rounded-2xl bg-background/40 border border-border-main/50 hover:border-accent-main/30 transition-colors">
              <div className="w-10 h-10 text-accent-main">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></svg>
              </div>
              <Typography variant="h3" className="text-xl">Simple & Accessible</Typography>
              <Typography variant="bodySmall">A clean and intuitive interface designed for seamless learning.</Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section kept for strategic placement */}
      <section className="py-24 px-6 bg-accent-bg border-y border-accent-border/20 relative">
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <Typography variant="h2">Instant Resume Analysis</Typography>
            <Typography variant="body" className="max-w-2xl mx-auto opacity-80">
              Our AI analyzes your resume to generate personalized interview questions based on your specific skills and experience level.
            </Typography>
          </div>

          <div className="relative group p-12 border-2 border-dashed border-accent-border rounded-3xl hover:border-accent-main hover:bg-accent-main/5 transition-all bg-background/80 cursor-pointer shadow-xl">
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
            <div className="space-y-4 relative z-0">
              <div className="w-16 h-16 bg-accent-bg rounded-2xl flex items-center justify-center mx-auto text-accent-main group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              </div>
              <Typography variant="h3">Upload Resume</Typography>
              <Typography variant="bodySmall">Drop your PDF or DOCX here (Max 5MB)</Typography>
              <Button className="!rounded-full px-10">Choose File</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeLayout;
