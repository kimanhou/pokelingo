import { DeviceType } from "@/ts/enums";
import { useState, useEffect, useCallback } from "react";

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);
    const updateMatches = useCallback(() => {
        setMatches(window.matchMedia(query).matches);
    }, [query]);
    useEffect(() => {
        const mediaMatcher = window.matchMedia(query);
        setMatches(mediaMatcher.matches);
        mediaMatcher.addListener(updateMatches);
        return () => mediaMatcher.removeListener(updateMatches);
    }, [query, updateMatches]);
    return matches;
};

export const useIsMobile = () => {
    return useMediaQuery("screen and (max-width: 768px)");
};

export const useIsSmallDesktop = () => {
    return useMediaQuery(
        "screen and (max-width: 1170px) and (min-width: 768px)"
    );
};

export const useIsLargeDesktop = () => {
    return useMediaQuery("screen and (min-width: 1441px)");
};

export const useDeviceType = () => {
    if (useIsMobile()) {
        return DeviceType.MOBILE;
    }
    if (useIsSmallDesktop()) {
        return DeviceType.SMALL_DESKTOP;
    }
    if (useIsLargeDesktop()) {
        return DeviceType.LARGE_DESKTOP;
    }
    return DeviceType.DESKTOP;
};
