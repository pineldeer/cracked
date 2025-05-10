// index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'
import Main from './pages/Main'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/info',
    element: <Info />
  },
  { path: '/main', 
    element: <Main /> 
  },

])

export default function Router() {
  return <RouterProvider router={router} />
}