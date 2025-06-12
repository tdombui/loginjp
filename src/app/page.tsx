'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import 'swiper/css';
const VideoBackground = dynamic(() => import('./components/VideoBackground'), { ssr: false });

const videos = [
  { id: 'pJ8EyNFg9Dk', title: 'Video 1' },
  { id: 'FK0q-jpia48', title: 'Video 2' },
  { id: 'cw4Re9ibqvc', title: 'Video 3' },
  { id: 'FLtlyifFueM', title: 'Video 4' },
  { id: 'X0BnF3TYDtQ', title: 'Video 5' },
  { id: 'F7tZVacIpVs', title: 'Video 6' },
  { id: '2a00wfUegDs', title: 'Video 7' },
];

function YouTubePlaceholder({ videoId, title }: { videoId: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
      {isPlaying ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&rel=0&controls=1&modestbranding=1&showinfo=0&autohide=1&playlist=${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full cursor-pointer flex items-center justify-center bg-black"
          onClick={() => setIsPlaying(true)}
        >
          <Image
            src={thumbnail}
            alt={`Thumbnail for ${title}`}
            fill
            className="object-cover w-full h-full"
          />
          <motion.div
            className="absolute backdrop-blur-[3px] bg-black/40 text-white px-6 py-2 rounded-xl shadow-lg"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Play size={36} className="drop-shadow-[0_0_20px_rgba(255,255,255,1)]" />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <header className="fixed top-3 left-0 w-full z-50 flex justify-center items-center h-20 pointer-events-none select-none">
        <div className="w-18 h-18 relative pointer-events-auto">
          <Image
            src="/icons/thumbnail_white.png"
            alt="Login.jp Logo"
            width={81}
            height={81}
            className="w-full h-full object-contain"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <VideoBackground />

        {/* Rotating Glowing Logo */}
        <div className="relative z-20 text-center perspective-[225px]">
          <motion.img
            src="/icons/loginjp_hero.png"
            alt="login.jp logo"
            className="mx-auto w-64 drop-shadow-[0_0_40px_rgba(255,255,255,1)]"
            animate={{ rotateY: 360, opacity: [0.8, 1, 0.8] }}
            transition={{ rotateY: { repeat: Infinity, duration: 20, ease: 'linear' }, opacity: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
            style={{ transformOrigin: 'center', display: 'inline-block' }}
          />
        </div>
      </section>

      {/* Recent YouTube Videos Section */}
      <section className="py-12 px-6 md:px-12 bg-zinc-900/60">
        <h2 className="text-xl font-semibold mb-6"><span>Recent Videos</span><span className='ml-2'>最近の動画</span></h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.1 },
          }}
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <YouTubePlaceholder videoId={video.id} title={video.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <footer className="w-full py-6 text-center bg-black text-sm text-white/60">
        &copy; {new Date().getFullYear()} login.jp — All rights reserved.
      </footer>
    </main>
  );
}
