import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const AuthLayout = () => {
  return (
    <>
        <div className='bg-gray-800 min-h-screen'>
            <div className='py-5 lg:py-10 mx-auto w-[500px]'>
                <Logo />
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>

        <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  )
}

export default AuthLayout