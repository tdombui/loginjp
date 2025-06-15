'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="fixed inset-0 z-0 w-screen h-screen overflow-hidden">
            {/* 🌌 Hero Video Background */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover"
                onEnded={() => {
                    const video = videoRef.current;
                    if (video) {
                        video.pause(); // Ensure reset starts clean
                        video.currentTime = 0;
                        requestAnimationFrame(() => {
                            video.play().catch(() => { });
                        });
                    }
                }}
            >

                <source
                    src="https://res.cloudinary.com/dd5cgipkp/video/upload/f_auto,q_auto/v1749797985/hero-dithered-854x480_ip3mgq.webm"
                    type="video/webm"
                />
            </video>




            {/* ✨ VHS Overlay (always playing on top) */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-30 pointer-events-none mix-blend-screen opacity-20"
            >
                <source
                    src="https://res.cloudinary.com/dd5cgipkp/video/upload/v1749801143/output_jl6kq4.webm"
                    type="video/webm"
                />
            </video>

            {/* 🌀 Optional Noise Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none mix-blend-soft-light opacity-60">
                <Image
                    src="/noise.png"
                    alt="Noise texture"
                    fill
                    className="object-cover w-full h-full"
                    priority
                />
            </div>

            {/* 🕶️ Dark overlay for clarity */}
            <div className="absolute inset-0 bg-black/45 z-30" />


        </div>
    );
}
