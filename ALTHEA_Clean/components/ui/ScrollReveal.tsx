'use client';
import { useRef, useEffect, useState, ReactNode } from 'react';

type ScrollRevealProps = {
    children: ReactNode;
    threshold?: number;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: string;
    className?: string;
    blur?: boolean;
    scale?: boolean;
};

export default function ScrollReveal({
    children,
    threshold = 0.1,
    delay = 0,
    direction = 'up',
    duration = '1s',
    className = '',
    blur = true,
    scale = false
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold });

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [threshold]);

    const getTransform = () => {
        if (isVisible) return 'none'; // Reset to natural state

        let transform = '';
        if (scale) transform += 'scale(0.95) ';

        switch (direction) {
            case 'up': transform += 'translateY(40px)'; break;
            case 'down': transform += 'translateY(-40px)'; break;
            case 'left': transform += 'translateX(40px)'; break;
            case 'right': transform += 'translateX(-40px)'; break;
            default: break;
        }

        return transform;
    };

    const getFilter = () => {
        if (isVisible) return 'none';
        return blur ? 'blur(10px)' : 'none';
    };

    const getOpacity = () => {
        return isVisible ? 1 : 0;
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: getOpacity(),
                transform: getTransform(),
                filter: getFilter(),
                transition: `
                    opacity ${duration} cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s,
                    transform ${duration} cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s,
                    filter ${duration} cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s
                `,
                willChange: 'opacity, transform, filter'
            }}
        >
            {children}
        </div>
    );
}
