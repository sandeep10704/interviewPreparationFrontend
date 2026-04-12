import { Typography } from '../../../../Common';
import Tag from './Tag';
import ExampleCard from './ExampleCard';

const ProblemDescription = ({ question }) => {
  if (!question) return null;

  return (
    <div className="flex flex-col h-full overflow-y-auto px-8 py-10 space-y-6 bg-[#01080E] text-left custom-scrollbar">
      {/* Title */}
      <div>
        <Typography variant="h2" className="!text-2xl font-bold text-text-main mb-2 tracking-tight">
          {question.title}
        </Typography>
        
        {/* Meta Info Row - GFG Style */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-medium text-text-subtle/70 uppercase tracking-wider">
          <span>Difficulty:</span>
          <Tag 
            variant={
              question.difficulty === 'Hard' ? 'error' :
              question.difficulty === 'Medium' ? 'warning' :
              'success'
            }
          >
            {question.difficulty}
          </Tag>
          <div className="flex items-center gap-1.5">
            <span>Accuracy:</span>
            <span className="text-text-subtle">{(Math.random() * 20 + 10).toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Submissions:</span>
            <span className="text-text-subtle">{(Math.random() * 2).toFixed(1)}M</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Points:</span>
            <span className="text-text-subtle">4</span>
          </div>
        </div>
      </div>

      <hr className="border-border-main/20" />

      {/* Problem Statement */}
      <div className="space-y-4">
        <Typography 
          variant="body" 
          className="!text-[14px] leading-relaxed text-text-main opacity-90 whitespace-pre-wrap font-sans"
        >
          {question.problem_statement}
        </Typography>
      </div>

      {/* Examples */}
      <div className="space-y-6 pt-4">
        <Typography variant="h3" className="!text-sm font-bold text-text-main">Examples:</Typography>
        
        {question.test_cases?.slice(0, 3).map((tc, idx) => (
          <ExampleCard key={idx} example={tc} />
        ))}
      </div>

      {/* Constraints */}
      <div className="space-y-4 pt-6 pb-10">
        <Typography variant="h3" className="!text-sm font-bold text-text-main">Constraints:</Typography>
        <div className="font-mono text-[12px] text-text-subtle space-y-2 opacity-80">
          {question.constraints?.split(',').map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-main/30"></span>
              {c.trim()}
            </div>
          ))}
          {!question.constraints?.includes(',') && (
             <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-main/30"></span>
              {question.constraints}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
