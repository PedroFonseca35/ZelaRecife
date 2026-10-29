import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="topbar">
        <span className="logo">ZelaRecife</span>
        <nav>
          <NavLink to="/" end>
            Registrar ocorrência
          </NavLink>
          <NavLink to="/admin">Painel de gestão</NavLink>
        </nav>
      </header>

      <main className="conteudo">
        <Outlet />
      </main>

      <footer className="rodape">
        Emlurb · Prefeitura do Recife | Zeladoria e limpeza urbana
      </footer>
    </>
  );
}