import {
    FC,
    useEffect,
    useState,
    useRef,
    Dispatch,
    SetStateAction,
} from "react";
import TypeTag from "@/components/Learn/Details/Specs/TypeTag";
import CreatureName from "@/components/Learn/Details/CreatureName/CreatureName";
import { AvatarTypeColors, DeviceType } from "@/ts/enums";
import styles from "./AvatarSpecs.module.scss";

interface IAvatarSpecsProps {
    types: string[];
    description: string;
    deviceType?: DeviceType;
    setAvatarSpecsHeight?: Dispatch<SetStateAction<number | undefined>>;
    isCreatureCard?: boolean;
    name?: string;
}

const AvatarSpecs: FC<IAvatarSpecsProps> = (props: IAvatarSpecsProps) => {
    const avatarSpecsRef = useRef<HTMLDivElement>(null);

    const [marginTop, setMarginTop] = useState("100%");

    const isSmallDesktop = props.deviceType === DeviceType.SMALL_DESKTOP;
    const smallDesktopClassName = isSmallDesktop ? styles.smallDesktop : "";
    const isMobile = props.deviceType === DeviceType.MOBILE;
    const mobileClassName = isMobile ? styles.mobile : "";

    useEffect(() => {
        setTimeout(() => {
            setMarginTop("-40px");
        }, 400); // transition duration of side sheet from bottom + transition duration of Image Container

        if (avatarSpecsRef.current && props.setAvatarSpecsHeight) {
            props.setAvatarSpecsHeight(avatarSpecsRef.current.clientHeight);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={`${styles.avatarSpecs} ${smallDesktopClassName} ${mobileClassName}`}
            style={{ marginTop: isSmallDesktop ? "24px" : marginTop }}
            ref={avatarSpecsRef}
        >
            {!props.isCreatureCard && (
                <div className={styles.typeTags}>
                    {props.types.map((t) => (
                        <TypeTag
                            key={t}
                            type={t}
                            color={
                                AvatarTypeColors[
                                    t.toUpperCase() as keyof typeof AvatarTypeColors
                                ] ?? "var(--color-grey)"
                            }
                            isSmallDesktop={isSmallDesktop}
                        />
                    ))}
                </div>
            )}
            {props.isCreatureCard && props.name && (
                <CreatureName name={props.name} isPositionRelative />
            )}
            <p className={styles.description}>{props.description}</p>
        </div>
    );
};

export default AvatarSpecs;
