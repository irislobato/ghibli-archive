import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardFilme from "../components/CardFilme";
import SearchBar from "../components/SearchBar";
import "./Home.css";
import Loading from "../components/Loading";

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  //buscas e filtro
  const [busca, setBusca] = useState("");
  const [diretorSelecionado, setDiretorSelecionado] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("ano-desc");

  useEffect(() => {
    async function carregarFilmes() {
      try {
        setCarregando(true);
        setErro(null);
        const response = await fetch("https://ghibliapi.vercel.app/films");
        if (!response.ok) {
          throw new Error("Não foi possível carregar o catálogo de filmes");
        }
        const dados = await response.json();
        setFilmes(dados);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }
    carregarFilmes();
  }, []);

  //diretores
  const diretores = [
    "todos",
    ...new Set(filmes.map((filme) => filme.director)),
  ];

  //busca
  const filmesFiltrados = filmes
    .filter((filme) => {
      const matchBusca = filme.title
        .toLowerCase()
        .includes(busca.toLowerCase());
      const matchDiretor =
        diretorSelecionado === "todos" || filme.director === diretorSelecionado;
      return matchBusca && matchDiretor;
    })
    .sort((a, b) => {
      if (ordenacao === "ano-desc")
        return Number(b.release_date) - Number(a.release_date);
      if (ordenacao === "ano-asc")
        return Number(a.release_date) - Number(b.release_date);
      if (ordenacao === "score") return Number(b.rt_score) - Number(a.rt_score);
      if (ordenacao === "titulo") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="home">
      {/*Introdução */}
      <section className="introducao">
        <div className="info-introducao">
          <p className="titulinho-intro">O MUNDO GHIBLI</p>
          <h1 className="titulo-intro">
            Adentre os mundos tranquilos dos Studios Ghibli
          </h1>
          <p className="sub-intro">
            "A floresta tem espíritos. Eles vivem aqui desde tempos antigos,
            vigiando os riachos e o musgo."
          </p>
          {/*SearchBar */}
          <SearchBar
            busca={busca}
            aoMudarBusca={(e) => setBusca(e.target.value)}
          />
        </div>
        <img
          src="painel-ilustracao.png"
          alt="Pintura em aquarela de uma grande árvore sobre uma colina verdejante, com campos ondulados, uma casa de campo ao fundo e céu nublado no estilo clássico Ghibli"
          width="560"
          height="400"
        />
      </section>

      {/*Catálogo e filtro */}
      <section>
        <div className="container-filtro">
          <h2 className="titulo-catalogo">Catálogo de Filmes</h2>
          <div className="filtro">
            <label className="filtro-grupo">
              <span className="filtro-span">Diretor:</span>
              <select
                value={diretorSelecionado}
                onChange={(e) => setDiretorSelecionado(e.target.value)}
              >
                {diretores.map((diretor) => (
                  <option key={diretor} value={diretor}>
                    {diretor === "todos" ? "All" : diretor}
                  </option>
                ))}
              </select>
            </label>

            <label className="filtro-grupo">
              <span className="filtro-span">Filtro:</span>
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
              >
                <option value="ano-desc">Mais recentes</option>
                <option value="ano-asc">Mais velhos</option>
                <option value="score">Avaliação</option>
                <option value="titulo">Titulo (A - Z)</option>
              </select>
            </label>
          </div>
        </div>

        {carregando && <Loading />}

        {erro && (
          <div className="feedback-container-erro">
            <p>Houve um erro: {erro}</p>
          </div>
        )}

        {!carregando && !erro && (
          <div className="grid-filmes">
            {filmesFiltrados.map((filme) => (
              <CardFilme
                className="cardFilme"
                key={filme.id}
                dadosDoFilme={filme}
              ></CardFilme>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
