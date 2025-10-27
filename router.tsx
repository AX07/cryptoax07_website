import { createBrowserRouter, Navigate, useOutletContext, useParams } from "react-router-dom";
import React, { Suspense, lazy } from 'react';

import App, { AppLayout } from "./App";
import { GET_CATEGORIES, LEARNING_PATH } from "./constants";
import { useLanguage } from "./hooks/useLanguage";
import { Simulation } from "./types";

// Performance: Add a spinner for lazy-loading fallbacks
const Spinner: React.FC = () => (
    <div className="flex justify-center items-center h-full min-h-[300px] w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
    </div>
);

const Dashboard = lazy(() => import('./components/Dashboard'));
const Progress = lazy(() => import('./components/Progress'));
const IntroPage = lazy(() => import('./components/IntroPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ResourcesPage = lazy(() => import('./components/ResourcesPage'));
const CategoryView = lazy(() => import('./components/CategoryView'));
const ExpertHelp = lazy(() => import('./components/ExpertHelp'));

const router = createBrowserRouter([
  {
    path: "/",
    // Redirect from the root to the default language
    element: <Navigate to="/en" replace />,
  },
  {
    // This will be the main layout for your app
    // It will handle the language parameter
    path: "/:lang",
    element: <App />,
    // These are the pages that will be rendered inside App's <Outlet>
    children: [
      {
        index: true,
        element: <Suspense fallback={<Spinner />}><IntroPage /></Suspense>,
      },
      {
        path: "about",
        element: <Suspense fallback={<Spinner />}><AboutPage /></Suspense>,
      },
      {
        path: "resources",
        element: <Suspense fallback={<Spinner />}><ResourcesPage /></Suspense>,
      },
      {
        path: "app",
        element: <AppLayout />,
        // These are the pages for the main app, rendered inside AppLayout's <Outlet>
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <Suspense fallback={<Spinner />}><Dashboard /></Suspense>,
          },
          {
            path: "progress",
            element: <Suspense fallback={<Spinner />}><Progress /></Suspense>,
          },
          {
            path: "category/:categoryId",
            element: <Suspense fallback={<Spinner />}><CategoryPage /></Suspense>,
          },
          {
            path: "sim/:simId",
            element: <Suspense fallback={<Spinner />}><SimulationPage /></Suspense>,
          },
          {
            path: "expert-help",
            element: <Suspense fallback={<Spinner />}><ExpertHelp /></Suspense>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div className="flex items-center justify-center h-screen text-2xl">404 Not Found</div>
  }
]);

function CategoryPage() {
  const { categoryId } = useParams();
  const { t } = useLanguage();
  const { onSelectSimulation, onBack, userProgress } = useOutletContext<any>();
  const CATEGORIES = GET_CATEGORIES(t);
  const category = CATEGORIES.find(c => c.id === categoryId);

  if (!category) {
    onBack();
    return null;
  }
  return <CategoryView category={category} onSelectSimulation={onSelectSimulation} onBack={onBack} userProgress={userProgress} />;
}

function SimulationPage() {
    const { simId } = useParams();
    const { t } = useLanguage();
    const { allSimulations, onBack, completeSimulation } = useOutletContext<any>();
    const learningPathStep = LEARNING_PATH.findIndex(id => id === simId);

    if (learningPathStep === -1) {
        return <div className="text-center p-8">{t('app.lessonNotFound')}</div>;
    }

    const currentSim = allSimulations.find((s: Simulation) => s.id === simId);
    if (!currentSim) {
        return <div className="text-center p-8">{t('app.lessonNotFound')}</div>;
    }

    const pathProgress = Math.round(((learningPathStep) / LEARNING_PATH.length) * 100);

    // Dynamically import the simulation component
    const SimComponent = lazy(() => import(`./components/simulations/${currentSim.component}.tsx`));

    return (
        <div className="animate-fade-in">
            <div className="mb-6 md:mb-8">
                <button onClick={onBack} className="text-brand-primary hover:underline text-sm mb-4">
                    &larr; {t('app.backToDashboard')}
                </button>
                <div className="bg-brand-surface p-4 rounded-xl border border-gray-700/50">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg md:text-xl font-semibold text-white">
                            {t('app.lesson')} {learningPathStep + 1} {t('app.of')} {LEARNING_PATH.length}: {currentSim.title}
                        </h3>
                        <span className="text-brand-secondary font-bold text-sm hidden md:block">{pathProgress}% {t('app.complete')}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-brand-secondary h-2.5 rounded-full transition-all duration-500" style={{ width: `${pathProgress}%` }}></div>
                    </div>
                </div>
            </div>
            <Suspense fallback={<Spinner />}>
                <SimComponent onComplete={() => completeSimulation(currentSim.id, currentSim.xp, currentSim.badge)} />
            </Suspense>
        </div>
    );
}

export default router;