import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, ShoppingBag, X, Loader2, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

const Chat = () => {
    const location = useLocation();
    const [messages, setMessages] = useState([
        { id: '1', text: "Marhaba! 🌟 Je suis Hassan, votre agent commercial du Souk Digital Marocain. Comment puis-je vous aider?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(true);

    // Use sessionStorage for session persistence
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
            handleSendMessage(`Je suis intéressé par le produit : ${p.name}`);
        }
    }, [location.state]);

    const handleSendMessage = async (customText = null) => {
        const messageText = customText || input;
        if (!messageText.trim()) return;

        const userMessage = { id: Date.now().toString(), text: messageText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        if (!customText) setInput('');
        setIsLoading(true);

        const sid = sessionStorage.getItem("sessionId") || crypto.randomUUID();

        try {
            const response = await fetch('/n8n-proxy/webhook/153f50a6-29bd-42e1-bd70-236bbb8f8bc2/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chatInput: messageText,
                    sessionId: sessionStorage.getItem("sessionId") || crypto.randomUUID()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: data.output || "Désolé, j'ai un petit problème technique. Pouvez-vous répéter ?",
                sender: 'bot'
            }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: "Oups, ma connexion au souk a été coupée. Réessayez dans un instant !",
                sender: 'bot'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-orange-50 overflow-hidden">
            {/* Main Chat Area */}
            <div className={`flex flex-col flex-grow transition-all duration-500 ${showCart ? 'mr-0 lg:mr-96' : ''}`}>
                {/* Header */}
                <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-souk-red flex items-center justify-center text-white">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-800">Hassan l'Agent AI</h2>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-green-600 font-medium">En ligne</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowCart(!showCart)}
                        className="lg:hidden p-2 text-souk-red"
                    >
                        <ShoppingBag size={24} />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-souk-yellow text-souk-red' : 'bg-souk-red text-white'
                                    }`}>
                                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl shadow-sm ${msg.sender === 'user'
                                    ? 'bg-souk-red text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 rounded-tl-none border border-orange-100'
                                    }`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-souk-red flex items-center justify-center text-white">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                    <Loader2 className="animate-spin text-souk-red" size={16} />
                                    <span className="text-sm italic text-gray-500">Hassan réfléchit...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Footer Input */}
                <div className="p-6 bg-white border-t">
                    <div className="max-w-4xl mx-auto flex gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Écrivez votre message à Hassan..."
                            className="flex-grow p-4 rounded-xl bg-orange-50/50 border-none outline-none focus:ring-2 focus:ring-souk-red transition-all"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={isLoading || !input.trim()}
                            className="bg-souk-red text-white p-4 rounded-xl disabled:opacity-50 hover:shadow-lg transition-all"
                        >
                            <Send size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {showCart && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full lg:w-96 bg-white shadow-2xl z-50 flex flex-col"
                    >
                        <div className="p-6 border-b flex items-center justify-between bg-souk-red text-white">
                            <div className="flex items-center gap-2">
                                <ShoppingBag size={24} />
                                <h3 className="text-xl font-bold">Votre Panier</h3>
                            </div>
                            <button onClick={() => setShowCart(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                                    <ShoppingBag size={64} className="mb-4" />
                                    <p className="text-center">Votre panier est vide. <br /> Demandez à Hassan pour commencer !</p>
                                </div>
                            ) : (
                                cart.map((item, index) => (
                                    <div key={index} className="flex gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100 group">
                                        <div className="w-16 h-16 rounded-lg bg-white overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-bold text-gray-800">{item.name}</h4>
                                            <p className="text-souk-red font-black font-serif">{item.price}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 border-t bg-orange-50/30">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600">Total estimé</span>
                                <span className="text-2xl font-serif font-black text-souk-red">
                                    {cart.reduce((acc, curr) => acc + parseInt(curr.price), 0)} DH
                                </span>
                            </div>
                            <button className="w-full btn-primary bg-souk-red text-white rounded-xl py-4 flex items-center justify-center gap-2">
                                <Sparkles size={18} />
                                Finaliser la commande
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chat;
