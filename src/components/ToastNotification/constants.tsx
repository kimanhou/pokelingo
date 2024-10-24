import SuccessIcon from "@/assets/SuccessIcon";
import WarningIcon from "@/assets/WarningIcon";
import FailureIcon from "@/assets/FailureIcon";

export const AUTO_CLOSE_DURATION = 4; // in seconds
export const POSITION = "top-left";
export const TYPES = {
  SUCCESS: {
    icon: <SuccessIcon />,
    color: "#5DA271",
  },
  FAILURE: {
    icon: <FailureIcon />,
    color: "#f25c54",
  },
  WARNING: {
    icon: <WarningIcon />,
    color: "#f79d65",
  },
};
