import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='px-6 py-12 h-screen grid place-items-center text-center'>
      <h1 className='text-9xl font-black text-primary'>404</h1>
      <p className='text-2xl'>Página não encontrada.</p>
      <Link to={"/"} className='bg-primary hover:bg-highlight transition text-on-primary px-4 py-3 rounded-lg'>Voltar para tela inicial</Link>
    </section>
  )
}

export default NotFound