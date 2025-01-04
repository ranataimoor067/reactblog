import React from 'react'
import Centre from "../components/Centre"
import Footer from "../components/Footer"
import "../App.css"


const Home = () => {
	return (
		<div id="container" className='w-full'>
			<div id="centre" className='w-full'>
       			<Centre/>

      		</div>
      		<div id="footer" className='w-full'>
        		<Footer/>

      		</div>
		</div>
	)
}

export default Home