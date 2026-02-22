import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, Loader2, AlertCircle, Sparkles, MapPin, Home as HomeIcon, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            // Simulated tracking flow for Hassan's luxury service
            setTimeout(() => {
                if (orderId === 'ERR-404') {
                    setError("Cette commande demeure introuvable dans nos registres. Vérifiez vos informations, cher visiteur.");
                } else {
                    setOrderData({
                        id: orderId,
                        status: 'Traitement par Hassan',
                        date: '22 Février 2026',
                        items: [
                            { name: 'Tajine Royal en Terre Cuite', qty: 1, origin: 'Fès' },
                            { name: 'Babouches en Cuir de Prestige', qty: 2, origin: 'Marrakech' }
                        ],
                        history: [
                            { status: 'Confirmée', icon: '✅', date: '21 Fév, 14:30', completed: true, detail: 'Votre commande a été authentifiée par nos artisans.' },
                            { status: 'Traitement', icon: '⏳', date: '22 Fév, 09:15', completed: true, detail: 'Préparation méticuleuse et emballage de protection premium.' },
                            { status: 'Expédiée', icon: '📦', date: '--', completed: false, detail: 'Votre colis s\'apprête à traverser les royaumes.' },
                            { status: 'Livrée', icon: '🏠', date: '--', completed: false, detail: 'Livraison à votre demeure par nos coursiers dévoués.' }
                        ]
                    });
                }
                setLoading(false);
            }, 1500);
        } catch (err) {
            setError("Une ombre plane sur la connexion... Réessayez dans un instant.");
            setLoading(false);
        }
    };

    const getStatusIcon = (status, active) => {
        const color = active ? 'text-souk-gold' : 'text-souk-midnight/20';
        switch (status) {
            case 'Confirmée': return <CheckCircle size={28} className={color} />;
            case 'Traitement': return <Clock size={28} className={color} />;
            case 'Expédiée': return <Truck size={28} className={color} />;
            case 'Livrée': return <Package size={28} className={color} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen py-20 px-6 zellij-pattern relative overflow-hidden">
            {/* Ambient Animated Spirit Background */}
            <div className="absolute inset-0 spirit-gradient opacity-10 -z-10"></div>
            <div className="absolute inset-0 bg-souk-cream/40 -z-20"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Navigation and Top Decoration */}
                <div className="flex justify-between items-start mb-12">
                    <Link
                        to="/"
                        className="w-12 h-12 rounded-2xl bg-white/80 glass-card hover:bg-souk-midnight hover:text-souk-gold transition-all flex items-center justify-center text-souk-midnight border border-souk-gold/20 shadow-sm group"
                    >
                        <HomeIcon size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                    </Link>
                    <div className="w-20 h-20 border-2 border-souk-gold/30 rotate-45 flex items-center justify-center shadow-luxury-glass bg-white/10 backdrop-blur-sm">
                        <div className="w-16 h-16 border border-souk-gold/20 -rotate-45 flex items-center justify-center">
                            <span className="text-souk-gold/40 font-serif text-xl font-black italic">S</span>
                        </div>
                    </div>
                </div>

                <header className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-4"
                    >
                        <span className="text-souk-gold tracking-[0.4em] uppercase text-xs font-black">Service de Conciergerie de Luxe</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl title-luxury mb-4">Suivi de <span className="text-souk-gold italic underline decoration-souk-ruby/30">Prestige</span></h1>
                    <p className="text-souk-midnight/60 font-medium tracking-widest text-xs uppercase">L'excellence Hassan suit vos trésors pas à pas</p>
                </header>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card rounded-[3rem] p-10 md:p-14 shadow-luxury-deep mb-12 border-souk-gold/10 relative overflow-hidden bg-white/90"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-souk-gold/5 rounded-bl-[5rem]"></div>
                    <form onSubmit={handleTrackOrder} className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-souk-gold uppercase tracking-[0.3em] ml-1">Identifiant Commande</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="ex: #LUXE-2026-MOR"
                                    className="w-full p-5 rounded-2xl bg-souk-cream/30 border border-souk-gold/20 focus:ring-2 focus:ring-souk-gold outline-none transition-all font-medium text-souk-midnight placeholder:text-souk-midnight/20"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-souk-gold uppercase tracking-[0.3em] ml-1">Adresse de Correspondance</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="votre.excellence@email.com"
                                    className="w-full p-5 rounded-2xl bg-souk-cream/30 border border-souk-gold/20 focus:ring-2 focus:ring-souk-gold outline-none transition-all font-medium text-souk-midnight placeholder:text-souk-midnight/20"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            disabled={loading}
                            className="w-full btn-luxury py-6 group relative overflow-hidden !bg-souk-midnight !text-souk-gold border border-souk-gold/30"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4 tracking-[0.3em] text-xs font-black">
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <Search size={22} strokeWidth={1.5} />
                                        RECHERCHER MES TRÉSORS
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-souk-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                        </button>
                    </form>
                </motion.div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-souk-ruby/5 text-souk-ruby p-8 rounded-[2rem] flex items-center gap-6 border border-souk-ruby/10 shadow-lg mb-12"
                        >
                            <div className="w-12 h-12 rounded-full bg-souk-ruby/10 flex items-center justify-center flex-shrink-0">
                                <AlertCircle size={28} />
                            </div>
                            <p className="font-bold tracking-wide italic leading-relaxed">{error}</p>
                        </motion.div>
                    )}

                    {orderData && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12"
                        >
                            <div className="glass-card rounded-[3rem] p-10 md:p-14 shadow-luxury-deep border-none relative overflow-hidden bg-white/95 backdrop-blur-3xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-souk-gold/5 blur-3xl -z-10"></div>

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b border-souk-gold/10 pb-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="bg-souk-midnight text-souk-gold px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-souk-gold/30">Commande {orderData.id}</span>
                                            <span className="text-[10px] text-souk-midnight/30 font-bold uppercase tracking-widest">{orderData.date}</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl title-luxury font-black">Status: <span className="text-souk-gold italic underline decoration-souk-ruby/20">{orderData.status}</span></h2>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-souk-midnight border-2 border-souk-gold text-souk-gold rounded-[1.5rem] flex items-center justify-center shadow-luxury-btn rotate-3">
                                            <Bot size={40} strokeWidth={1.2} className="-rotate-3" />
                                        </div>
                                    </div>
                                </div>

                                {/* Premium Vertical Timeline */}
                                <div className="space-y-12 relative px-4">
                                    <div className="absolute left-[2.35rem] top-4 bottom-4 w-0.5 bg-souk-gold/10 border-l border-dashed border-souk-gold/40 -z-10"></div>
                                    <motion.div
                                        initial="hidden"
                                        animate="show"
                                        variants={{
                                            hidden: { opacity: 0 },
                                            show: {
                                                opacity: 1,
                                                transition: {
                                                    staggerChildren: 0.2
                                                }
                                            }
                                        }}
                                        className="space-y-12"
                                    >
                                        {orderData.history.map((step, idx) => (
                                            <motion.div
                                                key={idx}
                                                variants={{
                                                    hidden: { opacity: 0, x: -20 },
                                                    show: { opacity: 1, x: 0 }
                                                }}
                                                className="flex gap-10 items-start group"
                                            >
                                                <div className="relative">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500 group-hover:scale-110 shadow-lg ${step.completed
                                                        ? 'bg-souk-midnight border-2 border-souk-gold text-souk-gold'
                                                        : 'bg-souk-cream border-2 border-souk-gold/20 text-souk-midnight/20'
                                                        }`}>
                                                        {getStatusIcon(step.status, step.completed)}
                                                    </div>
                                                    {step.completed && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="absolute -top-2 -right-2 w-7 h-7 bg-souk-gold text-souk-midnight rounded-full flex items-center justify-center text-xs shadow-lg border-2 border-white z-20"
                                                        >
                                                            {step.icon}
                                                        </motion.div>
                                                    )}
                                                </div>
                                                <div className={`flex-grow border-b border-souk-gold/5 pb-8 ${idx === orderData.history.length - 1 ? 'border-none' : ''}`}>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className={`text-2xl title-luxury font-black tracking-tight transition-colors ${step.completed ? 'text-souk-midnight group-hover:text-souk-gold' : 'text-souk-midnight/30'}`}>
                                                                {step.status}
                                                            </h3>
                                                        </div>
                                                        {step.completed && (
                                                            <span className="text-[10px] font-black text-souk-gold bg-souk-gold/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                                                {step.date}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className={`text-sm italic font-medium max-w-lg leading-relaxed ${step.completed ? 'text-souk-midnight/60' : 'text-souk-midnight/20'}`}>
                                                        {step.detail}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Tracking Details Card */}
                                <div className="mt-16 bg-souk-midnight rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-luxury-deep border border-souk-gold/20">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-souk-gold/10 rounded-full blur-[120px]"></div>
                                    <div className="relative z-10 text-center md:text-left">
                                        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                                            <div className="w-16 h-16 rounded-2xl bg-souk-gold/20 flex items-center justify-center text-souk-gold shadow-luxury-btn">
                                                <Package size={32} strokeWidth={1.2} />
                                            </div>
                                            <div>
                                                <h3 className="title-luxury text-3xl text-white italic">Détails de <span className="text-souk-gold">l'Expédition</span></h3>
                                                <p className="text-[10px] text-souk-gold/50 font-black uppercase tracking-[0.3em] mt-1">Colis d'Artisanat Certifié</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {orderData.items.map((item, idx) => (
                                                <div key={idx} className="glass-card !bg-white/10 border-white/10 p-6 rounded-2xl flex justify-between items-center hover:bg-white/15 transition-all group cursor-default">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-14 h-14 rounded-xl bg-souk-gold/10 flex items-center justify-center text-souk-gold text-lg font-black border border-souk-gold/20 group-hover:bg-souk-gold group-hover:text-souk-midnight transition-colors">
                                                            {item.qty}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-lg text-white group-hover:text-souk-gold transition-colors">{item.name}</p>
                                                            <div className="flex items-center gap-2 opacity-60">
                                                                <MapPin size={12} className="text-souk-gold" />
                                                                <span className="text-[10px] uppercase tracking-widest font-bold">Atelier: {item.origin}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center group-hover:border-souk-gold/50 transition-colors">
                                                        <Sparkles size={16} className="text-souk-gold/40" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Elegant Mosaic Background Pattern Bottom */}
            <div className="mt-24 opacity-20 flex gap-12 overflow-hidden w-full justify-center pb-20 relative">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => (
                    <div key={i} className="w-12 h-12 border border-souk-gold/50 rotate-45 flex-shrink-0 bg-souk-gold/5 animate-pulse" style={{ animationDelay: `${i * 150}ms` }}></div>
                ))}
            </div>

            <p className="text-center mt-4 text-[9px] font-black tracking-[0.6em] text-souk-gold uppercase opacity-50 relative z-10">Authenticité & Prestige Hassan Certifié</p>
        </div>
    );
};

export default Suivi;
