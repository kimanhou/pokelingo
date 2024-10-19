import { FC } from "react";

const TypeElectric: FC = () => {
  const fillCircle = "rgba(255, 255, 255, 0.3)";
  const fillIcon = "rgba(255, 255, 255, 0.7)";

  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 255.1 255.1"
      enableBackground="new 0 0 255.1 255.1"
      xmlSpace="preserve"
    >
      <circle cx="127.6" cy="127.6" r="121.6" fill={fillCircle} />
      <polygon
        fillRule="evenodd"
        clipRule="evenodd"
        fill={fillIcon}
        points="180.975,138.406 153.849,54.619 95.401,54.619 111.138,101.734 66.225,101.734 154.632,206.581 
	137.343,138.406 "
      />
    </svg>
  );
};

export default TypeElectric;
