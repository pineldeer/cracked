// index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'
import Main from './pages/Main'
import Grave from './pages/Grave'

import { UserProvider } from '../contexts/UserContext'
import { UserIdProvider } from '../contexts/UserIdContext'

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
  {
    path: '/grave',
    element: <Grave />
}
])

export default function Router() {

  return (
  <UserIdProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </UserIdProvider>

  )
}