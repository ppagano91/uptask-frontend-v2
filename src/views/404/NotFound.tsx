import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
        <h1 className='font-black text-center text-4xl text-white'>Página no encontrada</h1>
        <p className='mt-10 text-center text-white'>Ir a {""}
            <Link className='text-fuchsia-500' to={"/"}>Proyectos</Link>
        </p>
    </>
  )
}

export default NotFound