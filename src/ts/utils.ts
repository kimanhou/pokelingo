import { Avatar } from "@/types";
import { AvatarTypeColors } from "@/ts/enums";

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

export const getMainColor = (avatar: Avatar) => {
    const mainType =
        avatar.types[0]?.toUpperCase() as keyof typeof AvatarTypeColors;
    return AvatarTypeColors[mainType] ?? "var(--color-medium-grey)";
};
