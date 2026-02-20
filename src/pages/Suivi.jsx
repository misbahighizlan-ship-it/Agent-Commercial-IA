import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, Loader2, AlertCircle } from 'lucide-react';

const Suivi = () => {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrackOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setOrderData(null);

        try {
            // Mocking the n8n webhook for tracking (as no specific URL provided for Suivi)
            // fetch('https://n8n.example.com/webhook/track', { ... })

            setTimeout(() => {
                if (orderId === 'ERR-404') {
                    setError("Commande introuvable. Vérifiez vos informations.");
                } else {
                    setOrderData({
                        id: orderId,
                        status: 'En traitement', // Confirmée → En traitement → Expédiée → Livrée
                        date: '21 Février 2026',
                        items: [
                            { name: 'Tajine en terre cuite', qty: 1 },
                            { name: 'Babouches en cuir', qty: 2 }
                        ],
                        history: [
                            { status: 'Confirmée', date: '20 Fév, 14:30', completed: true },
                            { status: 'En traitement', date: '21 Fév, 09:15', completed: true },
                            { status: 'Expédiée', date: '--', completed: false },
                            { status: 'Livrée', date: '--', completed: false }
                        ]
                    });
                }
                setLoading(false);
            }, 1500);
        } catch (err) {
            setError("Une erreur est survenue lors de la recherche.");
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Confirmée': return <CheckCircle size={24} />;
            case 'En traitement': return <Clock size={24} />;
            case 'Expédiée': return <Truck size={24} />;
            case 'Livrée': return <Package size={24} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-souk-red mb-4">Suivi de Commande</h1>
                    <p className="text-gray-600">Entrez vos détails pour savoir où se trouve votre colis.</p>
                </header>

                <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
                    <form onSubmit={handleTrackOrder} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">ID de commande</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="ex: #SOUK-1234"
                                    className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-souk-red outline-none"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="votre@email.com"
                                    className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-souk-red outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            disabled={loading}
                            className="w-full btn-primary bg-souk-red text-white rounded-xl py-4 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <Search size={20} />
                            )}
                            Rechercher la commande
                        </button>
                    </form>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-50 text-red-600 p-6 rounded-2xl flex items-center gap-4 border border-red-100"
                        >
                            <AlertCircle size={24} />
                            <p className="font-medium">{error}</p>
                        </motion.div>
                    )}

                    {orderData && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <p className="text-gray-400 text-sm uppercase font-bold tracking-widest">Commande {orderData.id}</p>
                                    <h2 className="text-2xl font-bold text-gray-800">Status: {orderData.status}</h2>
                                </div>
                                <div className="p-3 bg-orange-100 text-souk-red rounded-2xl">
                                    {getStatusIcon(orderData.status)}
                                </div>
                            </div>

                            {/* Visual Timeline */}
                            <div className="relative mb-12">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10"></div>
                                <div className="flex justify-between">
                                    {orderData.history.map((step, idx) => (
                                        <div key={idx} className="flex flex-col items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md ${step.completed ? 'bg-souk-red text-white' : 'bg-gray-200 text-gray-400'
                                                }`}>
                                                {idx === 0 && <CheckCircle size={18} />}
                                                {idx === 1 && <Clock size={18} />}
                                                {idx === 2 && <Truck size={18} />}
                                                {idx === 3 && <Package size={18} />}
                                            </div>
                                            <p className={`text-xs font-bold ${step.completed ? 'text-souk-red' : 'text-gray-400'}`}>
                                                {step.status}
                                            </p>
                                            {step.completed && (
                                                <p className="text-[10px] text-gray-500 mt-1">{step.date}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-8">
                                <h3 className="font-bold text-gray-800 mb-4">Détails des articles</h3>
                                <div className="space-y-4">
                                    {orderData.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                            <span className="text-gray-700">{item.name}</span>
                                            <span className="font-bold text-gray-500">x{item.qty}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Suivi;
