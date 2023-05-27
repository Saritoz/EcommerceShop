import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className='mt-[150px] min-h-[75vh]'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
