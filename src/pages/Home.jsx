import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden zellij-pattern">
            {/* Ambient Animated Spirit Background */}
            <div className="absolute inset-0 spirit-gradient opacity-10 -z-10 animate-pulse"></div>

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-souk-cream/50">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-souk-midnight/20 to-transparent"></div>
                <div className="absolute top-10 left-10 w-64 h-64 bg-souk-gold/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-souk-azure/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[0.5px] border-souk-gold/5 rotate-12 -z-20"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-6xl text-center px-6 relative z-10 py-20"
            >
                {/* Hero Image / Spirit of the Souk */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 1.2 }}
                    className="mb-12 relative"
                >
                    <div className="absolute inset-0 bg-souk-gold/20 blur-3xl rounded-full scale-75 animate-pulse"></div>
                    <img
                        src="/assets/moroccan/hero.png"
                        alt="Hassan - Concierge Digital"
                        className="w-full max-w-2xl mx-auto rounded-[3rem] shadow-luxury-deep border-4 border-white/20 relative z-10 group-hover:scale-[1.02] transition-transform duration-700"
                    />
                </motion.div>

                {/* Decorative Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="mb-8 inline-block"
                >
                    <div className="w-20 h-20 border-2 border-souk-gold rotate-45 flex items-center justify-center mx-auto shadow-luxury-btn bg-white/10 backdrop-blur-sm">
                        <div className="w-16 h-16 border border-souk-gold -rotate-45 flex items-center justify-center">
                            <span className="text-souk-gold font-serif text-2xl font-black italic">S</span>
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-6xl md:text-9xl title-luxury mb-8">
                    Le Souk <span className="text-souk-gold italic underline decoration-souk-ruby/40 underline-offset-8">Digital</span>
                </h1>

                <p className="text-xl md:text-2xl text-souk-midnight/90 mb-12 max-w-3xl mx-auto leading-relaxed font-sans font-medium">
                    L'excellence de l'artisanat marocain, <span className="text-souk-ruby font-black">vibrante</span> et sublimée par l'IA.
                    Rencontrez <span className="font-bold text-souk-gold">Hassan</span>, votre concierge d'exception.
                </p>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-16">
                    <Link to="/chat">
                        <button className="btn-luxury flex items-center gap-3 group !bg-souk-midnight !text-souk-gold border border-souk-gold/30 hover:!bg-souk-gold hover:!text-souk-midnight">
                            <MessageSquare size={22} className="group-hover:rotate-12 transition-transform" />
                            Consulter Hassan
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>

                    <Link to="/catalogue">
                        <button className="btn-outline-luxury flex items-center gap-3 group !border-souk-gold !text-souk-gold hover:!bg-souk-gold/10">
                            <ShoppingBag size={22} className="group-hover:-translate-y-1 transition-transform" />
                            Explorer le Catalogue
                        </button>
                    </Link>
                </div>

                {/* Grid Preview of Provided Images */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 opacity-80 hover:opacity-100 transition-opacity">
                    {[
                        { src: '/assets/moroccan/tajine.png', rotate: '-3deg' },
                        { src: '/assets/moroccan/rug.png', rotate: '2deg' },
                        { src: '/assets/moroccan/babouches.png', rotate: '-2deg' },
                        { src: '/assets/moroccan/souk_1.jpg', rotate: '3deg' }
                    ].map((img, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1, rotate: '0deg', zIndex: 20 }}
                            style={{ rotate: img.rotate }}
                            className="aspect-square bg-white p-2 shadow-luxury-glass rounded-2xl border border-white/50"
                        >
                            <img src={img.src} alt="Moroccan Art" className="w-full h-full object-cover rounded-xl" />
                        </motion.div>
                    ))}
                </div>

            </motion.div>

            {/* Subtle Mosaic Pattern */}
            <div className="mt-12 opacity-20 flex gap-8 overflow-hidden w-full justify-center pb-20">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                    <div key={i} className="w-16 h-16 border border-souk-gold rotate-45 flex-shrink-0 bg-souk-gold/5"></div>
                ))}
            </div>
        </div>
    );
};

export default Home;
