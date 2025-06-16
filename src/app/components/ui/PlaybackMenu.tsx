'use client';

import { useState, useEffect } from 'react';

interface PlaybackMenuProps {
    audioRef: React.RefObject<HTMLAudioElement>;
}

export default function PlaybackMenu({ audioRef }: PlaybackMenuProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [muted, setMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);

    const toggleMute = () => setMuted((prev) => !prev);
    const skip = (seconds: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime += seconds;
        }
    };
    const restart = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = muted;
            audioRef.current.playbackRate = playbackRate;
        }
    }, [muted, playbackRate, audioRef]);

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="fixed bottom-24 right-6 z-50 w-8 h-8 rounded-full bg-black/70 text-white border border-white/20 flex items-center justify-center"
            >
                ⋮
            </button>

            {/* Popup Menu */}
            {showMenu && (
                <div className="fixed bottom-36 right-4 z-50 bg-black/80 backdrop-blur-md rounded-lg p-4 shadow-xl text-sm space-y-2 w-48 text-white">
                    <button onClick={() => skip(-10)} className="w-full text-left hover:text-green-400">⏪ Skip -10s</button>
                    <button onClick={() => skip(10)} className="w-full text-left hover:text-green-400">⏩ Skip +10s</button>
                    <button onClick={restart} className="w-full text-left hover:text-green-400">🔁 Restart</button>
                    <button onClick={toggleMute} className="w-full text-left hover:text-green-400">
                        {muted ? '🔇 Unmute' : '🔈 Mute'}
                    </button>
                    <div>
                        <label className="text-white/80">Speed:</label>
                        <select
                            value={playbackRate}
                            onChange={(e) => setPlaybackRate(Number(e.target.value))}
                            className="w-full mt-1 bg-black/50 border border-white/20 rounded px-2 py-1"
                        >
                            {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                                <option key={rate} value={rate}>{rate}x</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </>
    );
}
