import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetalhesPersonagem.css"

export default function DetalhesPersonagem() {
  const { id } = useParams();
  const [personagem, setPersonagem] = useState(null);
  const [filmesRelacionados, setFilmesRelacionados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDadosPersonagem() {
      try {
        setCarregando(true);
        setErro(null);

        const resPersonagem = await fetch(
          `https://ghibliapi.vercel.app/people/${id}`,
        );
        if (!resPersonagem.ok) {
          throw new Error(
            "Não foi possível carregar os detalhes da personagem.",
          );
        }
        const dadosPersonagem = await resPersonagem.json();
        setPersonagem(dadosPersonagem);

        //procura os filmes para correlacionar e exibir a obra de onde ela veio
        const resFilmes = await fetch("https://ghibliapi.vercel.app/films");
        if (resFilmes.ok) {
          const todosFilmes = await resFilmes.json();
          //filtra os filmes das URLs que batem no registo do personagem
          const filmesDaPersonagem = todosFilmes.filter((filme) =>
            dadosPersonagem.films?.some((url) => url.includes(filme.id)),
          );
          setFilmesRelacionados(filmesDaPersonagem);
        }
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarDadosPersonagem();
  }, [id]);

  return (
    <main className="pagina-personagem">
      <Link to="/" className="voltar">
        ← Voltar ao Catálogo
      </Link>

      {carregando && (
        <div className="feedback-container">
          <p>Vasculhando registos nos arquivos do vale...</p>
        </div>
      )}

      {erro && (
        <div className="feedback-container erro">
          <p>Houve um erro: {erro}</p>
        </div>
      )}

      {!carregando && !erro && personagem && (
        <article className="cartao-arquivo-personagem">
          <section className="secao-atributos">
            <h2 className="titulo-secao">Ficha Descritiva</h2>
            <div className="grelha-atributos">
              <div className="bloco-atributo">
                <h4 className="especificacao">Gênero</h4>
                <p className="atributo">
                  {personagem.gender !== "NA"
                    ? personagem.gender
                    : "Desconhecido / Espírito"}
                </p>
              </div>
              <div className="bloco-atributo">
                <h4 className="especificacao">Idade Estimada</h4>
                <p className="atributo">
                  {personagem.age !== "NA"
                    ? `${personagem.age} anos`
                    : "Indeterminada"}
                </p>
              </div>
              <div className="bloco-atributo">
                <h4 className="especificacao">Cor dos Olhos</h4>
                <p className="atributo">{personagem.eye_color}</p>
              </div>
              <div className="bloco-atributo">
                <h4 className="especificacao">Cor do Cabelo</h4>
                <p className="atributo">{personagem.hair_color}</p>
              </div>
            </div>
          </section>

          <div className="perfil-identificacao">
            <p className="categoria-tag">REGISTO DE RESIDENTE</p>
            <h1 className="nome-principal">{personagem.name}</h1>
          </div>

          {/* Secção de Obras Relacionadas */}
          <section className="secao-filmes-vinculados">
            <h2 className="titulo-secao">Aparições</h2>
            <div className="container-filmes-personagem">
              {filmesRelacionados.map((filme) => (
                <Link
                  to={`/item/${filme.id}`}
                  key={filme.id}
                  className="card-filme-vinculado"
                >
                  <img
                    src={filme.image}
                    alt= {`Poster do filme ${filme.title} que a personagem ${personagem.name} apareceu.`}
                    className="banner-miniatura"
                  />
                  <div className="info-miniatura">
                    <h3>{filme.title}</h3>
                    <p>
                      {filme.original_title} • {filme.release_date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      )}
    </main>
  );
}
