import { AvatarTypeColors, DeviceType } from "@/ts/enums";
import Creature from "@/model/creature/creature";

export const getValueOrDefault = (s: string | null | undefined) => {
    if (!s) {
        return "";
    }

    return s;
};

export const scrollTo = ({ elementId }: { elementId: string }) => {
    const myElement = document.getElementById(elementId);
    if (!myElement) return;

    myElement.scrollIntoView();
};

export const scrollToCreatureIndex = ({
    creatureIndex,
}: {
    creatureIndex: number;
}) => {
    scrollTo({ elementId: `avatar-${creatureIndex + 1}` });
};

export const formatName = (name: string) => {
    const formatted = name
        // eslint-disable-next-line
        .replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        // eslint-disable-next-line
        .replaceAll(/'/g, "")
        // eslint-disable-next-line
        .replaceAll(/\s+/g, "-")
        .toLocaleLowerCase();

    return formatted;
};

export const isIterable = (obj: any) => {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === "function";
};

export const capitalizeFirstChar = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getMainColor = (creature: Creature | null) => {
    if (creature == null) return "var(--color-medium-grey)";
    const mainType = creature
        .getTypes()[0]
        ?.toUpperCase() as keyof typeof AvatarTypeColors;
    return AvatarTypeColors[mainType] ?? "var(--color-medium-grey)";
};

export const isMediumDesktopOrBigger = (deviceType: DeviceType) => {
    return (
        deviceType === DeviceType.DESKTOP ||
        deviceType === DeviceType.LARGE_DESKTOP
    );
};

export const isMobileCreatureCard = ({
    deviceType,
    isCreatureCard,
}: {
    deviceType: DeviceType;
    isCreatureCard: boolean;
}) => {
    return deviceType === DeviceType.MOBILE && isCreatureCard;
};

export const isSafariNotMobile = (deviceType: DeviceType) => {
    return (
        (navigator.vendor &&
            navigator.vendor.indexOf("Apple") > -1 &&
            navigator.userAgent &&
            navigator.userAgent.indexOf("CriOS") == -1 &&
            navigator.userAgent.indexOf("FxiOS") == -1 &&
            deviceType !== DeviceType.MOBILE) ||
        false
    );
};
