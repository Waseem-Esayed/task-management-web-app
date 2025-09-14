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

ReactGA.initialize("G-12157702481");

function AppWrapper({ children }) {
  useEffect(() => {
    // Nur beim ersten Laden der App
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return children;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />}></Route>
          <Route path='home' element={<Home />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='about' element={<About />}></Route>
          <Route path='*' element={<NotFound />} />
        </Route>

        <Route path='auth' element={<Auth />}></Route>
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
