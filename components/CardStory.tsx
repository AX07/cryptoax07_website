import React, { useEffect, useRef, useState } from 'react';
import Button from './ui/Button';
import { PhoneIcon, CheckCircleIcon, UserIcon, BanknotesIcon, WalletIcon, ChartBarSquareIcon, CubeTransparentIcon } from './icons/Icons';

const LIST_ICONS = [UserIcon, BanknotesIcon, WalletIcon, ChartBarSquareIcon, CubeTransparentIcon];
import { useLanguage } from '../hooks/useLanguage';

const FRAME_COUNT = 240;
const frameSrc = (i: number) => `/card-animation/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;

// Scroll windows (0..1 of the pinned section)
const HERO_END = 0.1;
const BEAT_CENTERS = [0.19, 0.325, 0.46, 0.595, 0.73];
const BEAT_HALF = 0.062;
const FINAL_START = 0.855;
const FADE = 0.028;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
// Trapezoid: fade in, hold, fade out
const windowOpacity = (p: number, start: number, end: number) =>
    clamp((p - start) / FADE) * clamp((end - p) / FADE);

interface Beat { tag: string; title: string; body?: string; quotes?: string[]; list?: { t: string; d: string }[] }

interface CardStoryProps {
    onStart: () => void;
    onOpenBookingModal: () => void;
}

const CardStory: React.FC<CardStoryProps> = ({ onStart, onOpenBookingModal }) => {
    const { t } = useLanguage();
    const beats: Beat[] = t('cardStory.beats');

    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const finalRef = useRef<HTMLDivElement>(null);
    const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
    const railRef = useRef<HTMLDivElement>(null);
    const scrollCueRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(0);
    const [reduced, setReduced] = useState(false);

    const imagesRef = useRef<(HTMLImageElement | undefined)[]>(new Array(FRAME_COUNT));

    useEffect(() => {
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    // Preload frames: first frame immediately, then the rest in order
    useEffect(() => {
        let cancelled = false;
        let count = 0;
        const load = (i: number) => {
            const img = new Image();
            img.decoding = 'async';
            img.onload = () => {
                if (cancelled) return;
                imagesRef.current[i] = img;
                count++;
                if (count === 1 || count % 20 === 0 || count === FRAME_COUNT) setLoaded(count);
            };
            img.src = frameSrc(i);
        };
        load(0);
        // stagger a little so the first paint isn't blocked
        const timer = window.setTimeout(() => {
            for (let i = 1; i < FRAME_COUNT; i++) load(i);
        }, 50);
        return () => { cancelled = true; window.clearTimeout(timer); };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let raf = 0;
        let target = 0;
        let current = 0;
        let lastDrawn = -1;
        let w = 0, h = 0;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            lastDrawn = -1;
        };

        const draw = (frame: number, fp: number) => {
            // nearest loaded frame at or before the requested one
            let f = frame;
            while (f > 0 && !imagesRef.current[f]) f--;
            const img = imagesRef.current[f];
            if (!img) return;
            // On desktop the card shrinks and lifts as it re-forms, leaving room for the closing copy
            const end = clamp((fp - 0.78) / 0.2);
            const shrink = end * end * (3 - 2 * end);
            const key = f * 1000 + Math.round(shrink * 100);
            if (key === lastDrawn) return;
            lastDrawn = key;
            const ir = img.naturalWidth / img.naturalHeight;
            const portrait = w / h < 1;
            let dw: number, dh: number;
            if (portrait) {
                dw = w * 1.7; dh = dw / ir; // zoom in so the card reads on phones
            } else {
                const cover = Math.max(w / img.naturalWidth, h / img.naturalHeight);
                dw = img.naturalWidth * cover * (0.8 - 0.14 * shrink);
                dh = img.naturalHeight * cover * (0.8 - 0.14 * shrink);
            }
            const cx = w / 2;
            const cy = portrait ? h * 0.34 : h * (0.4 - 0.05 * shrink);
            ctx.fillStyle = '#05060b';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
        };

        const update = (p: number) => {
            // hero
            if (heroRef.current) {
                const o = 1 - clamp((p - 0.045) / (HERO_END - 0.045));
                heroRef.current.style.opacity = String(o);
                heroRef.current.style.transform = `translate3d(0, ${(1 - o) * -30}px, 0)`;
                heroRef.current.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
            }
            if (scrollCueRef.current) scrollCueRef.current.style.opacity = String(clamp(1 - p / 0.04));
            // beats
            BEAT_CENTERS.forEach((c, i) => {
                const el = beatRefs.current[i];
                if (!el) return;
                const o = windowOpacity(p, c - BEAT_HALF, c + BEAT_HALF);
                const drift = clamp((p - c) / BEAT_HALF, -1, 1) * -28;
                el.style.opacity = String(o);
                el.style.transform = `translate3d(0, ${drift}px, 0)`;
                el.style.visibility = o > 0.01 ? 'visible' : 'hidden';
            });
            // final
            if (finalRef.current) {
                const o = clamp((p - FINAL_START) / FADE);
                finalRef.current.style.opacity = String(o);
                finalRef.current.style.transform = `translate3d(0, ${(1 - o) * 30}px, 0)`;
                finalRef.current.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
                finalRef.current.style.visibility = o > 0.01 ? 'visible' : 'hidden';
            }
            if (railRef.current) railRef.current.style.setProperty('--p', String(p));
        };

        const tick = () => {
            const rect = section.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            target = total > 0 ? clamp(-rect.top / total) : 0;
            current += (target - current) * 0.14;
            if (Math.abs(target - current) < 0.0004) current = target;
            const frameP = clamp((current - 0.015) / 0.97);
            draw(Math.round(frameP * (FRAME_COUNT - 1)), frameP);
            update(current);
            raf = requestAnimationFrame(tick);
        };

        resize();
        window.addEventListener('resize', resize);
        raf = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(raf);
        };
    }, [reduced]);

    const ctas = (
        <div className="mt-7 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button onClick={onOpenBookingModal} className="text-base md:text-lg py-3 px-7 flex items-center gap-2 transition-transform duration-200 hover:scale-105 btn-glow-blue btn-blue-darken">
                <PhoneIcon className="h-5 w-5" />
                {t('cardStory.ctaBook')}
            </Button>
            <button onClick={onStart} className="font-bold py-3 px-7 rounded-lg transition-all duration-200 text-base md:text-lg flex items-center gap-2 bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 btn-glow-orange">
                <CheckCircleIcon className="h-5 w-5" />
                {t('cardStory.ctaStart')}
            </button>
        </div>
    );

    // Reduced motion: no pinned scrubbing, just a still card and stacked copy
    if (reduced) {
        return (
            <section className="py-16 container mx-auto px-4 text-center">
                <img src={frameSrc(0)} alt="CryptoAX07 Tailored Education card" className="mx-auto w-full max-w-xl rounded-2xl" />
                <p className="mt-8 text-brand-primary uppercase tracking-[0.3em] text-xs font-semibold">{t('cardStory.eyebrow')}</p>
                <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">{t('cardStory.heroTitle')}</h1>
                <p className="mt-4 text-lg text-brand-text-secondary max-w-2xl mx-auto">{t('cardStory.heroSub')}</p>
                <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto text-left">
                    {beats.map((b, i) => (
                        <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <p className="text-xs uppercase tracking-[0.25em] text-brand-primary">{b.tag}</p>
                            <h3 className="mt-2 text-2xl font-bold text-white">{b.title}</h3>
                            <p className="mt-2 text-brand-text-secondary">{b.body}</p>
                        </div>
                    ))}
                </div>
                {ctas}
            </section>
        );
    }

    return (
        <div ref={sectionRef} className="relative" style={{ height: '1100vh' }} aria-label="CryptoAX07 story">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#05060b]">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
                {/* Vignette keeps text legible and edges clean */}
                <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ background: 'radial-gradient(ellipse 46% 42% at 50% 40%, rgba(5,6,11,0) 62%, #05060b 100%)' }} />
                <div className="absolute inset-0 pointer-events-none md:hidden" style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(5,6,11,0) 35%, rgba(5,6,11,0.85) 100%)' }} />
                <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #10141F, rgba(16,20,31,0))' }} />

                {/* Hero copy */}
                <div ref={heroRef} className="absolute inset-x-0 bottom-0 px-4 pb-14 md:pb-16 text-center will-change-transform">
                    <p className="text-brand-primary uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold">{t('cardStory.eyebrow')}</p>
                    <h1 className="mt-3 text-[clamp(1.5rem,5.2vh,3.75rem)] font-bold text-white max-w-4xl mx-auto leading-tight">{t('cardStory.heroTitle')}</h1>
                    <p className="mt-3 text-sm md:text-lg text-brand-text-secondary max-w-2xl mx-auto">{t('cardStory.heroSub')}</p>
                </div>
                <div ref={scrollCueRef} className="absolute bottom-3 inset-x-0 flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-brand-text-secondary pointer-events-none">
                    <span>{t('cardStory.scroll')}</span>
                    <span className="block h-6 w-px bg-gradient-to-b from-brand-primary to-transparent animate-subtle-bounce" />
                </div>

                {/* Story beats */}
                {beats.slice(0, 5).map((b, i) => (
                    <div
                        key={i}
                        ref={el => { beatRefs.current[i] = el; }}
                        style={{ opacity: 0, visibility: 'hidden' }}
                        className={`absolute inset-x-4 bottom-6 md:top-0 md:bottom-0 md:flex md:items-center md:w-[30rem] will-change-transform pointer-events-none ${i % 2 === 0 ? 'md:left-[5vw] md:right-auto' : 'md:right-[5vw] md:left-auto'}`}
                    >
                        <div className="w-full rounded-2xl border border-white/10 bg-[#0b0e17]/75 backdrop-blur-md p-5 md:p-7 shadow-2xl pointer-events-auto">
                            <p className="text-brand-primary text-[11px] uppercase tracking-[0.28em] font-semibold">{b.tag}</p>
                            <h2 className="mt-2 text-xl md:text-3xl font-bold text-white leading-tight">{b.title}</h2>
                            {b.body && <p className="mt-3 text-sm md:text-base text-brand-text-secondary leading-relaxed">{b.body}</p>}
                            {b.quotes && (
                                <ul className="mt-4 space-y-3">
                                    {b.quotes.map((q, qi) => (
                                        <li key={qi} className="border-l-2 border-brand-orange pl-3 text-sm md:text-base italic text-brand-text">{q}</li>
                                    ))}
                                </ul>
                            )}
                            {b.list && (
                                <ul className="mt-3 space-y-2 md:space-y-3">
                                    {b.list.map((it, li) => {
                                        const Icon = LIST_ICONS[li % LIST_ICONS.length];
                                        return (
                                            <li key={li} className="flex items-start gap-3">
                                                <Icon className="h-5 w-5 mt-0.5 text-brand-secondary flex-shrink-0" />
                                                <div className="text-sm leading-snug">
                                                    <strong className="text-white">{it.t}</strong>
                                                    <span className="hidden md:inline text-brand-text-secondary"> — {it.d}</span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}

                {/* Final: card re-forms */}
                <div ref={finalRef} style={{ opacity: 0, visibility: 'hidden' }} className="absolute inset-x-0 bottom-0 px-4 pb-14 md:pb-16 text-center will-change-transform">
                    <p className="text-brand-primary text-[11px] uppercase tracking-[0.28em] font-semibold">{beats[5]?.tag}</p>
                    <h2 className="mt-2 text-3xl md:text-5xl font-bold text-white">{beats[5]?.title}</h2>
                    <p className="mt-3 text-sm md:text-lg text-brand-text-secondary max-w-2xl mx-auto">{beats[5]?.body}</p>
                    {ctas}
                </div>

                {/* Progress rail */}
                <div ref={railRef} className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 h-32 w-px bg-white/15 hidden sm:block" style={{ ['--p' as any]: 0 }}>
                    <div className="absolute inset-x-0 top-0 bg-brand-primary origin-top" style={{ height: '100%', transform: 'scaleY(var(--p))' }} />
                </div>

                {loaded < FRAME_COUNT && (
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-brand-text-secondary">
                        {t('cardStory.loading')} · {Math.round((loaded / FRAME_COUNT) * 100)}%
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardStory;
