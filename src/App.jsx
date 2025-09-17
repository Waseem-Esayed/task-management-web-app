import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Auth from './pages/Auth';
import RootLayout from './components/RootLayout';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { initGA, logPageView } from "./utils/analytics";

// GA Wrapper Component
function GAListener() {
  const location = useLocation();

  useEffect(() => { initGA(); }, []);
  useEffect(() => { logPageView(location.pathname + location.search); }, [location]);

  return <Outlet />;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<GAListener />}>
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
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
