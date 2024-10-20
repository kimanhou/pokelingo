import { FC, useEffect, useState } from "react";
import Button from "@/components/common/Button/Button";
import SearchSmallDesktop from "@/components/EditAvatar/Search/SearchSmallDesktop";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import styles from "./ImageContainer.module.scss";
import IconButton from "@/components/common/IconButton/IconButton";

interface IImageContainerProps {
    mainColor: string;
    name: string;
    avatarId: number;
    search?: string;
    setSearch?: (search: string) => void;
    isSmallDesktop?: boolean;
    isMobile?: boolean;
    randomize?: () => void;
    isCreatureCard?: boolean;
}

const ImageContainer: FC<IImageContainerProps> = (
    props: IImageContainerProps
) => {
    const [marginTop, setMarginTop] = useState("100%");

    const smallDesktopClassName = props.isSmallDesktop
        ? styles.smallDesktop
        : "";

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
                marginTop: props.isSmallDesktop ? 0 : marginTop,
            }}
        >
            <div>
                <h2 className={styles.avatarName}>{props.name}</h2>
                {props.avatarId > 0 && (
                    <h3 className={styles.avatarId}>
                        #{props.avatarId.toString().padStart(3, "0")}
                    </h3>
                )}
            </div>
            {props.isMobile && !props.isCreatureCard && (
                <div className={styles.randomizeButtonContainer}>
                    <IconButton
                        onClick={props.randomize || (() => {})}
                        icon={faShuffle}
                    />
                </div>
            )}
            {props.isSmallDesktop && !props.isMobile && (
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
