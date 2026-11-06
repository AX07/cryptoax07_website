
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-brand-surface rounded-xl border border-gray-700/50 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
