import { Analytics } from "@vercel/analytics/next"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Auth from './pages/Auth';
import RootLayout from './components/RootLayout';
import NotFound from './pages/NotFound';

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
  )

  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  )
}

export default App
