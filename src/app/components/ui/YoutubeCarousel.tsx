'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';

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

export default function YouTubeCarousel() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = (swiper: any) => {
        setCanScrollLeft(!swiper.isBeginning);
        setCanScrollRight(!swiper.isEnd);
    };

    return (
        <section className="py-2 px-6 md:px-6 relative ">

            <div className="flex items-center justify-between mb-4">

                <h2 className='text-white font-semibold text-xl'>Recent Videos 最近の動画</h2>
                <a
                    href="https://www.youtube.com/@loginnjp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-blue-400 hover:underline"
                >
                    View channel →
                </a>

            </div>

            <div className="relative z-20">
                {canScrollLeft && (
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 backdrop-blur-[2px] p-2 rounded-full text-white"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <ChevronLeft size={32} />
                    </button>
                )}

                {canScrollRight && (
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 backdrop-blur-[2px] p-2 rounded-full text-white"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <ChevronRight size={32} />
                    </button>
                )}

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1.1}
                    breakpoints={{
                        640: { slidesPerView: 1.2 },
                        768: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.1 },
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => updateScrollState(swiper)}
                    onReachBeginning={() => setCanScrollLeft(false)}
                    onReachEnd={() => setCanScrollRight(false)}
                >
                    {videos.map((video) => (
                        <SwiperSlide key={video.id}>
                            <YouTubePlaceholder videoId={video.id} title={video.title} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
