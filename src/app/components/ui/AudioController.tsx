'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function AudioController({
    src,
    volume,
}: {
    src: string;
    volume: number;
}) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const contextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.crossOrigin = 'anonymous';
        audio.volume = volume;
        audioRef.current = audio;

        const context = new AudioContext();
        contextRef.current = context;

        const srcNode = context.createMediaElementSource(audio);
        const analyser = context.createAnalyser();
        analyser.fftSize = 64;

        const gain = context.createGain();
        gain.gain.value = volume;
        gainRef.current = gain;

        srcNode.connect(gain);
        gain.connect(analyser);
        analyser.connect(context.destination);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateLevel = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            setLevel(avg);
            requestAnimationFrame(updateLevel);
        };
        updateLevel();
    }, [src]);

    // Live update volume when knob changes
    useEffect(() => {
        if (gainRef.current && contextRef.current) {
            gainRef.current.gain.setTargetAtTime(volume, contextRef.current.currentTime, 0.01);
        }
    }, [volume]);

    const togglePlayback = async () => {
        const audio = audioRef.current;
        const context = contextRef.current;

        if (!audio || !context) return;

        try {
            if (context.state === 'suspended') {
                await context.resume();
            }

            if (isPlaying) {
                audio.pause();
            } else {
                await audio.play();
            }

            setIsPlaying(!isPlaying);
        } catch (err) {
            console.error('Playback failed:', err);
            alert('Audio playback failed. Please try clicking the button again.');
        }
    };

    return (
        <>
            {/* LED Meter - stays fixed on right-center */}
            <div className="fixed right-2 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center pointer-events-auto py-4 mr-1">
                {/* Dual LED Columns (duplicated for L/R visual) */}
                <div className="flex gap-2">
                    {[...Array(2)].map((_, colIdx) => (
                        <div
                            key={colIdx}
                            className="flex flex-col-reverse gap-[3px] h-[150px] w-[4px]"
                        >
                            {[...Array(11)].map((_, i) => {
                                const thresholds = [10, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95];
                                const isActive = level > thresholds[i];

                                let bg = 'bg-green-500';
                                if (i >= 5 && i < 9) bg = 'bg-yellow-400';
                                if (i >= 9) bg = 'bg-red-500';

                                return (
                                    <div
                                        key={i}
                                        className={`w-[4px] h-[36px] ${bg} transition-opacity duration-100 ${isActive ? 'opacity-100' : 'opacity-20'
                                            }`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

            </div>

            {/* Play/Pause Button - bottom right */}
            <motion.button
                onClick={togglePlayback}
                whileTap={{ scale: 0.87 }}
                whileHover={{ scale: .97 }}
                className={`fixed bottom-6 right-4 z-50 w-18 h-18 rounded-full transition-all duration-300 pointer-events-auto ${isPlaying
                    ? 'ring-[6px] ring-green-400 shadow-[0_0_36px_rgba(0,255,0,0.6)]'
                    : 'ring-0 shadow-none'
                    }`}
            >
                <img
                    src="/icons/play_pause.webp"
                    alt="Play/Pause Button"
                    className="w-full h-full object-contain pointer-events-none"
                />
            </motion.button>

        </>
    );
}
