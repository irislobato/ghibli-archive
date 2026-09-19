import React from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import Sobre from "./pages/Sobre";
import Especies from "./pages/Especies";
import Locais from "./pages/Locais";
import Veiculos from "./pages/Veiculos";
import Personagens from "./pages/Personagens";
import DetalhesEspecie from ".pages/DetalhesEspecie";
import DetalhesLocal from ".pages/DetalhesLocal";
import DetalhesPersonagem from ".pages/DetalhesPeersonagem";
import DetalhesVeiculo from ".pages/DetalhesVeiculo";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index Element={<Home />} />
        <Route path="item/:id" element={<Detalhes />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="personagens" element={<Personagens />} />
        <Route path="locais" element={<Locais />} />
        <Route path="especies" element={<Especies />} />
        <Route path="veiculos" element={<Veiculos />} />
        <Route path="personagens/:id" element={<DetalhesPersonagem />} />
        <Route path="locais/:id" element={<DetalhesLocal />} />
        <Route path="especies/:id" element={<DetalhesEspecie />} />
        <Route path="veiculos/:id" element={<DetalhesVeiculo />} />
      </Route>
    </Routes>
  );
}
