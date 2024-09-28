import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./Footer";
import Head from "./Head";
import Fundraiser from "./page/fundraiser/fundraiser";
import Home from "./page/home";
import Login from "./page/login";
import Search from "./page/search/search";

function App() {
  return (
    <BrowserRouter>
      <Head />
      <Routes>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Fundraiser />} path="/fundraiser"></Route>
        <Route element={<Search />} path="/search"></Route>
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
