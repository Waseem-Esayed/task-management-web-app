import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Auth from './pages/Auth';
import RootLayout from './components/RootLayout';
import NotFound from './pages/NotFound';
import ReactGA from "react-ga4";
import { useEffect } from 'react';

function AppWrapper({ children }) {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId) {
      ReactGA.initialize(gaId);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);

  return children;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Route>

        <Route path='auth' element={<Auth />} />
      </>
    )
  );

  return (
    <AppWrapper>
      <RouterProvider router={router} />
    </AppWrapper>
  );
}

export default App;
