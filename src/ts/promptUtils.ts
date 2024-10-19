import { putPrompt } from "@/api/PromptApi";
import { handleError } from "@/api/utils";
import { ToastNotificationEnum } from "@/components/ToastNotification/enum";

export const publishPrompt = async ({
  prompt,
  roomId,
  onSuccess,
  showToast,
}: {
  prompt: string;
  roomId: string;
  showToast: (message: string, type: ToastNotificationEnum) => void;
  onSuccess?: () => void;
}) => {
  try {
    await putPrompt({ roomId, prompt });
    onSuccess && onSuccess();
  } catch (error: unknown) {
    handleError({
      error,
      showErrorToast: (message: string) =>
        showToast(message, ToastNotificationEnum.FAILURE),
      defaultErrorMessage: "An error occurred while updating the prompt",
    });
  }
};

export const isPromptValid = (prompt?: string | null) => {
  return !!prompt && prompt.length >= 3 && prompt.length <= 250;
};
