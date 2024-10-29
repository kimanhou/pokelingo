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
    contentHeight: number;
    onEnter?: () => void;
    onExit?: () => void;
}

const BottomNotification: FC<IBottomNotificationProps> = (props) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [isVisibleInternal, setIsVisibleInternal] = useState(props.isVisible);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const visibleClassName = isVisibleInternal ? styles.visible : "";
    const isTransitioningClassName = isTransitioning
        ? styles.isTransitioning
        : "";

    const onOutsideClick = () => {
        props.setIsVisible((t) => !t);
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
        setIsVisibleInternal(props.isVisible);
        setIsTransitioning(true);
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

    useEffect(() => {
        console.log("content height", props.contentHeight);
    }, [props.contentHeight]);

    return (
        <div
            className={`${styles.bottomNotification} ${visibleClassName} ${isTransitioningClassName}`}
            onClick={onOutsideClick}
        >
            <div
                className={styles.bottomNotificationContentContainer}
                onClick={onContentClick}
                ref={contentRef}
            >
                {(isVisibleInternal || isTransitioning) && props.children}
            </div>
        </div>
    );
};

export default BottomNotification;
