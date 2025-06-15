'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import YouTubeCarousel from '../app/components/ui/YoutubeCarousel';
import InstagramCarousel from '../app/components/ui/InstagramCarousel';
import KnobViewer from './components/ui/KnobViewer';
import AudioController from '../app/components/ui/AudioController';

const VideoBackground = dynamic(() => import('./components/VideoBackground'), { ssr: false });

export default function HomePage() {
  const [volume, setVolume] = useState(0.5);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Floating Header */}
      <header className="fixed top-0 left-0 w-full z-50 h-20 px-2 pointer-events-none select-none">
        <div className="flex justify-between items-center h-full">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/icons/thumbnail_white.png"
              alt="Login.jp Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          {/* Right: Knob */}
          <div className="pointer-events-auto mt-8 ml-auto">
            <KnobViewer onChange={setVolume} />
          </div>
        </div>
      </header>

      {/* LED Meter (floating vertically centered on right margin) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 pointer-events-auto flex flex-col items-center">
        <AudioController src="/audio/minipops67.mp3" volume={volume} />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <VideoBackground />
        <div className="sticky mt-12 z-20 text-center perspective-[225px]">
          <motion.img
            src="/icons/loginjp_hero.png"
            alt="login.jp logo"
            className="mx-auto w-64 drop-shadow-[0_0_40px_rgba(255,255,255,1)]"
            animate={{ rotateY: 360, opacity: [0.8, 1, 0.8] }}
            transition={{
              rotateY: { repeat: Infinity, duration: 20, ease: 'linear' },
              opacity: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
            }}
            style={{ transformOrigin: 'center', display: 'inline-block' }}
          />
        </div>
      </section>

      {/* Recent Videos / YouTube Carousel Section */}
      <section className="relative bg-black/50 backdrop-blur-sm text-white py-12 z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none mix-blend-screen opacity-40"
        >
          <source
            src="https://res.cloudinary.com/dd5cgipkp/video/upload/v1749801143/output_jl6kq4.webm"
            type="video/webm"
          />
        </video>
        <YouTubeCarousel />
      </section>

      {/* Instagram Carousel Section */}
      <section className="relative text-white py-12 z-10">
        <InstagramCarousel />
      </section>

      {/* Footer */}
      <footer className="bottom-12 w-full py-6 text-center bg-black text-sm text-white/60 z-10">
        &copy; {new Date().getFullYear()} login.jp — All rights reserved.
      </footer>
    </main>
  );
}
