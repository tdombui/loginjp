'use client';

import React, { useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import KnobViewer from './components/ui/KnobViewer';
import AudioController from '../app/components/ui/AudioController';
import Footer from '../app/components/ui/Footer';

const VideoBackground = dynamic(() => import('./components/VideoBackground'), { ssr: false });
const LazyYouTubeCarousel = dynamic(() => import('../app/components/ui/YoutubeCarousel'), { ssr: false });
const LazyInstagramCarousel = dynamic(() => import('../app/components/ui/InstagramCarousel'), { ssr: false });


export default function HomePage() {
  const [volume, setVolume] = useState(0.5);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 100], [1.1, 0.5]);
  const top = useTransform(scrollY, [0, 150], ['50vh', '0.2rem']);
  const topSpring = useSpring(top, { stiffness: 120, damping: 20 });
  const headerBg = useTransform(
    scrollY,
    [100, 200, 300, 400, 500, 600, 700, 800, 900],
    [
      'rgba(0,0,0,0.05)',
      'rgba(0,0,0,0.10)',
      'rgba(0,0,0,0.15)',
      'rgba(0,0,0,0.20)',
      'rgba(0,0,0,0.30)',
      'rgba(0,0,0,0.40)',
      'rgba(0,0,0,0.50)',
      'rgba(0,0,0,0.60)',
      'rgba(0,0,0,0.70)',
    ]
  );
  const headerBlur = useTransform(scrollY, [0, 450], ['blur(0px)', 'blur(8px)']);
  const [ytRef, ytInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [igRef, igInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Floating Header */}
      <motion.header className="fixed top-0 left-0 w-full z-50 h-30 pointer-events-none select-none">
        {/* Masked background layer */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: headerBg,
            backdropFilter: headerBlur,
            WebkitBackdropFilter: headerBlur,
            WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        />

        {/* Actual header content (safe from masking) */}
        <div className="relative z-10 flex justify-between items-center h-full">
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

          {/* Rotating Logo */}
          <motion.div
            className="fixed left-1/2 z-60 w-64 mt-1 sm:w-80"
            style={{
              top: topSpring,
              scale,
              x: '-50%',
              transformOrigin: 'center',
            }}
          >
            <motion.img
              src="/icons/loginjp_hero.png"
              alt="login.jp logo"
              className="w-full z-50 drop-shadow-[0_0_25px_rgba(255,255,255,1)]"
              animate={{ rotateY: 360 }}
              transition={{
                rotateY: { repeat: Infinity, duration: 10, ease: 'linear' },
              }}
            />
          </motion.div>

          {/* Knob or other right-aligned controls */}
          <div className="pointer-events-auto ml-auto mb-4">
            <KnobViewer onChange={setVolume} />
          </div>
        </div>
      </motion.header>


      {/* LED Meter and Play/Pause Button Column */}
      <div className="fixed right-2 z-40 pointer-events-auto flex flex-col items-center justify-between h-screen py-4 select-none">
        <AudioController
          src="https://res.cloudinary.com/dd5cgipkp/video/upload/v1750060326/kanta_ando_d415ol.mp3"
          volume={volume}
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center select-none">
        <VideoBackground />
      </section>
      <section className="relative z-10 py-12 px-4 flex justify-center items-center">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-white text-center font-mono text-md md:text-md max-w-xl leading-relaxed select-none"
        >
          archiving the Japanese experience through music
        </motion.p>
      </section>


      {/* YouTube Carousel Section (lazy mount) */}
      <section ref={ytRef} className="relative  text-white py-12 z-10 select-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none mix-blend-screen opacity-0"
        >
          <source
            src="https://res.cloudinary.com/dd5cgipkp/video/upload/v1749801143/output_jl6kq4.webm"
            type="video/webm"
          />
        </video>
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={ytInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {ytInView && <LazyYouTubeCarousel />}
        </motion.div>
      </section>

      {/* Instagram Carousel Section (lazy mount) */}
      <section ref={igRef} className="relative text-white py-12 z-10 select-none overflow-hidden">
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={igInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {igInView && <LazyInstagramCarousel />}
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
