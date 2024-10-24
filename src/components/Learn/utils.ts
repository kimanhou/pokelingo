export const getNumberOfCreaturesPerLine = (windowWidth: number) => {
    if (windowWidth > 823) {
        return 8;
    }
    if (windowWidth > 727) {
        return 7;
    }
    if (windowWidth > 631) {
        return 6;
    }
    if (windowWidth > 535) {
        return 5;
    }
    if (windowWidth > 439) {
        return 4;
    }
    return 3;
};
