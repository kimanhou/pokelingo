import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRulerVertical,
  faWeightHanging,
  faFaceSmile,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AvatarSpec.module.scss";

interface IAvatarSpecProps {
  spec: string;
  value: string;
  hasMarginBottom?: boolean;
}

const AvatarSpec: FC<IAvatarSpecProps> = (props) => {
  const getIcon = (spec: string) => {
    switch (spec) {
      case "Height":
        return faRulerVertical;
      case "Weight":
        return faWeightHanging;
      case "Description":
        return faCircleInfo;
      default:
        return faFaceSmile;
    }
  };

  return (
    <div
      className={styles.avatarSpec}
      style={{ marginBottom: props.hasMarginBottom ? "16px" : "unset" }}
    >
      <div className={styles.spec}>
        <FontAwesomeIcon
          icon={getIcon(props.spec)}
          color="var(--color-medium-grey)"
        />
        {props.spec}
      </div>
      <div className={styles.value}>{props.value}</div>
    </div>
  );
};

export default AvatarSpec;
