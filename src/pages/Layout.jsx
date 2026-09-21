import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import "./Layout.css"

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
            <h2>A enciclopédia dos Studios Ghibli</h2>
            <p></p>
          </div>
          <div className="footer-direita">
            <h3>Recursos</h3>
            <a href="https://ghibliapi.vercel.app/#" target="blank">
              Ghibli API docs
            </a>
            <a
              href="https://github.com/irislobato/ghibli-archive"
              target="blank"
            >
              GhibliArchive GitGub
            </a>
          </div>
        </div>
        <p className="copyright">
          © 2026 Studio Ghibli Archive. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
