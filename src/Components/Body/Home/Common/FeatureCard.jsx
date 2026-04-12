import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card } from '../../../Common';

const FeatureCard = ({ icon, title, description, linkTo, linkText, isPrimary = false }) => {
  return (
    <Card className={`flex flex-col hover:scale-[1.02] transition-transform group ${isPrimary ? 'border-accent-main/20' : ''}`}>
      <div className="w-12 h-12 rounded-xl bg-accent-bg flex items-center justify-center text-accent-main mb-6 group-hover:bg-accent-main group-hover:text-black transition-colors">
        {icon}
      </div>
      <Typography variant="h3" className="mb-4">{title}</Typography>
      <Typography variant="bodySmall" className="mb-8 prose prose-invert opacity-80">
        {description}
      </Typography>
      <Link to={linkTo} className="mt-auto text-accent-main font-bold flex items-center gap-2 hover:gap-4 transition-all group/link">
        {linkText} <span className="transition-transform group-hover/link:translate-x-1">→</span>
      </Link>
    </Card>
  );
};

export default FeatureCard;
