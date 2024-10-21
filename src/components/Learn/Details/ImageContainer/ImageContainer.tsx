import { FC, useEffect, useState } from "react";
import Button from "@/components/common/Button/Button";
import SearchSmallDesktop from "@/components/Learn/Search/SearchSmallDesktop";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { DeviceType } from "@/ts/enums";
import styles from "./ImageContainer.module.scss";

interface IImageContainerProps {
    mainColor: string;
    name: string;
    avatarId: number;
    deviceType: DeviceType;
    search?: string;
    setSearch?: (search: string) => void;
    randomize?: () => void;
    isCreatureCard?: boolean;
}

const ImageContainer: FC<IImageContainerProps> = (
    props: IImageContainerProps
) => {
    const [marginTop, setMarginTop] = useState("100%");

    const isSmallDesktop = props.deviceType === DeviceType.SMALL_DESKTOP;
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
                backgroundColor: props.mainColor,
                marginTop: isSmallDesktop ? 0 : marginTop,
            }}
        >
            {!props.isCreatureCard && (
                <div>
                    <h2 className={styles.avatarName}>{props.name}</h2>
                    {props.avatarId > 0 && (
                        <h3 className={styles.avatarId}>
                            #{props.avatarId.toString().padStart(3, "0")}
                        </h3>
                    )}
                </div>
            )}
            {isSmallDesktop && (
                <div className={styles.randomizeButtonContainer}>
                    <Button
                        onClick={props.randomize || (() => {})}
                        text="Randomize"
                        icon={faShuffle}
                        backgroundColor="rgba(255, 255, 255, 0.3)"
                        shrink
                    />
                    <SearchSmallDesktop
                        search={props.search || ""}
                        setSearch={props.setSearch || (() => {})}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageContainer;
