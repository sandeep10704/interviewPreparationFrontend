import React from 'react';
import { Typography } from '../../Common';

const PageHeader = ({ title, description, children }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-in">
      <div className="space-y-2 text-left">
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body" className="text-text-subtle">
          {description}
        </Typography>
      </div>
      {children && (
        <div className="flex flex-wrap gap-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
