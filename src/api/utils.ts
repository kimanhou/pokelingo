export const handleJsonResponsePut = (response: Response) => {
    if (response.ok) {
        return response;
    } else {
        throw new Error(response.statusText);
    }
};

export const handleJsonResponse = (response: Response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText);
    }
};

export const handleError = ({
    error,
    showErrorToast,
    defaultErrorMessage,
}: {
    error: unknown;
    showErrorToast: (message: string) => void;
    defaultErrorMessage: string;
}) => {
    if (typeof error === "string") showErrorToast(error);
    else if (typeof error === "object" && (error as any).message) {
        showErrorToast((error as any).message);
    } else {
        showErrorToast(defaultErrorMessage);
    }
};
