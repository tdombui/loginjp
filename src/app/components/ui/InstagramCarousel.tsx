'use client';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

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
];

export default function InstagramCarousel() {
    const swiperRef = useRef<any>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        if (!(window as any).instgrm) {
            const script = document.createElement('script');
            script.src = 'https://www.instagram.com/embed.js';
            script.async = true;
            script.onload = () => {
                (window as any).instgrm?.Embeds?.process();
            };
            document.body.appendChild(script);
        } else {
            (window as any).instgrm?.Embeds?.process();
        }
    }, []);

    const updateScrollState = (swiper: any) => {
        setCanScrollLeft(!swiper.isBeginning);
        setCanScrollRight(!swiper.isEnd);
    };

    return (
        <div className="relative w-full px-4 py-12 z-30 bg-black/40 backdrop-blur-sm">
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
            {/* Custom login.jp header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* <Image src="/icons/thumbnail_white.png" alt="Avatar" width={32} height={32} className="rounded-full" /> */}
                    <span className="text-white font-semibold text-xl">Recent Posts 最近の投稿</span>
                </div>
                <a
                    href="https://www.instagram.com/login.jp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-blue-400 hover:underline"
                >
                    View Instagram →
                </a>
            </div>

            {/* Nav arrows */}
            {canScrollLeft && (
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm p-2 rounded-full"
                >
                    <ChevronLeft size={24} className="text-white" />
                </button>
            )}

            {canScrollRight && (
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm p-2 rounded-full"
                >
                    <ChevronRight size={24} className="text-white" />
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
                onSlideChange={updateScrollState}
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
                                    background: '#000', // outer container only
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
    );
}