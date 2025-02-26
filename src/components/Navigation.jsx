import { Link } from "react-router-dom";
import "@assets/styles/DarkTheme.css"; // Importando o tema escuro
import "@assets/styles/Navigation.css"; // Usando o alias configurado


const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="nav-list">
<li className="nav-item"><Link to="/" className="nav-link">Início</Link></li>

        <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
        <li className="nav-item"><Link to="/add-user" className="nav-link">Add User</Link></li>
        <li className="nav-item"><Link to="/users-list" className="nav-link">Users List</Link></li>
        <li className="nav-item"><Link to="/users-status" className="nav-link">Users Status</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
