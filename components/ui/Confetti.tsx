import React from 'react';

const Confetti: React.FC = () => {
  const confettiCount = 150;
  const colors = ['#38BDF8', '#34D399', '#F472B6', '#F7931A', '#E2E8F0'];

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {Array.from({ length: confettiCount }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 2}s`, // 2-5 seconds
          animationDelay: `${Math.random() * 2}s`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        };
        return (
          <div
            key={i}
            className="confetti-piece"
            style={style}
          ></div>
        );
      })}
    </div>
  );
};

export default Confetti;
