'use client';

import { motion } from 'framer-motion';

export default function PlayPauseButton({
    isPlaying,
    onToggle,
}: {
    isPlaying: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.button
            onClick={onToggle}
            whileTap={{ scale: 0.92 }}
            className={`w-16 h-16 mt-8 rounded-full transition-all duration-300 ${isPlaying
                ? 'ring-3 ring-green-400 shadow-[0_0_25px_rgba(0,255,0,0.5)]'
                : 'ring-0 shadow-none'
                }`}
        >
            <img
                src="/icons/play_pause.webp"
                alt="Play/Pause Button"
                className="w-full h-full object-contain pointer-events-none"
            />
        </motion.button>
    );
}
