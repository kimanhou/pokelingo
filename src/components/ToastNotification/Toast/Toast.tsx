import { useEffect, useRef, useState } from "react";
import { ToastNotificationEnum } from "@/components/ToastNotification/enum";
import {
  AUTO_CLOSE_DURATION,
  TYPES,
} from "@/components/ToastNotification/constants";
import styles from "./Toast.module.scss";

export type ToastType = {
  id: number;
  message: string;
  type: ToastNotificationEnum;
};

interface IToastProps {
  message: string;
  type: ToastNotificationEnum;
  onClose: () => void;
  isTopLeft?: boolean;
}

const Toast = ({ message, type, onClose, isTopLeft }: IToastProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const toastIcon: React.JSX.Element | null = TYPES[type].icon || null;

  const isExitingClassName = isExiting ? styles.isExiting : styles.isEntering;

  const isTopLeftClassName = isTopLeft ? styles.topLeft : "";

  const onClick = () => {
    setIsExiting(true);
  };

  const onTransitionEnd = () => {
    if (isExiting) {
      onClose();
    }
  };

  useEffect(() => {
    ref.current?.addEventListener("transitionend", onTransitionEnd);

    setTimeout(() => {
      setIsExiting(true);
    }, AUTO_CLOSE_DURATION * 1000);

    return () =>
      ref.current?.removeEventListener("transitionend", onTransitionEnd);
  }, []);

  return (
    <div
      className={`${styles.toast} ${isExitingClassName} ${isTopLeftClassName}`}
      role="alert"
      onClick={onClick}
      style={{
        borderRight: `solid 6px ${TYPES[type].color}`,
      }}
      ref={ref}
    >
      <div className={styles.toastMessage}>
        {toastIcon && <div className={styles.icon}>{toastIcon}</div>}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;
