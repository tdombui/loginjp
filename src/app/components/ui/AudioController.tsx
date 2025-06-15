'use client';
import { useEffect, useRef, useState } from 'react';

export default function AudioController({ src, volume }: { src: string; volume: number }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [level, setLevel] = useState(0);
    const analyserRef = useRef<AnalyserNode | null>(null);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;

        const context = new AudioContext();
        const srcNode = context.createMediaElementSource(audio);
        const analyser = context.createAnalyser();
        analyser.fftSize = 64;

        const gain = context.createGain();
        gain.gain.value = volume;

        srcNode.connect(gain);
        gain.connect(analyser);
        analyser.connect(context.destination);

        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateLevel = () => {
            analyser.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            setLevel(avg);
            requestAnimationFrame(updateLevel);
        };

        updateLevel();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlayback = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            await audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed right-2 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 pointer-events-auto">
            {/* LEDs */}
            <div className="flex flex-col-reverse gap-[3px] h-[150px] w-[4px]">
                {[...Array(11)].map((_, i) => {
                    const thresholds = [10, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95];
                    const isActive = level > thresholds[i];

                    let bg = 'bg-green-500';
                    if (i >= 5 && i < 9) bg = 'bg-yellow-400';
                    if (i >= 9) bg = 'bg-red-500';

                    return (
                        <div
                            key={i}
                            className={`w-[4px] h-[36px] ${bg} transition-opacity duration-100 ${isActive ? 'opacity-100' : 'opacity-40'
                                }`}
                        />
                    );
                })}
            </div>

            {/* Play/Pause Button under LEDs */}
            <button
                onClick={togglePlayback}
                className="w-10 h-10 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors flex items-center justify-center bto"
                aria-label="Toggle Playback"
            >
                {isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <rect x="6" y="5" width="4" height="14" />
                        <rect x="14" y="5" width="4" height="14" />
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M6 4l15 8-15 8z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
