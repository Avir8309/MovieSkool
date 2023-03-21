import React from 'react'
import Logo from '../images/logo.png'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
        <div className='px-10 py-3 flex space-x-10 border items-center'>
        <img  src={Logo} class="w-20 h-10 md:w-[80px] md:h-[40px] object-contain"></img>
        <div  className='font-bold font-sans text-xl md:text-3xl text-cyan-400'>
        <Link to="/">Movies</Link>
          
        </div>
        <div  className='font-bold font-sans text-xl md:text-3xl text-cyan-400'>
        <Link to="/favourites">Favourites</Link>
          
        </div>
        
        </div>
    </>
  )
}

export default NavBar
