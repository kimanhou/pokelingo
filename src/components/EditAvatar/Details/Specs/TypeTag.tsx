import { FC } from "react";
import Bug from "@/assets/types/bug.png";
import Dragon from "@/assets/types/dragon.png";
import Fire from "@/assets/types/fire.png";
import Flying from "@/assets/types/flying.png";
import Ghost from "@/assets/types/ghost.png";
import Grass from "@/assets/types/grass.png";
import TypeDark from "@/assets/types/TypeDark";
import TypeElectric from "@/assets/types/TypeElectric";
import TypeFairy from "@/assets/types/TypeFairy";
import TypeFighting from "@/assets/types/TypeFighting";
import TypeGround from "@/assets/types/TypeGround";
import TypeIce from "@/assets/types/TypeIce";
import TypeNormal from "@/assets/types/TypeNormal";
import TypePoison from "@/assets/types/TypePoison";
import TypePsychic from "@/assets/types/TypePsychic";
import TypeRock from "@/assets/types/TypeRock";
import TypeSteel from "@/assets/types/TypeSteel";
import TypeWater from "@/assets/types/TypeWater";
import styles from "./TypeTag.module.scss";

interface ITypeTagProps {
  type: string;
  color: string;
  isSmallDesktop?: boolean;
}

const TypeTag: FC<ITypeTagProps> = (props) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "bug":
        return Bug;
      case "dark":
        return TypeDark;
      case "dragon":
        return Dragon;
      case "electric":
        return TypeElectric;
      case "fairy":
        return TypeFairy;
      case "fighting":
        return TypeFighting;
      case "fire":
        return Fire;
      case "flying":
        return Flying;
      case "ghost":
        return Ghost;
      case "grass":
        return Grass;
      case "ground":
        return TypeGround;
      case "ice":
        return TypeIce;
      case "normal":
        return TypeNormal;
      case "psychic":
        return TypePsychic;
      case "poison":
        return TypePoison;
      case "rock":
        return TypeRock;
      case "steel":
        return TypeSteel;
      case "water":
        return TypeWater;
      default:
        return null;
    }
  };

  const icon = props.isSmallDesktop ? null : getIcon(props.type);
  const isComponent = typeof icon === "function";

  return (
    <div
      className={styles.typeTag}
      style={{ backgroundColor: props.color, color: "white" }}
    >
      {icon && !isComponent && (
        <img className={styles.icon} src={icon} alt={props.type} />
      )}
      {icon && isComponent && icon({})}
      {props.type}
    </div>
  );
};

export default TypeTag;
