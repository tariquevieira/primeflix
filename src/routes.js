import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Pages/Home';
import Filme from './Pages/Filme';
import Favoritos from "./Pages/Favoritos";
import Header from "./Compoments/Header";

import Erro from "./Pages/Erro";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
        <Route path="/favoritos" element={<Favoritos />} />


        <Route path="*" element={<Erro></Erro>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;