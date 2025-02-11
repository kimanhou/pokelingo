import { FC } from "react";

const TypeSteel: FC = () => {
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
      <circle fill={fillCircle} cx="127.6" cy="127.6" r="121.6" />
      <path
        fill={fillIcon}
        d="M44.336,127.584c-0.022-0.038-0.022-0.085,0-0.123l41.883-71.558c0.022-0.037,0.062-0.059,0.104-0.059h83.013
	c0.044,0,0.083,0.022,0.106,0.061l41.423,71.558c0.021,0.037,0.021,0.085,0,0.122l-41.423,71.479
	c-0.022,0.037-0.062,0.061-0.106,0.061H86.323c-0.044,0-0.083-0.022-0.104-0.059L44.336,127.584z M166.187,127.482
	c0,21.304-17.27,38.574-38.574,38.574s-38.574-17.27-38.574-38.574s17.27-38.574,38.574-38.574S166.187,106.178,166.187,127.482z"
      />
    </svg>
  );
};

export default TypeSteel;
