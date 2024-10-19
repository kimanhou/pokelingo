import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./IconWithTooltip.module.scss";

interface IconWithTooltipProps {
  icon: IconProp;
  tooltipText: string;
  className?: string;
  color?: string;
}

const IconWithTooltip: FC<IconWithTooltipProps> = ({
  icon,
  tooltipText,
  className,
  color,
}) => {
  return (
    <div className={`${styles.iconWithTooltip} ${className}`}>
      <FontAwesomeIcon icon={icon} color={color} />
      <span className={styles.tooltip} style={{ color }}>
        {tooltipText}
      </span>
    </div>
  );
};

export default IconWithTooltip;
