'use client'

import React from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player/youtube';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Replace with login.jp video
            playing
            loop
            muted
            controls={false}
            width="100%"
            height="100%"
            className="pointer-events-none object-cover"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />
        </div>

        {/* Rotating Glowing Logo */}
        <div className="relative z-20 text-center perspective-[1000px]">
          <motion.h1
            className="text-6xl md:text-8xl font-bold font-mono text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            animate={{ rotateY: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            style={{
              transformOrigin: 'center',
              display: 'inline-block',
            }}
          >
            login.jp
          </motion.h1>
        </div>

      </section>

      {/* Recent YouTube Videos Section */}
      <section className="py-12 px-6 md:px-12 bg-zinc-900">
        <h2 className="text-3xl font-semibold mb-6">Recent Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/VIDEO_ID_1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/VIDEO_ID_2"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/VIDEO_ID_3"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
