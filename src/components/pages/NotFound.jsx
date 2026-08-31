import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='px-6 py-12 h-screen flex flex-col gap-6 text-center'>
      <h1 className='text-9xl font-black text-primary'>404</h1>
      <p className='text-2xl'>Página não encontrada.</p>
      <Link to="/" className='w-max m-auto bg-primary hover:opacity-90 transition text-on-primary px-4 py-3 rounded-lg'>Voltar para tela inicial</Link>
    </section>
  )
}

export default NotFound