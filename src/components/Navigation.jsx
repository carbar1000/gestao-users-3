import { Link } from "react-router-dom";
import "@assets/styles/DarkTheme.css"; // Importando o tema escuro
import "@assets/styles/Navigation.css"; // Usando o alias configurado


const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="nav-list">
<li className="nav-item"><Link to="/" className="nav-link">Início</Link></li>

        <li className="nav-item"><Link to="/about" className="nav-link">Sobre</Link></li>
        <li className="nav-item"><Link to="/add-user" className="nav-link">Adicionar Usuário</Link></li>
        <li className="nav-item"><Link to="/users-list" className="nav-link">Lista de Usuários</Link></li>
        <li className="nav-item"><Link to="/users-status" className="nav-link">Status dos Usuários</Link></li>

      </ul>
    </nav>
  );
};

export default Navigation;
