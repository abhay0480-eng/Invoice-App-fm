import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ThemeContextProvider from './context/ThemeContextProvider'

function App() {

  return (
    <>
    <ThemeContextProvider>
     <BrowserRouter>
      <Routes>
        <Route to='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
     </BrowserRouter>
    </ThemeContextProvider>
    </>
  )
}

export default App
