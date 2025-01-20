import { useRef, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import ReactDom from "react-dom";
import styles from "./ModalDialog.module.scss";

export type ModalDialogPropsType = {
    children: ReactNode;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    closeOnClickOutside?: boolean;
    isOpen?: boolean;
    className?: string;
    withLayout?: boolean;
};

function ModalDialogComponent({
    children,
    setIsOpen,
    closeOnClickOutside = true,
    isOpen = false,
    className = "",
    withLayout = false,
}: ModalDialogPropsType) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const withLayoutClassName = withLayout ? styles.withLayout : "";

    useEffect(() => {
        if (isOpen) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [isOpen]);

    const onClick = () => {
        if (!closeOnClickOutside) {
            return;
        }
        setIsOpen(false);
    };

    return (
        <dialog
            ref={ref}
            className={`${styles.modalDialog} ${withLayoutClassName} ${className}`}
            onClick={onClick}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{ height: "100%" }}
            >
                {children}
            </div>
        </dialog>
    );
}

export default function ModalDialog({
    children,
    setIsOpen,
    closeOnClickOutside = true,
    isOpen = false,
    className = "",
    withLayout = false,
}: ModalDialogPropsType) {
    if (!isOpen) {
        return null;
    }

    return ReactDom.createPortal(
        <ModalDialogComponent
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            className={className}
            closeOnClickOutside={closeOnClickOutside}
            withLayout={withLayout}
        >
            {children}
        </ModalDialogComponent>,
        document.querySelector("body")!
    );
}
