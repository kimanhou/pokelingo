import { ReactNode } from "react";
import ModalDialog, {
  ModalDialogPropsType,
} from "@/components/common/ModalDialog/ModalDialog";
import CloseIcon from "@/components/common/Icons/CloseIcon";
import styles from "./ModalDialogWithLayout.module.scss";

type ModalDialogWithLayoutPropsType = ModalDialogPropsType & {
  title: string;
  subtitle?: string;
  actionButtons?: ReactNode;
  onClose?: () => void;
};

export default function ModalDialogWithLayout({
  isOpen,
  setIsOpen,
  title,
  children,
  closeOnClickOutside = true,
  className = "",
  subtitle = "",
  actionButtons,
  onClose,
}: ModalDialogWithLayoutPropsType) {
  return (
    <ModalDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className={className}
      closeOnClickOutside={closeOnClickOutside}
      withLayout={true}
    >
      <div className={styles.modalDialogWithLayoutHeader}>
        <div className={styles.modalDialogWithLayoutHeaderTitleContainer}>
          <h2>{title}</h2>
          <button
            onClick={() => {
              setIsOpen(false);
              onClose && onClose();
            }}
            className={styles.closeButton}
          >
            <CloseIcon color="#f25c54" /> {/* --color-primary-5 */}
          </button>
        </div>
        <h3>{subtitle}</h3>
      </div>
      <div className={styles.modalDialogWithLayoutChildrenContainer}>
        {children}
      </div>
      {actionButtons && (
        <div className={styles.modalDialogWithLayoutActionButtonsContainer}>
          {actionButtons}
        </div>
      )}
    </ModalDialog>
  );
}
