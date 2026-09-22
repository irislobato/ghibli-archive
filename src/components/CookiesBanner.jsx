import React, { useState, useEffect } from "react";
import "./CookiesBanner.css";

export default function CookiesBanner() {
  const [mostrarBanner, setMostrarBanner] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("cookieConsentimento");
    if (!status) {
      setMostrarBanner(true);
    }
  }, []);

  const lidarComConsentimento = (resposta) => {
    localStorage.setItem("cookieConsentimento", resposta);
    setMostrarBanner(false);
  };

  if (!mostrarBanner) return null;

  return (
    <aside
      className="cookie-banner"
      role="region"
      aria-label="Aviso de cookies"
    >
      <div className="cookie-conteudo">
        <h3 className="cookie-titulo">Termo de Consentimento</h3>
        <p className="cookie-texto">
          Utilizamos armazenamento local para otimizar a sua experiência de
          navegação e garantir a leitura dos arquivos com total acessibilidade.
        </p>
        <div className="cookie-botoes">
          <button
            onClick={() => lidarComConsentimento("recusado")}
            className="recusar"
          >
            Recusar
          </button>
          <button
            onClick={() => lidarComConsentimento("aceite")}
            className="aceitar"
          >
            Compreendido
          </button>
        </div>
      </div>
    </aside>
  );
}
