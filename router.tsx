import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "./App"; // Assuming you have a main App component
import Dashboard from "./pages/Dashboard"; // Create this component
import ProgressPage from "./pages/ProgressPage"; // Create this component

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
    children: [
      {
        // Redirect from /en to /en/dashboard
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "progress",
        element: <ProgressPage />,
      },
      // Add other routes here
      // { path: "about", element: <AboutPage /> },
    ],
  },
]);

export default router;