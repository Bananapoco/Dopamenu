import React from 'react';

export const ChefAvatar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`text-6xl ${className}`} role="img" aria-label="Chef Avatar">
      👨‍🍳
    </div>
  );
};
