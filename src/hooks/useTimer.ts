import { useEffect, useState } from "react";
import { deleteTimer } from "@/api/TimerApi";
import { handleError } from "@/api/utils";
import { ToastNotificationEnum } from "@/components/ToastNotification/enum";

export const useTimer = ({
  timeLeft,
  showToast,
  roomId,
}: {
  timeLeft: number | null;
  showToast: (message: string, type: ToastNotificationEnum) => void;
  roomId: string;
}) => {
  const clearTimer = async () => {
    try {
      console.log("Clearing timer...");
      await deleteTimer({ roomId });
      showToast("Timer cleared!", ToastNotificationEnum.SUCCESS);
    } catch (error: unknown) {
      handleError({
        error,
        showErrorToast: (message: string) =>
          showToast(message, ToastNotificationEnum.FAILURE),
        defaultErrorMessage: "An error occurred while clearing the timer",
      });
    }
  };

  // Timer
  const [timeLeftInternal, setTimeLeftInternal] = useState<number | null>(
    timeLeft
  );
  const [isSetTimerButtonVisible, setIsSetTimerButtonVisible] = useState(
    !timeLeftInternal
  );

  const timerMinutes = timeLeftInternal ? Math.floor(timeLeftInternal / 60) : 0;
  const timerSeconds = timeLeftInternal ? timeLeftInternal % 60 : 0;

  useEffect(() => {
    if (timeLeftInternal === 0 || timeLeftInternal === null) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeftInternal(timeLeftInternal - 1);
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeftInternal]);

  // Sync internal state with props, needed when props change outside of component (ex: after GET room)
  useEffect(() => {
    setTimeLeftInternal(timeLeft);
  }, [timeLeft, setTimeLeftInternal]);

  // Sync internal state with props, needed when props change outside of component (ex: after GET room)
  useEffect(() => {
    setIsSetTimerButtonVisible(!timeLeftInternal);
  }, [timeLeftInternal, setIsSetTimerButtonVisible]);

  return {
    clearTimer,
    timeLeftInternal,
    timerMinutes,
    timerSeconds,
    isActiveTimer: !isSetTimerButtonVisible,
    setIsSetTimerButtonVisible,
  };
};
