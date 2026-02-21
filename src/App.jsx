import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home.jsx';
import Catalogue from './pages/Catalogue.jsx';
import Chat from './pages/Chat.jsx';
import Suivi from './pages/Suivi.jsx';
import { ShoppingBag, MessageSquare, Home as HomeIcon, Package } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

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

const Navbar = () => {
  const location = useLocation();
  const isChat = location.pathname === '/chat';

  if (isChat) return null;

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-card !bg-souk-midnight/90 backdrop-blur-2xl border-souk-gold/30 px-10 py-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,43,54,0.4)] z-[100] flex items-center gap-10 md:gap-16 border-2">
      <NavLink to="/" icon={<HomeIcon size={24} strokeWidth={1.5} />} label="Accueil" />
      <NavLink to="/catalogue" icon={<ShoppingBag size={24} strokeWidth={1.5} />} label="Souk" />
      <NavLink to="/chat" icon={<MessageSquare size={24} strokeWidth={1.5} />} label="Hassan" />
      <NavLink to="/suivi" icon={<Package size={24} strokeWidth={1.5} />} label="Suivi" />
    </nav>
  );
};

const NavLink = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="flex flex-col items-center gap-1.5 group relative">
      <div className={`transition-all duration-500 transform ${isActive ? 'text-souk-gold scale-110' : 'text-souk-gold/40 group-hover:text-souk-gold/70'}`}>
        {icon}
      </div>
      <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? 'text-souk-gold opacity-100' : 'text-souk-gold/30 opacity-60 group-hover:opacity-80'}`}>
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="nav-active"
          className="absolute -top-10 w-12 h-1 bg-souk-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,1)]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default App;
