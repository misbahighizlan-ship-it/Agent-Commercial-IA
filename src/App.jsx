import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Catalogue from './pages/Catalogue.jsx';
import Chat from './pages/Chat.jsx';
import Suivi from './pages/Suivi.jsx';
import { ShoppingBag, MessageSquare, Home as HomeIcon, Package } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Simple Navigation Bar */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-lg border border-white/20 px-8 py-4 rounded-full shadow-2xl z-[100] flex items-center gap-8 md:gap-12">
          <NavLink to="/" icon={<HomeIcon size={24} />} label="Accueil" />
          <NavLink to="/catalogue" icon={<ShoppingBag size={24} />} label="Catalogue" />
          <NavLink to="/chat" icon={<MessageSquare size={24} />} label="Hassan" />
          <NavLink to="/suivi" icon={<Package size={24} />} label="Suivi" />
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/suivi" element={<Suivi />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const NavLink = ({ to, icon, label }) => (
  <Link to={to} className="flex flex-col items-center gap-1 group">
    <div className="text-gray-400 group-hover:text-souk-red transition-colors duration-300">
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-souk-red transition-colors duration-300">
      {label}
    </span>
  </Link>
);

export default App;
