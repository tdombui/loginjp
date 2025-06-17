// utils/MediaManager.ts
let currentMedia: HTMLMediaElement | null = null;

export function registerMedia(media: HTMLMediaElement) {
    if (currentMedia && currentMedia !== media && !currentMedia.paused) {
        currentMedia.pause();
    }
    currentMedia = media;
}
