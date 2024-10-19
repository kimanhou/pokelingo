import {
  FC,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import AvatarSpec from "@/components/EditAvatar/Details/Specs/AvatarSpec";
import TypeTag from "@/components/EditAvatar/Details/Specs/TypeTag";
import { AvatarTypeColors } from "@/ts/enums";
import styles from "./AvatarSpecs.module.scss";

interface IAvatarSpecsProps {
  types: string[];
  isSmallDesktop?: boolean;
  isMobile?: boolean;
  height?: number;
  weight?: number;
  description?: string;
  setAvatarSpecsHeight?: Dispatch<SetStateAction<number | undefined>>;
  isLargeDesktop?: boolean;
}

const AvatarSpecs: FC<IAvatarSpecsProps> = (props: IAvatarSpecsProps) => {
  const avatarSpecsRef = useRef<HTMLDivElement>(null);

  const [marginTop, setMarginTop] = useState("100%");

  const smallDesktopClassName = props.isSmallDesktop ? styles.smallDesktop : "";
  const mobileClassName = props.isMobile ? styles.mobile : "";

  useEffect(() => {
    setTimeout(() => {
      setMarginTop("-40px");
    }, 400); // transition duration of side sheet from bottom + transition duration of Image Container

    if (avatarSpecsRef.current && props.setAvatarSpecsHeight) {
      props.setAvatarSpecsHeight(avatarSpecsRef.current.clientHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${styles.avatarSpecs} ${smallDesktopClassName} ${mobileClassName}`}
      style={{ marginTop: props.isSmallDesktop ? "24px" : marginTop }}
      ref={avatarSpecsRef}
    >
      <div className={styles.typeTags}>
        {props.types.map((t) => (
          <TypeTag
            key={t}
            type={t}
            color={
              AvatarTypeColors[
                t.toUpperCase() as keyof typeof AvatarTypeColors
              ] ?? "var(--color-grey)"
            }
            isSmallDesktop={props.isSmallDesktop}
          />
        ))}
      </div>
      {props.isLargeDesktop && props.description && (
        <AvatarSpec
          spec="Description"
          value={props.description}
          hasMarginBottom
        />
      )}
      <div className={styles.specsLine}>
        <AvatarSpec
          spec="Height"
          value={props.height ? `${props.height / 10}m` : "-"}
        />
        <AvatarSpec
          spec="Weight"
          value={props.weight ? `${props.weight / 10}kg` : "-"}
        />
      </div>
    </div>
  );
};

export default AvatarSpecs;
