import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Catalogue = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products (Simulated for Hassan's Souk Luxe)
                setTimeout(() => {
                    setProducts([
                        { id: 1, name: 'Tajine Royal en Terre Cuite', price: '150 DH', category: 'Cuisine', image: '/assets/moroccan/tajine.png', stock: 12 },
                        { id: 2, name: 'Tapis Beni Ouarain Premium', price: '2500 DH', category: 'Décoration', image: '/assets/moroccan/rug.png', stock: 5 },
                        { id: 3, name: 'Babouches en Cuir de Fès', price: '200 DH', category: 'Mode', image: '/assets/moroccan/babouches.png', stock: 20 },
                        { id: 4, name: 'Théière en Argent Ciselé', price: '450 DH', category: 'Artisanat', image: '/assets/moroccan/souk_1.jpg', stock: 8 },
                        { id: 5, name: 'Huile d\'Argan Sacrée', price: '180 DH', category: 'Beauté', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400', stock: 45 },
                        { id: 6, name: 'Lanterne Grave de Marrakech', price: '320 DH', category: 'Artisanat', image: '/assets/moroccan/souk_2.jpg', stock: 15 },
                    ]);
                    setLoading(false);
                }, 1500);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(p =>
        (filter === 'All' || p.category === filter) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen py-16 px-6 zellij-pattern relative overflow-hidden">
            {/* Ambient Animated Spirit Background */}
            <div className="absolute inset-0 spirit-gradient opacity-5 -z-10"></div>

            <div className="max-w-7xl mx-auto relative">
                <header className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-4"
                    >
                        <span className="text-souk-ruby tracking-[0.4em] uppercase text-xs font-black italic">Collection Privée - Excellence Marocaine</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl title-luxury mb-8">Trésors du <span className="text-souk-gold underline decoration-souk-azure/30">Souk</span></h1>

                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-12 bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-luxury-glass">
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-souk-gold group-focus-within:scale-110 transition-transform" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher l'excellence..."
                                className="w-full pl-16 pr-6 py-4 rounded-full bg-white/80 border border-souk-gold/20 shadow-sm focus:ring-2 focus:ring-souk-gold outline-none transition-all placeholder:text-souk-midnight/30 font-medium"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-4 w-full md:w-auto no-scrollbar justify-center">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-8 py-3 rounded-full font-black transition-all text-[10px] tracking-[0.3em] whitespace-nowrap uppercase ${filter === cat
                                        ? 'bg-souk-midnight text-souk-gold shadow-luxury-btn scale-105 border-souk-gold/40 border'
                                        : 'bg-white/60 text-souk-midnight hover:border-souk-gold border border-transparent shadow-sm'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-96">
                        <div className="relative w-24 h-24 mb-8">
                            <Loader2 className="animate-spin text-souk-gold absolute inset-0" size={96} strokeWidth={1} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-souk-gold font-serif text-3xl font-black italic">H</span>
                            </div>
                        </div>
                        <p className="text-souk-midnight font-black tracking-[0.5em] uppercase text-[10px] animate-pulse italic">Hassan sélectionne vos trésors d'exception...</p>
                    </div>
                ) : (
                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-20"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                    }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass-card rounded-[2.5rem] overflow-hidden group hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)] transition-all duration-700 border-none relative bg-white/80"
                                >
                                    <div className="relative h-96 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out opacity-90"
                                        />
                                        <div className="absolute top-8 left-8">
                                            <span className="bg-souk-midnight/90 backdrop-blur-xl text-souk-gold px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-souk-gold/30 shadow-lg">
                                                {product.category}
                                            </span>
                                        </div>

                                        {/* Stock Badge */}
                                        <div className="absolute top-8 right-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-lg border backdrop-blur-md transition-colors duration-500 ${product.stock > 0
                                                    ? 'bg-emerald-500/80 text-white border-emerald-400/30'
                                                    : 'bg-rose-500/80 text-white border-rose-400/30'
                                                }`}>
                                                {product.stock > 0 ? '● En Stock' : '○ Rupture'}
                                            </span>
                                        </div>

                                        {product.stock > 0 && product.stock < 10 && (
                                            <div className="absolute bottom-8 left-8 text-center w-full pr-16">
                                                <span className="bg-souk-ruby/90 backdrop-blur-xl text-white px-6 py-2 rounded-full text-[9px] font-black tracking-[0.4em] shadow-2xl uppercase border border-white/20">
                                                    ÉDITION LIMITÉE
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-10 relative">
                                        <div className="absolute top-0 right-10 -translate-y-1/2 w-16 h-16 bg-souk-gold rotate-45 flex items-center justify-center shadow-luxury-btn border-4 border-white group-hover:scale-110 transition-transform">
                                            <span className="text-white -rotate-45 font-serif font-black italic">H</span>
                                        </div>
                                        <h3 className="text-3xl title-luxury mb-4 group-hover:text-souk-gold transition-colors font-black italic uppercase leading-tight">{product.name}</h3>
                                        <div className="flex justify-between items-end mb-10">
                                            <div>
                                                <span className="text-4xl font-serif font-black text-souk-gold underline decoration-souk-ruby/20">{product.price}</span>
                                                <p className="text-[9px] text-souk-midnight/40 uppercase tracking-[0.3em] mt-3 font-black">Splendeur de l'Artisanat</p>
                                            </div>
                                            <span className="text-souk-midnight/20 text-[9px] font-black uppercase tracking-[0.4em]">{product.stock} PIÈCES</span>
                                        </div>

                                        <button
                                            onClick={() => navigate('/chat', { state: { product } })}
                                            className="btn-luxury w-full group/btn relative overflow-hidden py-6 !bg-souk-midnight !text-souk-gold border border-souk-gold/30 transform transition-all duration-300 active:scale-95"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-4 tracking-[0.4em] text-[10px] font-black uppercase">
                                                <MessageSquare size={18} strokeWidth={2} />
                                                Négocier l'Excellence
                                            </span>
                                            <div className="absolute inset-0 bg-souk-gold translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-souk-midnight z-20 font-bold">Contacter Hassan</span>
                                            </div>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Catalogue;
