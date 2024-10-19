import { putTimer } from "@/api/TimerApi";
import { handleError } from "@/api/utils";
import { ToastNotificationEnum } from "@/components/ToastNotification/enum";

export const calculateTimeLeft = (timerEnd: number | null) => {
  if (timerEnd === null) {
    return null;
  }

  const now = new Date().getTime();
  const diff = Math.floor((timerEnd * 1000 - now) / 1000);

  if (diff < 0) {
    console.log("timer in the past");
    return null;
  }

  return diff;
};

export const setTimer = async ({
  roomId,
  timer,
  showToast,
  onSuccess,
  onError,
}: {
  roomId: string;
  timer: number;
  showToast: (message: string, type: ToastNotificationEnum) => void;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  try {
    await putTimer({ roomId, timer });
    onSuccess && onSuccess();
  } catch (error: unknown) {
    handleError({
      error,
      showErrorToast: (message: string) =>
        showToast(message, ToastNotificationEnum.FAILURE),
      defaultErrorMessage: "An error occurred while setting the timer",
    });
    onError && onError();
  }
};
