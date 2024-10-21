import { FC, useEffect, useState } from "react";
import Button from "@/components/common/Button/Button";
import SearchSmallDesktop from "@/components/Learn/Search/SearchSmallDesktop";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { DeviceType } from "@/ts/enums";
import { useDeviceType } from "@/hooks/useIsMobile";
import styles from "./ImageContainer.module.scss";

interface IImageContainerProps {
    mainColor: string;
    name: string;
    avatarId: number;
    search?: string;
    setSearch?: (search: string) => void;
    randomize?: () => void;
    isCreatureCard?: boolean;
}

const ImageContainer: FC<IImageContainerProps> = ({
    mainColor,
    name,
    avatarId,
    search = "",
    setSearch = () => {},
    randomize = () => {},
    isCreatureCard,
}: IImageContainerProps) => {
    const deviceType = useDeviceType();
    const [marginTop, setMarginTop] = useState("100%");

    const isSmallDesktop = deviceType === DeviceType.SMALL_DESKTOP;
    const smallDesktopClassName = isSmallDesktop ? styles.smallDesktop : "";

    useEffect(() => {
        setTimeout(() => {
            setMarginTop("0");
        }, 200); // transition duration of side sheet from bottom
    }, []);

    return (
        <div
            className={`${styles.imageContainer} ${smallDesktopClassName}`}
            style={{
                backgroundColor: mainColor,
                marginTop: isSmallDesktop ? 0 : marginTop,
            }}
        >
            {!isCreatureCard && (
                <div>
                    <h2 className={styles.avatarName}>{name}</h2>
                    {avatarId > 0 && (
                        <h3 className={styles.avatarId}>
                            #{avatarId.toString().padStart(3, "0")}
                        </h3>
                    )}
                </div>
            )}
            {isSmallDesktop && (
                <div className={styles.randomizeButtonContainer}>
                    <Button
                        onClick={randomize}
                        text="Randomize"
                        icon={faShuffle}
                        backgroundColor="rgba(255, 255, 255, 0.3)"
                        shrink
                    />
                    <SearchSmallDesktop search={search} setSearch={setSearch} />
                </div>
            )}
        </div>
    );
};

export default ImageContainer;
