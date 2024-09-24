import Head from './Head'
import Footer from './Footer'
import Home from './page/home'
import Search from './page/search/search'
import Fundraiser from './page/fundraiser/fundraiser'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Head/>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/fundraiser" element={<Fundraiser/>}></Route>
    <Route path="/search" element={<Search/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
