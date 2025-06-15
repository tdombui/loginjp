'use client';

import { useEffect, useRef, useState } from 'react';

export default function PlayButton({ src, volume }: { src: string; volume: number }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;
    }, [src]);

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
        <div className="fixed bottom-4 right-2 z-50 pointer-events-auto">
            <button
                onClick={togglePlayback}
                className="w-12 h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors flex items-center justify-center"
                aria-label="Toggle Playback"
            >
                {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <rect x="6" y="5" width="4" height="14" />
                        <rect x="14" y="5" width="4" height="14" />
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M6 4l15 8-15 8z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
