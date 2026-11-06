import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 240;

const BackgroundScrollAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const frameNumber = i.toString().padStart(3, '0');
            img.src = `/card-animation/ezgif-frame-${frameNumber}.jpg`;
            
            img.onload = () => {
                loadedImages[i - 1] = img;
                loadedCount++;
                if (loadedCount === 1 || loadedCount === FRAME_COUNT) {
                    setImages([...loadedImages]);
                }
            };
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        let animationFrameId: number;

        const render = () => {
            const html = document.documentElement;
            // Use Math.max to prevent negative scrolls or division by 0
            const scrollTop = window.scrollY || html.scrollTop;
            const maxScrollTop = Math.max(0, html.scrollHeight - window.innerHeight);
            const scrollFraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
            
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.floor(scrollFraction * FRAME_COUNT))
            );

            animationFrameId = requestAnimationFrame(() => {
                const img = images[frameIndex] || images.find(i => i && i.complete);
                
                if (img && img.complete) {
                    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                         canvas.width = window.innerWidth;
                         canvas.height = window.innerHeight;
                    }

                    const canvasRatio = canvas.width / canvas.height;
                    const imgRatio = img.width / img.height;
                    
                    let drawWidth = canvas.width;
                    let drawHeight = canvas.height;
                    let offsetX = 0;
                    let offsetY = 0;

                    if (canvasRatio > imgRatio) {
                        drawHeight = canvas.width / imgRatio;
                        offsetY = (canvas.height - drawHeight) / 2;
                    } else {
                        drawWidth = canvas.height * imgRatio;
                        offsetX = (canvas.width - drawWidth) / 2;
                    }

                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }
            });
        };

        window.addEventListener('scroll', render, { passive: true });
        window.addEventListener('resize', render, { passive: true });
        
        // Initial render
        render();

        return () => {
            window.removeEventListener('scroll', render);
            window.removeEventListener('resize', render);
            cancelAnimationFrame(animationFrameId);
        };
    }, [images]);

    return (
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#10141f] opacity-85 z-10 pointer-events-none"></div>
        </div>
    );
};

export default BackgroundScrollAnimation;
