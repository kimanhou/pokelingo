import {
    Dispatch,
    FC,
    MouseEvent,
    ReactNode,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import useEffectSkipFirstRender from "@/hooks/useEffectSkipFirstRender";
import styles from "./BottomNotification.module.scss";

interface IBottomNotificationProps {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
    onEnter?: () => void;
    onExit?: () => void;
}

const BottomNotification: FC<IBottomNotificationProps> = (props) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [isVisibleInternal, setIsVisibleInternal] = useState(props.isVisible);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [top, setTop] = useState<number | string>("100%");

    const visibleClassName = isVisibleInternal ? styles.visible : "";
    const isTransitioningClassName = isTransitioning
        ? styles.isTransitioning
        : "";

    const onOutsideClick = () => {
        props.setIsVisible(false);
    };

    const onContentClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const onTransitionStart = () => {
            setIsTransitioning(true);
        };
        contentRef.current?.addEventListener(
            "transitionstart",
            onTransitionStart
        );

        const onTransitionEnd = () => {
            setIsTransitioning(false);
        };
        contentRef.current?.addEventListener("transitionend", onTransitionEnd);

        return () => {
            contentRef.current?.removeEventListener(
                "transitionstart",
                onTransitionStart
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
            contentRef.current?.removeEventListener(
                "transitionend",
                onTransitionEnd
            );
        };
    }, []);

    useEffectSkipFirstRender(() => {
        console.log("is visible", props.isVisible);
        setIsVisibleInternal(props.isVisible);
        setIsTransitioning(true);

        if (contentRef.current && props.isVisible) {
            setTop(`calc(100dvh - ${contentRef.current.clientHeight}px)`);
        } else if (!props.isVisible) {
            console.log("exit");
            setTop("100%");
        }
    }, [props.isVisible]);

    useEffect(() => {
        if (isVisibleInternal && !isTransitioning) {
            // On enter
            if (props.onEnter) {
                props.onEnter();
            }
        }

        if (!isVisibleInternal && !isTransitioning) {
            // On exit
            if (props.onExit) {
                props.onExit();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisibleInternal, isTransitioning]);

    return (
        <div
            className={`${styles.bottomNotification} ${visibleClassName}`}
            onClick={onOutsideClick}
        >
            <div
                className={styles.bottomNotificationContentContainer}
                onClick={onContentClick}
                style={{ top }}
            >
                {(isVisibleInternal || isTransitioning) && props.children}
            </div>

            <div
                className={`${styles.bottomNotificationContentContainer} ${styles.hidden}`}
                ref={contentRef}
            >
                {props.children}
            </div>
        </div>
    );
};

export default BottomNotification;
