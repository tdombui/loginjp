'use client';

import React from 'react';
import ReactPlayer from 'react-player/youtube';

export default function VideoBackground() {
    return (
        <div className="fixed inset-0 z-0 w-screen h-screen overflow-hidden">
            <ReactPlayer
                url="https://www.youtube.com/watch?v=pJ8EyNFg9Dk"
                playing
                muted
                loop
                controls={false}
                width="100%"
                height="100%"
                config={{
                    youtube: {
                        playerVars: {
                            start: 27,
                            autoplay: 1,
                            mute: 1,
                            controls: 0,
                            modestbranding: 1,
                            rel: 0,
                            showinfo: 0,
                            playsinline: 1,
                            fs: 0,
                            disablekb: 1,
                            iv_load_policy: 3,
                            playlist: 'pJ8EyNFg9Dk',
                        },
                    },
                }}
                className="pointer-events-none"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '120%',
                    height: '120%',
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'cover',
                }}
            />
            <div className="absolute inset-0 bg-black/80 z-10" />
        </div>
    );
}
