import { RefObject, useEffect, useState } from "react";

export default function useInViewport<T extends HTMLElement>(
    ref: RefObject<T>,
    options?: IntersectionObserverInit
) {
    const [isInViewport, setIsInViewport] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInViewport(entry.isIntersecting);
        }, options);

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [options, ref]);

    return isInViewport;
}
