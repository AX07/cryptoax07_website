import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProgress } from '../types';

const defaultProgress: UserProgress = {
  xp: 0,
  badges: [],
  completedSimulations: []
};

const UserProgressContext = createContext<{
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}>({
  userProgress: defaultProgress,
  setUserProgress: () => {}
});

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({ children }: { children: ReactNode }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('userProgress');
      return saved ? JSON.parse(saved) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  return (
    <UserProgressContext.Provider value={{ userProgress, setUserProgress }}>
      {children}
    </UserProgressContext.Provider>
  );
};
