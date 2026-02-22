import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-souk-midnight"
        >
            <div className="relative">
                {/* Animated Background Rings */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-0 -m-8 border-2 border-souk-gold/20 rounded-full"
                />

                {/* Logo S */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-souk-gold to-souk-gold/60 shadow-[0_0_30px_rgba(255,191,0,0.4)]"
                >
                    <span className="text-5xl font-serif font-black text-souk-midnight">S</span>
                </motion.div>

                {/* Text Loading */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                    <span className="text-souk-gold font-serif text-sm tracking-[0.3em] uppercase">Souk Digital</span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
