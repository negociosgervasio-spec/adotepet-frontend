import { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Menu, User, X, Dot } from "lucide-react";
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthProvider';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload(false);
    toast.success("Você foi deslogado.");
  };

  // Links comuns
  const commonLinks = [
    { to: "/", label: "Adotar" },
  ];

  // Links quando não logado
  const guestLinks = [
    { to: "/register", label: "Cadastrar" },
    { to: "/login", label: "Entrar" },
  ];

  // Links quando logado
  const authLinks = [
    { to: "/pets/mine", label: "Meus Pets" },
    { to: "/pets/adoptions", label: "Minhas Adoções" },
  ];

  return (
    <header className="bg-card shadow-lg p-6 sticky top-0 z-50">
      <div className="container m-auto max-w-5xl flex items-center justify-between">

        {/* Logo */}
        <Link to={"/"} className="font-[Edu_NSW_ACT_Cursive] flex items-center gap-1">
          <Logo size={16} padding={4}/>
          <p className="text-2xl hover:text-secondary transition italic">adotePet</p>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex gap-8 items-center">
          {commonLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-secondary transition ${location.pathname === link.to && "text-primary"}`}
            >
              {link.label}
            </Link>
          ))}

          {!token && guestLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-secondary transition ${location.pathname === link.to && "text-primary"}`}
            >
              {link.label}
            </Link>
          ))}

          {token && (
            <>
              {authLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`hover:text-secondary transition ${location.pathname === link.to && "text-primary"}`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to={"/user/profile"}
                className={`hover:text-secondary transition ${(location.pathname === "/register" || location.pathname === "/user/profile") && "text-primary"}`}
              >
                <div className='relative'>
                  <User size={24} />
                  <Dot size={25} className='absolute top-4 left-2 text-accent' />
                </div>
              </Link>

              <button className="hover:text-primary transition" onClick={handleLogout}>
                <LogOut size={24} />
              </button>
            </>
          )}
        </nav>

        {/* Botão Mobile */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden z-20"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Mobile */}
        {open && (
          <nav className="absolute top-0 left-0 w-10/12 h-screen bg-card p-8 flex flex-col gap-6 text-2xl z-10">
            {commonLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`hover:text-secondary transition ${location.pathname === link.to && "text-primary"}`}
              >
                {link.label}
              </Link>
            ))}

            {!token && guestLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`hover:text-secondary transition ${location.pathname === link.to && "text-primary"}`}
              >
                {link.label}
              </Link>
            ))}

            {token && (
              <>
                {authLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`hover:text-secondary transition ${location.pathname === link.to && "text-primary"}`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  to={"/user/profile"}
                  onClick={() => setOpen(false)}
                  className={`hover:text-secondary transition ${(location.pathname === "/register" || location.pathname === "/user/profile") && "text-primary"}`}
                >
                  Perfil
                </Link>

                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="hover:text-primary transition text-left"
                >
                  Sair
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
