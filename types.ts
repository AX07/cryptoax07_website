import type React from 'react';

export enum View {
  Dashboard = 'DASHBOARD',
  Category = 'CATEGORY',
  Simulation = 'SIMULATION',
  ExpertHelp = 'EXPERT_HELP',
  Progress = 'PROGRESS',
  About = 'ABOUT',
  Resources = 'RESOURCES',
}

export type Page = 'intro' | 'about' | 'app' | 'resources';

export interface CompletedSimulation {
  id: string;
  completedAt: string;
  xpGained: number;
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  xp: number;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isSecurityCritical?: boolean;
}

export interface Category {
  id:string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  simulations: Simulation[];
}

export interface UserProgress {
  xp: number;
  badges: string[];
  completedSimulations: CompletedSimulation[];
  hasBookedCall?: boolean;
}

export interface GeneratedStep {
  title: string;
  content: string;
}

export type AiResponse = {
  type: 'answer';
  text: string;
} | {
  type: 'recommendation';
  text: string;
  simulationId: string;
} | {
  type: 'generated_example';
  text: string;
  steps: GeneratedStep[];
};

export interface QuizQuestion {
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}
