import Head from './Head'
import Home from './page/home'
import Search from './page/search/search'
import Donate from './page/donate/fundraiser'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Head/>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/donate" element={<Donate/>}></Route>
    <Route path="/search" element={<Search/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
