import { useRef, useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────
   Badge — píldora de estado con variantes de color
───────────────────────────────────────────────────── */
const BADGE_VARIANTS = {
    default: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export function Badge({ children, variant = 'default', className = '' }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border
        ${BADGE_VARIANTS[variant]} ${className}`}
        >
            {children}
        </span>
    );
}

/* ─────────────────────────────────────────────────────
   GlowCard — tarjeta con efecto tilt 3-D en hover
───────────────────────────────────────────────────── */
export function GlowCard({ children, className = '', highlight = false, onClick }) {
    const cardRef = useRef(null);
    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y - rect.height / 2) / 12;
        const rotateY = (rect.width / 2 - x) / 12;
        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`,
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)',
            transition: 'transform 0.3s ease',
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={style}
            className={`relative bg-card rounded-card overflow-hidden tilt-card border
        ${highlight
                    ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                    : 'border-subtle'}
        ${className}`}
        >
            {/* shimmer interior */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   StatCard — contador animado con etiqueta
   Activa la animación con IntersectionObserver
───────────────────────────────────────────────────── */
export function StatCard({ target, suffix = '', label, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();

                let start = 0;
                const increment = target / (duration / 16);
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= target) {
                        setCount(target);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return (
        <div
            ref={ref}
            className="bg-card border border-subtle rounded-card p-4 text-center"
        >
            <div className="text-3xl font-medium text-blue-400 tabular-nums">
                {count}{suffix}
            </div>
            {label && (
                <div className="text-xs font-normal text-muted mt-1">{label}</div>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────────────
   Typewriter — texto que se escribe carácter a carácter
───────────────────────────────────────────────────── */
export function Typewriter({ text, speed = 80 }) {
    const [displayed, setDisplayed] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index >= text.length) return;
        const timeout = setTimeout(() => {
            setDisplayed((prev) => prev + text.charAt(index));
            setIndex((i) => i + 1);
        }, speed);
        return () => clearTimeout(timeout);
    }, [index, text, speed]);

    return (
        <span>
            {displayed}
            <span className="typing-cursor" />
        </span>
    );
}