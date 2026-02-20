import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-orange-50">
                <div className="absolute top-10 left-10 w-64 h-64 bg-souk-red/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-souk-yellow/20 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl text-center px-6"
            >
                <h1 className="text-6xl md:text-8xl font-serif font-black text-souk-red mb-6 tracking-tight">
                    Souk Digital <span className="text-souk-yellow">Marocain</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Bienvenue dans le premier souk intelligent. Rencontrez <span className="font-bold text-souk-red">Hassan</span>,
                    votre agent commercial IA personnel, prêt à négocier les meilleurs prix pour vous.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Link to="/chat">
                        <button className="btn-primary bg-souk-red text-white flex items-center gap-2 w-full md:w-auto">
                            <MessageSquare size={20} />
                            Commencer vos achats
                            <ArrowRight size={18} />
                        </button>
                    </Link>

                    <Link to="/catalogue">
                        <button className="btn-primary bg-white text-souk-red border-2 border-souk-red flex items-center gap-2 w-full md:w-auto hover:bg-souk-red hover:text-white">
                            <ShoppingBag size={20} />
                            Voir les produits
                        </button>
                    </Link>
                </div>
            </motion.div>

            {/* Decorative Mosaic Pattern (CSS only) */}
            <div className="mt-20 opacity-20 flex gap-4 overflow-hidden mask-fade">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="w-20 h-20 border-4 border-souk-red rotate-45 flex-shrink-0"></div>
                ))}
            </div>
        </div>
    );
};

export default Home;
