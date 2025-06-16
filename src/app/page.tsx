'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import YouTubeCarousel from '../app/components/ui/YoutubeCarousel';
import InstagramCarousel from '../app/components/ui/InstagramCarousel';
import KnobViewer from './components/ui/KnobViewer';
import AudioController from '../app/components/ui/AudioController';
import Footer from '../app/components/ui/Footer';

const VideoBackground = dynamic(() => import('./components/VideoBackground'), { ssr: false });

export default function HomePage() {
  const [volume, setVolume] = useState(0.5);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 400], [1, 0.5]);
  const top = useTransform(scrollY, [0, 150], ['50vh', '0.2rem']);
  const opacity = useTransform(scrollY, [0, 10], [1, 1]);
  const headerBg = useTransform(scrollY, [0, 100], ['transparent', 'rgba(0,0,0,0.3)']);
  const headerBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(8px)']);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Floating Header */}
      <motion.header
        className="fixed top-0 left-0 w-full z-50 h-32 pointer-events-none select-none"
        style={{
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
        }}
      >
        <div className="flex justify-between items-center h-full">
          {/* Left: Thumbnail */}
          <div className="flex items-center gap-2 pl-6">
            <Image
              src="/icons/thumbnail_white.png"
              alt="Login.jp Thumbnail"
              width={48}
              height={48}
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Floating + Transitioning Logo */}
          <motion.div
            className="fixed left-1/2 z-60 w-64 mt-4 sm:w-80"
            style={{
              top,
              scale,
              x: '-50%',
              transformOrigin: 'center',
            }}
          >
            <motion.img
              src="/icons/loginjp_hero.png"
              alt="login.jp logo"
              className="w-full z-50 drop-shadow-[0_0_40px_rgba(255,255,255,1)]"
              animate={{ rotateY: 360 }}
              transition={{
                rotateY: { repeat: Infinity, duration: 10, ease: 'linear' },
              }}
            />
          </motion.div>

          {/* Master Level Knob */}
          <div className="pointer-events-auto mt-2 ml-auto">
            <KnobViewer onChange={setVolume} />
          </div>
        </div>
      </motion.header>

      {/* LED Meter and Play/Pause Button Column */}
      <div className="fixed right-2 z-40 pointer-events-auto flex flex-col items-center justify-between h-screen py-4">
        <AudioController
          src="https://res.cloudinary.com/dd5cgipkp/video/upload/v1750060326/kanta_ando_d415ol.mp3"
          volume={volume}
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <VideoBackground />
      </section>

      {/* YouTube Carousel Section */}
      <section className="relative bg-black/60 backdrop-blur-sm text-white py-12 z-10">
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
      <Footer />
    </main>
  );
}
