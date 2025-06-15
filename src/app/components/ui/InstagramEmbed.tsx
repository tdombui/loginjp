'use client';
import { useEffect, useRef } from 'react';

export default function InstagramEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If script hasn't been injected, inject it
        if (!(window as any).instgrm) {
            const script = document.createElement('script');
            script.src = 'https://www.instagram.com/embed.js';
            script.async = true;
            script.onload = () => {
                (window as any).instgrm?.Embeds?.process();
            };
            document.body.appendChild(script);
        } else {
            // If script already exists, trigger embed parsing manually
            (window as any).instgrm?.Embeds?.process();
        }
    }, []);

    return (
        <div ref={containerRef} className="w-full flex justify-center py-6 z-[40] relative">
            <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/reel/DGIS7WLyvR-/"
                data-instgrm-version="14"
                style={{
                    background: '#000',
                    border: 0,
                    margin: '1rem auto',
                    maxWidth: '400px',
                    width: '100%',
                    minWidth: '220px',
                }}
            />
        </div>
    );
}
