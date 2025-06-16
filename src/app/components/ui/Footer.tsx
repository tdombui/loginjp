'use client';

import { Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full px-4 py-6  text-white text-md flex items-center justify-between  backdrop-blur-[0.5px] font-mono">
            <span className="opacity-80">
                © {year} LOGIN.JP
            </span>
            <span className="text-xs opacity-80">archiving the Japanese experience through music</span>
            <div className="flex gap-4 items-center">
                <Link
                    href="https://www.instagram.com/login.jp_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors"
                    aria-label="Instagram"
                >
                    <Instagram size={18} />
                </Link>
                <Link
                    href="https://www.youtube.com/@loginnjp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500 transition-colors"
                    aria-label="YouTube"
                >
                    <Youtube size={18} />
                </Link>
            </div>
        </footer>
    );
}
