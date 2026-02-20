import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, MessageSquare, Loader2 } from 'lucide-react';
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
                // n8n webhook URL for products (Assuming some endpoint as user didn't specify a generic products one, but let's use a logical one or placeholder)
                // Since user didn't provide a specific URL for products, I'll use a placeholder or assume a similar structure to chat if they have one.
                // Actually, the prompt says "Fetch les produits depuis Google Sheets via n8n webhook".
                // I will use a placeholder fetch logic as I don't have the specific URL for products.
                // I'll simulate a fetch to show the loading state.

                // Let's assume the products webhook is similar to the chat one but for getting products.
                // Actually, I'll just mock it for now since no URL was given for Catalogue.

                setTimeout(() => {
                    setProducts([
                        { id: 1, name: 'Tajine en terre cuite', price: '150 DH', category: 'Cuisine', image: 'https://images.unsplash.com/photo-1590424753062-3251f1c8439b?auto=format&fit=crop&q=80&w=400', stock: 12 },
                        { id: 2, name: 'Tapis Berbère Beni Ouarain', price: '2500 DH', category: 'Décoration', image: 'https://images.unsplash.com/photo-1574180045173-8994511942ca?auto=format&fit=crop&q=80&w=400', stock: 5 },
                        { id: 3, name: 'Babouches en cuir', price: '200 DH', category: 'Mode', image: 'https://images.unsplash.com/photo-1621259182978-f09e5e2aa46d?auto=format&fit=crop&q=80&w=400', stock: 20 },
                        { id: 4, name: 'Théière en argent', price: '450 DH', category: 'Artisanat', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400', stock: 8 },
                        { id: 5, name: 'Huile d\'Argan cosmétique', price: '180 DH', category: 'Beauté', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400', stock: 45 },
                        { id: 6, name: 'Lanterne en cuivre', price: '320 DH', category: 'Artisanat', image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=400', stock: 15 },
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
        <div className="min-h-screen bg-orange-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-souk-red mb-4">Catalogue du Souk</h1>
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                className="w-full pl-12 pr-4 py-3 rounded-full border-none shadow-sm focus:ring-2 focus:ring-souk-red outline-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all ${filter === cat ? 'bg-souk-red text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <Loader2 className="animate-spin text-souk-red mb-4" size={48} />
                        <p className="text-gray-600 animate-pulse">Chargement des trésors...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {filteredProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="glass-card rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-souk-yellow text-souk-red px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                        </div>
                                        {product.stock < 10 && (
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-red-500 text-white px-2 py-1 rounded-md text-[10px] font-bold">
                                                    STOCK FAIBLE
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-2xl font-serif font-black text-souk-red">{product.price}</span>
                                            <span className="text-gray-400 text-sm">{product.stock} en stock</span>
                                        </div>

                                        <button
                                            onClick={() => navigate('/chat', { state: { product } })}
                                            className="w-full bg-souk-red text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-souk-red/90 transition-colors"
                                        >
                                            <MessageSquare size={18} />
                                            Demander à Hassan
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalogue;
