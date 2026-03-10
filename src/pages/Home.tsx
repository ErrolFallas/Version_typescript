import React from 'react'
import PaginaInicio from '../components/PaginaInicio.js'
import Footer from '../components/Footer.js'
import Navi from '../components/Navi.js'

function Home() {
  return (
    <div>
      <Navi />
      <PaginaInicio />
      <Footer />
    </div>
  )
}

export default Home
