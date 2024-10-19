import { FC, Dispatch, SetStateAction, ReactNode } from "react";
import ModalDialogWithLayout from "@/components/common/ModalDialogWithLayout/ModalDialogWithLayout";
import Button from "@/components/common/Button/Button";

interface IWarningAlertProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => Promise<void>;
  children: ReactNode;
}

const WarningAlert: FC<IWarningAlertProps> = ({
  isOpen,
  setIsOpen,
  onConfirm,
  children,
}) => {
  return (
    <ModalDialogWithLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Warning"
      actionButtons={
        <>
          <Button
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
            text="YES"
          ></Button>
          <Button
            onClick={() => setIsOpen(false)}
            text="NO"
            secondary={true}
          ></Button>
        </>
      }
    >
      {children}
    </ModalDialogWithLayout>
  );
};

export default WarningAlert;
