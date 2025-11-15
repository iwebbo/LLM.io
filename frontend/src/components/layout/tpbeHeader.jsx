import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* === LOGO === */}
          <Link to="/" className="header-logo">
            <img 
              src="/logo.png" 
              alt="LLM.io" 
              className="logo-img" 
            />
          </Link>

          {user && (
                  <div className="header-right">
                    <div className="dropdown">
                      <button
                        className="btn btn-ghost flex items-center gap-2"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <User size={20} />
                        {user.username}
                        <ChevronDown size={16} />
                      </button>

                      {dropdownOpen && (
                        <div className="dropdown-menu">
                          <Link
                            to="/settings"
                            className="dropdown-item"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <Settings size={18} />
                            Settings
                          </Link>
                          <div className="dropdown-item" onClick={handleLogout}>
                            <LogOut size={18} />
                            Logout
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
        </div>
      </div>
    </header>
  );
};

export default Header;