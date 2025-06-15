'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const TOTAL_FRAMES = 11; // 0–10 inclusive
const INITIAL_FRAME = 5;
const SENSITIVITY = 20; // Pixels to drag per frame change

export default function KnobViewer({ onChange }: { onChange?: (volume: number) => void }) {
    const [frameIndex, setFrameIndex] = useState(INITIAL_FRAME);
    const isDragging = useRef(false);
    const lastY = useRef(0);
    const accumulatedDelta = useRef(0);

    const updateFrameByDelta = (deltaY: number) => {
        accumulatedDelta.current += deltaY;

        while (accumulatedDelta.current <= -SENSITIVITY) {
            setFrameIndex((prev) => {
                const next = Math.min(prev + 1, TOTAL_FRAMES - 1);
                return next;
            });
            accumulatedDelta.current += SENSITIVITY;
        }

        while (accumulatedDelta.current >= SENSITIVITY) {
            setFrameIndex((prev) => {
                const next = Math.max(prev - 1, 0);
                return next;
            });
            accumulatedDelta.current -= SENSITIVITY;
        }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        isDragging.current = true;
        lastY.current = e.clientY;
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        const deltaY = lastY.current - e.clientY;
        updateFrameByDelta(deltaY);
        lastY.current = e.clientY;
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        isDragging.current = true;
        lastY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        const deltaY = lastY.current - e.touches[0].clientY;
        updateFrameByDelta(deltaY);
        lastY.current = e.touches[0].clientY;
    };

    const stopDragging = () => {
        isDragging.current = false;
        accumulatedDelta.current = 0;
    };

    useEffect(() => {
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);
        return () => {
            document.removeEventListener('mouseup', stopDragging);
            document.removeEventListener('touchend', stopDragging);
        };
    }, []);

    // Emit volume to parent (normalized 0–1)
    useEffect(() => {
        if (onChange) {
            const normalized = frameIndex / (TOTAL_FRAMES - 1);
            onChange(normalized);
        }
    }, [frameIndex, onChange]);

    return (
        <div
            className="w-24 h-24 relative select-none touch-none cursor-ns-resize"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            {/* Base static plate */}
            <Image
                src="/knob_frames/pdj_base.webp"
                alt="Knob base"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                width={24}
                height={24}
                quality={100}
                draggable={false}
                unoptimized

            />
            {/* Dynamic knob frame */}
            <Image
                src={`/knob_frames/pdj_knob-${String(frameIndex).padStart(2, '0')}.webp`}
                alt={`Knob frame ${frameIndex}`}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                width={24}
                height={24}
                quality={100}
                draggable={false}
                unoptimized

            />
        </div>
    );
}
