import React from 'react';
import { Typography } from '../../../Common';

const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="space-y-4 text-left p-6 rounded-2xl bg-background/40 border border-border-main/50 hover:border-accent-main/30 transition-colors">
      <div className="w-10 h-10 text-accent-main">
        {icon}
      </div>
      <Typography variant="h3" className="text-xl leading-tight">
        {title}
      </Typography>
      <Typography variant="bodySmall" className="opacity-80">
        {description}
      </Typography>
    </div>
  );
};

export default ValueCard;
