import { Outlet } from 'react-router'
import TheHeader from '../../components/TheHeader'

export default function DefaultLayout() {
  return (
    <>
      <TheHeader />
      <Outlet />
    </>
  )
}