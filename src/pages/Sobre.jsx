import React from "react";
import "./Sobre.css"

export default function Sobre() {
  return (
    <article className="sobre-container">
      <div className="sobre-projeto">
        <h1 className="titulo-sobre">Sobre o Ghibli Archive</h1>
        <p className="o-porque">
          Desenvolvemos este projeto não apenas como um sistema de consulta, mas
          como uma homenagem à animação tradicional. Queríamos que navegar por
          aqui transmitisse a mesma calma de folhear um diário ilustrado à mão.
          Por isso, alinhamos o código a uma estética artesanal, resgatando as
          paisagens e as criaturas que tornam os mundos de Ghibli tão
          inesquecíveis.
        </p>
        <p className="frasezinha">
          "Criar este projeto foi o nosso modo de parar o tempo. Um convite
          feito por nós para que descubra o encanto escondido nas pequenas
          coisas."
        </p>
      </div>
      <div className="a-gente">
        <p className="titulinho-sobre">QUEM SOMOS</p>
        <h2 className="por-tras">Por trás das telas</h2>
        <div className="nos">
          <img
            src="
          "
            alt=""
          />
          <div className="sobre-info">
            <h3 className="nome">Iris Lobato</h3>
            <p className="o-que-faz">
              Programadora Full-Stack e Estudante de Engenharia Mecânica
            </p>
          </div>
          <div className="sobre-info">
            <h3 className="nome">Riquelme Fagundes</h3>
            <p className="o-que-faz">
              Programador Full-Stack e Estudante de Engenharia Mecânica
            </p>
          </div>
          <h2 className="acessibilidade">Acessibilidade & Contraste</h2>
          <p className="contraste">
            Ao escolher a nossa paleta, fizemos questão de respeitar os padrões
            AAA de contraste. Pensamos em cada detalhe para que os textos
            principais se apoiem sobre o fundo com máxima clareza, unindo a
            sensação tátil de um livro antigo ao rigor técnico da acessibilidade
            digital.
          </p>
        </div>
      </div>
    </article>
  );
}
