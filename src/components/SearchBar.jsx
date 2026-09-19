import React from "react";

export default function SearchBar({ busca, aoMudarBusca }) {
  return (
    <input
      type="text"
      placeholder="🔍︎  Buscar filmes..."
      value={busca}
      onChange={aoMudarBusca}
      className="input-busca"
    />
  );
}
