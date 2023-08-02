import sarthak from '../assets/sarthak.svg'
import {FaChevronDown} from 'react-icons/fa'

const Navbar = () => {
  return (
    <main className='w-full h-16 bg-slate-800/80 flex'>
      <div className='h-16 flex justify-center items-center w-1/4'><img className='h-9' src={sarthak} alt="logo" /></div>
      <div className='w-3/4 flex'>
        <div className='md:flex gap-5 hidden md:block text-white/75 text-xl p-2 pt-4 w-2/3 justify-center'>
          <div className='flex gap-1'>Pricing <FaChevronDown className='relative top-[0.45rem]'/></div>
          <div className='flex gap-1'>Resources</div>
          <div className='flex gap-1'>About <FaChevronDown className='relative top-[0.45rem]'/></div>
        </div>
        <div className='flex gap-3 justify-center w-1/3 p-2 text-white/90'>
          <button className='p-2 px-3 text-lg font-medium border-2 border-purple-600 rounded-md'>Login</button>
          <button className='p-2 px-3 text-lg font-medium border-2 border-purple-600 rounded-md'>Sign Up</button>
        </div>
        <div>

        </div>
      </div>
    </main>
  )
}

export default Navbar