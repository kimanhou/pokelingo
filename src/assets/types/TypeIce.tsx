import { FC } from "react";

const TypeIce: FC = () => {
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
      <g>
        <polygon
          fill={fillIcon}
          points="80.008,106.491 123.443,127.624 80.008,148.709 36.572,127.629 	"
        />
        <g>
          <polygon
            fill={fillIcon}
            points="175.192,106.491 131.757,127.624 175.192,148.709 218.628,127.629 		"
          />
          <polygon
            fill={fillIcon}
            points="175.192,52.127 131.757,74.989 131.757,119.755 132.087,119.591 132.087,119.591 132.704,119.284 
			175.18,98.148 175.179,98.147 175.192,98.141 		"
          />
        </g>
        <polygon
          fill={fillIcon}
          points="175.192,203.073 131.757,180.211 131.757,135.445 132.087,135.609 132.087,135.609 132.704,135.916 
		175.18,157.052 175.179,157.053 175.192,157.059 	"
        />
        <polygon
          fill={fillIcon}
          points="80.008,52.127 123.443,74.989 123.443,119.755 123.113,119.591 123.113,119.591 122.496,119.284 
		80.02,98.148 80.021,98.147 80.008,98.141 	"
        />
        <polygon
          fill={fillIcon}
          points="80.008,203.073 123.443,180.211 123.443,135.445 123.113,135.609 123.113,135.609 122.496,135.916 
		80.02,157.052 80.021,157.053 80.008,157.059 	"
        />
      </g>
    </svg>
  );
};

export default TypeIce;
