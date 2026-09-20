import React from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import Sobre from "./pages/Sobre";
import DetalhesPersonagem from "./pages/DetalhesPersonagem";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="item/:id" element={<Detalhes />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="personagens/:id" element={<DetalhesPersonagem />} />
        
      </Route>
    </Routes>
  );
}
