import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import "./Layout.css";
import CookiesBanner from "../components/CookiesBanner";

export default function Layout() {
  return (
    <div>
      <header>
        <h1 className="titulo-logo">Ghibli Archive</h1>
        <nav>
          <NavLink className="link" to="/">
            Home
          </NavLink>

          <NavLink className="link" to="sobre">
            Sobre
          </NavLink>
        </nav>
      </header>

      <Outlet></Outlet>

      <footer>
        <div className="footer-container">
          <div className="footer-esquerda">
            <h2 className="footer-titulo">A enciclopédia dos Studios Ghibli</h2>
            <p className="paragrafo-footer">
              Um portal artesanal para os mundos fantásticos do Studio Ghibli.
              Construído para sonhadores e alimentado pela API aberta do Ghibli.
            </p>
          </div>
          <div className="footer-direita">
            <h3 className="recursos-titulo">Recursos</h3>
            <a
              className="a-footer"
              href="https://ghibliapi.vercel.app/#"
              target="blank"
            >
              Ghibli API docs
            </a>
            <a
              className="a-footer"
              href="https://github.com/irislobato/ghibli-archive"
              target="blank"
            >
              GhibliArchive GitHub
            </a>
          </div>
        </div>
        <p className="copyright">
          © 2026 Studio Ghibli Archive. Todos os direitos reservados.
        </p>
      </footer>
      <CookiesBanner/>
    </div>
  );
}
