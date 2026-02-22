import React from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-souk-gold/10 bg-souk-midnight text-souk-cream">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-souk-gold text-souk-midnight font-bold">S</span>
            <span className="font-serif text-xl font-bold tracking-tight">Souk<span className="text-souk-gold text-xs ml-1 uppercase">Digital Marocain</span></span>
          </div>
          <p className="text-souk-cream/40 text-sm max-w-xs text-center md:text-left">
            L'excellence de l'artisanat marocain propulsée par l'intelligence artificielle.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-souk-gold hover:text-souk-midnight transition-colors duration-300 group"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-souk-gold hover:text-souk-midnight transition-colors duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="#" 
              className="p-3 rounded-full bg-white/5 hover:bg-souk-gold hover:text-souk-midnight transition-colors duration-300"
            >
              <Globe size={20} />
            </a>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-souk-gold font-bold">
            Propulsé par Hassan AI
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-[10px] text-souk-cream/20 uppercase tracking-[0.1em]">
        © {new Date().getFullYear()} Souk Digital Marocain. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
