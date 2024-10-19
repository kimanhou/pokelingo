import { FC, useEffect, useState } from "react";
import styles from "./TabButton.module.scss";

interface ITabButtonProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  color: string;
  lightColor: string;
}

const TabButton: FC<ITabButtonProps> = ({
  text,
  onClick,
  isSelected,
  color,
  lightColor,
}: ITabButtonProps) => {
  const getDefaultBackgroundColor = () => (isSelected ? color : "transparent");
  const [backgroundColor, setBackgroundColor] = useState(
    getDefaultBackgroundColor()
  );

  const [lightBackgroundColor, setLightBackgroundColor] = useState(lightColor);
  const [textColor, setTextColor] = useState("var(--fg)");
  const isSelectedClassName = isSelected ? styles.selected : "";

  useEffect(() => {
    setBackgroundColor(getDefaultBackgroundColor());
    setTextColor(isSelected ? "var(--bg)" : color);
  }, [color, isSelected]);

  useEffect(() => {
    setLightBackgroundColor(lightColor);
  }, [lightColor]);

  return (
    <button
      className={`${styles.tabButton} ${isSelectedClassName}`}
      onClick={onClick}
      onMouseEnter={() => {
        if (!isSelected) {
          setBackgroundColor(lightBackgroundColor);
          setTextColor("var(--bg)");
        }
      }}
      onMouseLeave={() => {
        if (!isSelected) {
          setBackgroundColor(getDefaultBackgroundColor());
          setTextColor(color);
        }
      }}
      style={{ backgroundColor, color: textColor }}
    >
      {text}
    </button>
  );
};

export default TabButton;
