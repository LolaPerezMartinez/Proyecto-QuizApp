import { useLocation } from "react-router-dom";

export function Header() {
  const backendBase = "http://localhost:8080";
  const frontEnd = "http://localhost:5173";
  const location = useLocation();

  const esLogin = location.pathname === "/login";

  // Función auxiliar para saber si el link está activo
  const isActive = (path: string) => location.pathname === path ? "active" : "";

  return (
    <header className="bg-dark-quiz mb-5 shadow-sm">
      <div className="header-container px-3">
        <a href={backendBase + "/home"} className="navbar-brand">
          Quiz App
        </a>

        <nav className="d-flex align-items-center">
          {/* Usamos plantillas de cadena (backticks) para añadir la clase active si coincide */}
          <a href={backendBase + "/home"} className={`nav-link-custom ${isActive("/home")}`}>
            Inicio
          </a>
          
          <a href={backendBase + "/categorias"} className={`nav-link-custom ${isActive("/categorias")}`}>
            Categorías
          </a>
          
          <a href={backendBase + "/acerca"} className={`nav-link-custom ${isActive("/acerca")}`}>
            Acerca de
          </a>
          
          {!esLogin && (
            <a 
              href={frontEnd + "/perfil"} 
              className={`nav-link-custom profile-link d-flex align-items-center ${isActive("/perfil")}`}
            >
              <span className="material-symbols-rounded me-1" style={{ fontSize: '20px' }}>
                account_circle
              </span>
              Mi Perfil
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}