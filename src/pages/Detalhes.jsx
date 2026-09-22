import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Detalhes.css";
import Loading from "../components/Loading";

export default function Detalhes() {
  const { id } = useParams();
  const [detalhes, setDetalhes] = useState(null);
  const [personagens, setPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarDadosCompletos() {
      try {
        setCarregando(true);
        setErro(null);

        // 1. Busca os detalhes do filme e a lista geral de personagens em paralelo
        const [resFilme, resPessoas] = await Promise.all([
          fetch(`https://ghibliapi.vercel.app/films/${id}`),
          fetch(`https://ghibliapi.vercel.app/people`),
        ]);

        if (!resFilme.ok || !resPessoas.ok) {
          throw new Error("Não foi possível carregar os dados completos.");
        }

        const dadosFilme = await resFilme.json();
        const todasPessoas = await resPessoas.json();

        // 2. Filtra os personagens que pertencem a este filme
        // Cada personagem na API possui um array 'films' com as URLs das obras
        const personagensDoFilme = todasPessoas.filter((personagem) =>
          personagem.films?.some((urlFilme) => urlFilme.includes(id)),
        );

        setDetalhes(dadosFilme);
        setPersonagens(personagensDoFilme);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarDadosCompletos();
  }, [id]);

  return (
    <div>
      {carregando && <Loading />}

      {erro && (
        <div className="feedback-container-erro">
          <p>Houve um erro: {erro}</p>
        </div>
      )}

      {!carregando && !erro && detalhes && (
        <article className="container-detalhes">
          <div className="banner-container">
            <img
              className="banner"
              src={detalhes.movie_banner}
              alt={`Cena panorâmica da animação ${detalhes.title}`}
            />
          </div>

          <section className="conteudo-detalhes">
            <p className="release">{detalhes.release_date}</p>
            <h1 className="titulo-detalhes">
              {detalhes.title} · {detalhes.original_title}
            </h1>

            <div className="infos-container">
              <div className="diretor-container">
                <h3 className="titulinho-diretor-detalhes">Síntese</h3>

                <h4 className="titulinho-compendium">DIRETOR</h4>
                <p className="sub-titulinho-compendium">{detalhes.director}</p>

                <h4 className="titulinho-compendium">PRODUTOR</h4>
                <p className="sub-titulinho-compendium">{detalhes.producer}</p>

                <h4 className="titulinho-compendium">TEMPO DE TELA</h4>
                <p className="sub-titulinho-compendium">
                  {detalhes.running_time} min
                </p>

                <h4 className="titulinho-compendium">AVALIAÇÃO</h4>
                <p className="sub-titulinho-compendium">{detalhes.rt_score}</p>

                <h4 className="titulinho-compendium">TÍTULO ROMANIZADO</h4>
                <p className="sub-titulinho-compendium">
                  {detalhes.original_title_romanised}
                </p>
              </div>

              <div className="sinopse-container">
                <h2 className="titulo-det">Sinopse</h2>
                <p className="descricao">{detalhes.description}</p>

                {/* Seção de personagens relacionados*/}
                <section className="secao-relacionados">
                  <h3 className="titulo-det">Registros de Relação</h3>
                  <p className="subtitulo-relacionados">Personagens do filme</p>

                  <div className="grid-personagens-relacionados">
                    {personagens.length > 0 ? (
                      personagens.map((persona) => (
                        <Link
                          to={`/personagens/${persona.id}`}
                          key={persona.id}
                          className="card-personagem-relacionado"
                        >
                          <div className="info-personagem-relacionado">
                            <h4 className="nome-personagem">{persona.name}</h4>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="aviso-sem-dados">
                        Nenhum personagem catalogado individualmente para esta
                        obra.
                      </p>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </section>
        </article>
      )}
    </div>
  );
}
