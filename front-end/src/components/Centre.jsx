import React from 'react'
import Home from "../assets/Home.png"


function Centre() {
  return (
    <div id="container" className='w-full md:flex justify-between items-center text-3xl  '>
      <div className='m-4 '>
        <h1 className='md:text-5xl text-3xl font-bold md:mb-6 mb-10 mt-7 whitespace-nowrap '>Welcome to React Blog</h1>
        <p className='text-3xl'>Share your story, <span className='text-green-900 font-semibold'>Inspire the world !</span></p>

      </div>
      <div>
        <img src={Home} alt="Transparent Background" className='' width={550}/>
      </div>
    </div>
  )
}

export default Centre