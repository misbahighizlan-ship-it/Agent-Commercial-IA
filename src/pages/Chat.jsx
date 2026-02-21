import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, ShoppingBag, X, Loader2, Sparkles, MessageCircle, Home as HomeIcon } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Chat = () => {
    const location = useLocation();
    const [messages, setMessages] = useState([
        { id: '1', text: "Marhaba! 🌟 Je suis Hassan, votre concierge du Souk Digital. C'est un honneur de vous accompagner dans votre quête d'excellence. Comment puis-je vous servir aujourd'hui ?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem("sessionId")) {
            sessionStorage.setItem("sessionId", crypto.randomUUID());
        }
    }, []);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    useEffect(() => {
        if (location.state?.product) {
            const p = location.state.product;
            handleSendMessage(`Je suis fasciné par ce trésor : ${p.name}`);
        }
    }, [location.state]);

    const sendMessage = async (userMessage) => {
        try {
            const response = await fetch('/n8n-proxy/webhook/153f50a6-29bd-42e1-bd70-236bbb8f8bc2/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chatInput: userMessage,
                    sessionId: sessionStorage.getItem("sessionId")
                        || (() => {
                            const id = crypto.randomUUID();
                            sessionStorage.setItem("sessionId", id);
                            return id;
                        })()
                })
            });

            if (!response.ok) {
                // Ne pas afficher erreur technique à l'utilisateur
                return "Hassan réfléchit... Répétez votre message svp";
            }

            const data = await response.json();
            return data.output || data.message || data.text || "Pardonnez cette distraction, le souk est animé. Pourriez-vous répéter votre demande ?";

        } catch (error) {
            console.error("Error sending message:", error);
            return "Désolé, un instant...";
        }
    };

    const handleSendMessage = async (customText = null) => {
        const messageText = customText || input;
        if (!messageText.trim()) return;

        const userMessage = { id: Date.now().toString(), text: messageText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        if (!customText) setInput('');
        setIsLoading(true);

        const botReply = await sendMessage(messageText);

        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            text: botReply,
            sender: 'bot'
        }]);

        setIsLoading(false);
    };

    return (
        <div className="flex h-screen overflow-hidden zellij-pattern relative">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 spirit-gradient opacity-10 pointer-events-none"></div>

            {/* Main Chat Area */}
            <div className={`flex flex-col flex-grow transition-all duration-700 relative ${showCart ? 'mr-0 lg:mr-[28rem]' : ''}`}>
                <div className="absolute inset-0 bg-souk-cream/40 -z-10"></div>

                {/* Header */}
                <header className="glass-card px-8 py-5 flex items-center justify-between z-10 border-t-0 border-x-0 rounded-none shadow-md !bg-white/80">
                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className="w-12 h-12 rounded-2xl bg-souk-cream hover:bg-souk-midnight hover:text-souk-gold transition-all flex items-center justify-center text-souk-midnight border border-souk-gold/20 shadow-sm group"
                        >
                            <HomeIcon size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                        </Link>
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-2xl bg-souk-midnight border-2 border-souk-gold flex items-center justify-center text-souk-gold rotate-3 shadow-luxury-btn">
                                    <Bot size={32} strokeWidth={1.5} className="-rotate-3" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-souk-emerald rounded-full border-2 border-white animate-pulse"></div>
                            </div>
                            <div>
                                <h2 className="title-luxury text-xl font-black">Hassan <span className="text-souk-gold italic ml-1 underline decoration-souk-ruby/30">votre Concierge</span></h2>
                                <span className="text-[10px] text-souk-emerald font-black uppercase tracking-[0.2em]">Service Excellence</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowCart(!showCart)}
                            className="relative p-3 rounded-2xl bg-souk-midnight text-souk-gold hover:scale-105 transition-all shadow-lg group border border-souk-gold/30"
                        >
                            <ShoppingBag size={24} strokeWidth={1.5} />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-souk-ruby text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                    {cart.length}
                                </span>
                            )}
                            <div className="absolute -bottom-10 right-0 glass-card px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-bold tracking-widest text-souk-midnight">PANIER LUXE</div>
                        </button>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-8 space-y-8 no-scrollbar">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[75%] flex items-end gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border-2 transition-transform hover:scale-110 shadow-sm ${msg.sender === 'user'
                                        ? 'bg-souk-cream border-souk-gold text-souk-gold'
                                        : 'bg-souk-midnight border-souk-gold text-souk-gold'
                                        }`}>
                                        {msg.sender === 'user' ? <User size={20} strokeWidth={1.5} /> : <Bot size={20} strokeWidth={1.5} />}
                                    </div>
                                    <div className={`p-6 rounded-[2rem] shadow-xl relative group ${msg.sender === 'user'
                                        ? 'bg-souk-midnight text-white rounded-br-none border-l-4 border-souk-gold'
                                        : 'glass-card text-souk-midnight rounded-bl-none border-r-4 border-souk-gold'
                                        }`}>
                                        <p className="text-sm md:text-base leading-relaxed font-medium italic opacity-90">{msg.text}</p>
                                        <div className={`absolute bottom-0 text-[8px] font-black tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity py-2 ${msg.sender === 'user' ? 'right-0 text-souk-gold' : 'left-0 text-souk-midnight/30'
                                            }`}>
                                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-souk-midnight border-2 border-souk-gold flex items-center justify-center text-souk-gold animate-pulse">
                                    <Bot size={20} strokeWidth={1.5} />
                                </div>
                                <div className="glass-card px-6 py-4 rounded-full flex items-center gap-4 border-r-4 border-souk-gold shadow-lg">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-souk-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-souk-gold rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-souk-gold rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                                    </div>
                                    <span className="text-[10px] font-black tracking-[0.3em] text-souk-gold uppercase">Hassan peaufine sa réponse</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Footer Input */}
                <div className="p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="glass-card p-2 rounded-[2.5rem] flex items-center gap-2 border-souk-gold/30 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/40 -z-10"></div>
                            <div className="pl-6 text-souk-gold">
                                <MessageCircle size={24} strokeWidth={1.5} />
                            </div>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Confiez votre demande à Hassan..."
                                className="flex-grow p-5 bg-transparent border-none outline-none text-souk-midnight font-medium placeholder:text-souk-midnight/30"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={isLoading || !input.trim()}
                                className="btn-luxury h-14 w-14 rounded-full !px-0 bg-souk-midnight text-souk-gold shadow-lg group overflow-hidden relative"
                            >
                                <Send size={24} strokeWidth={1.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-souk-gold/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>
                        </div>
                        <p className="text-center mt-4 text-[9px] font-black tracking-[0.4em] text-souk-gold uppercase opacity-50">Confidentialité & Excellence Marocaine Garantie</p>
                    </div>
                </div>
            </div>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {showCart && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0.5 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 200, duration: 0.8 }}
                        className="fixed inset-y-0 right-0 w-full lg:w-[28rem] glass-card !bg-white/90 backdrop-blur-3xl z-50 flex flex-col border-y-0 border-r-0 border-l border-souk-gold/20 shadow-[-20px_0_50px_rgba(0,43,54,0.1)] rounded-none"
                    >
                        <div className="p-10 border-b border-souk-gold/10 flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3 text-souk-midnight">
                                    <ShoppingBag size={28} strokeWidth={1.5} className="text-souk-gold" />
                                    <h3 className="title-luxury text-3xl font-black italic">Votre <span className="text-souk-gold">Écrin</span></h3>
                                </div>
                                <span className="text-[10px] font-black tracking-[0.3em] text-souk-gold mt-2 uppercase">Sélection Privée</span>
                            </div>
                            <button onClick={() => setShowCart(false)} className="w-12 h-12 rounded-2xl bg-souk-cream hover:bg-souk-gold hover:text-white transition-all flex items-center justify-center text-souk-gold border border-souk-gold/20 shadow-sm">
                                <X size={24} strokeWidth={1.5} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-8 space-y-6 no-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-1000">
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-souk-cream border-2 border-dashed border-souk-gold/30 flex items-center justify-center text-souk-gold/40">
                                        <ShoppingBag size={48} strokeWidth={1} />
                                    </div>
                                    <div className="text-center">
                                        <p className="title-luxury text-xl mb-2 opacity-50">Votre écrin est vide</p>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-souk-gold">L'excellence vous attend au souk</p>
                                    </div>
                                </div>
                            ) : (
                                cart.map((item, index) => (
                                    <div key={index} className="glass-card p-6 rounded-[2rem] border-none group hover:shadow-2xl transition-all duration-500 relative bg-white shadow-lg overflow-hidden">
                                        <div className="flex gap-6 relative z-10">
                                            <div className="w-24 h-24 rounded-2xl bg-souk-midnight overflow-hidden flex-shrink-0 border-2 border-souk-gold/20 transform group-hover:scale-105 transition-transform duration-700">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90" />
                                            </div>
                                            <div className="flex-grow flex flex-col justify-between py-1">
                                                <div>
                                                    <h4 className="title-luxury text-xl font-black group-hover:text-souk-gold transition-colors">{item.name}</h4>
                                                    <p className="text-[9px] uppercase tracking-[0.2em] text-souk-midnight/40 mt-1">Artisanat de Prestige</p>
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <p className="text-2xl font-serif font-black text-souk-gold">{item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-souk-gold/5 -rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:translate-x-8 group-hover:-translate-y-8"></div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-10 border-t border-souk-gold/10 bg-souk-midnight text-white rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,43,54,0.3)]">
                                <div className="flex justify-between items-center mb-10">
                                    <div>
                                        <span className="text-[10px] font-black tracking-[0.4em] text-souk-gold uppercase">Total Privilège</span>
                                        <div className="flex items-baseline gap-2 mt-2">
                                            <span className="text-4xl font-serif font-black text-souk-gold">
                                                {cart.reduce((acc, curr) => acc + parseInt(curr.price), 0)}
                                            </span>
                                            <span className="text-xl font-serif text-souk-gold/60">DH</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[8px] tracking-widest text-white/40 uppercase">TVA Incluse</p>
                                        <p className="text-[8px] tracking-widest text-white/40 uppercase mt-1">Expédition Assurée</p>
                                    </div>
                                </div>
                                <button className="btn-luxury w-full py-6 group overflow-hidden !bg-souk-gold !text-souk-midnight hover:!bg-white">
                                    <span className="relative z-10 flex items-center justify-center gap-4 tracking-[0.3em] font-black text-xs">
                                        <Sparkles size={20} />
                                        COMMANDER L'EXCELLENCE
                                    </span>
                                </button>
                                <p className="text-center mt-6 text-[8px] font-black tracking-[0.5em] text-souk-gold/40 uppercase">Paiement Sécurisé & Discrétion Absolue</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chat;
