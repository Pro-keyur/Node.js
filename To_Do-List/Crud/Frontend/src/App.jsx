import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Addproduct from './Addproduct'
import Product from './Product'
import Editproduct from './Editproduct'

function App() {


  return (
    <>
      <h1 style={{color:"teal"}}>Product Page</h1>
      <Addproduct/>
      <Product/>
      {/* <Editproduct/> */}
    </>
  )
}

export default App
