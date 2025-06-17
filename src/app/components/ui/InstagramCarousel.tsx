'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';

declare global {
    interface Window {
        instgrm?: {
            Embeds?: {
                process?: () => void;
            };
        };
    }
}

const posts = [
    'https://www.instagram.com/p/DGNn09nzWCE/',
    'https://www.instagram.com/reel/DGIS7WLyvR-/',
    'https://www.instagram.com/p/DGdd7NVzmhm/',
    'https://www.instagram.com/p/DK4LMbyTlFS/',
    'https://www.instagram.com/reel/DKzKizSzGwL/',
    'https://www.instagram.com/reel/DKmMGheTCAX/',
    'https://www.instagram.com/p/DKSPOckzIPU/',
    'https://www.instagram.com/reel/DKCGcpezhWJ',
    'https://www.instagram.com/reel/DJytlFBzw87/',
    'https://www.instagram.com/reel/DJBs3f5TA3I/',
    'https://www.instagram.com/p/DIqr2s9zTkW/',
    'https://www.instagram.com/reel/DITwF6YzmIy/',
    'https://www.instagram.com/reel/DIQy_q0zzY0/',
    'https://www.instagram.com/p/DILm8Pnz7Dh/',
    'https://www.instagram.com/reel/DHYTtoYTkit/',
    'https://www.instagram.com/reel/DHGKZfiTQm8/',
    'https://www.instagram.com/reel/DGfmPhzTutE/',
    'https://www.instagram.com/reel/DGXwjo1Tgrh/',
    'https://www.instagram.com/reel/DGSnpVUy_tm/',
];

export default function InstagramCarousel() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        if (!window.instgrm) {
            const script = document.createElement('script');
            script.src = 'https://www.instagram.com/embed.js';
            script.async = true;
            script.onload = () => {
                window.instgrm?.Embeds?.process?.();
            };
            document.body.appendChild(script);
        } else {
            window.instgrm?.Embeds?.process?.();
        }
    }, []);

    const updateScrollState = (swiper: SwiperType) => {
        setCanScrollLeft(!swiper.isBeginning);
        setCanScrollRight(!swiper.isEnd);
    };

    return (
        <div className="relative w-full px-6 md:px-10 pr-12  py-12 z-30">


            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-white font-semibold text-xl font-mono">Recent Posts</span>
                    {/* 最近の投稿 */}
                </div>
                <a
                    href="https://www.instagram.com/login.jp_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline font-mono"
                >
                    View Instagram →
                </a>
            </div>
            <div className="relative z-20">
                {canScrollLeft && (
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 backdrop-blur-[2px] p-2 rounded-full text-white"
                    >
                        <ChevronLeft size={32} />
                    </button>
                )}

                {canScrollRight && (
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 backdrop-blur-[2px] p-2 rounded-full text-white"
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
                    {posts.map((url, i) => (
                        <SwiperSlide key={i}>
                            <div className="flex justify-center">
                                <blockquote
                                    className="instagram-media"
                                    data-instgrm-permalink={url}
                                    data-instgrm-version="14"
                                    style={{
                                        background: '#000',
                                        border: 0,
                                        margin: '0 auto',
                                        maxWidth: '400px',
                                        width: '100%',
                                        minWidth: '220px',
                                    }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );
}
