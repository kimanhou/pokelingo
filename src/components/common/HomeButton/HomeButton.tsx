import { FC } from "react";
import { Link } from "react-router-dom";
import IconButton from "@/components/common/IconButton/IconButton";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

interface IHomeButtonProps {
    className?: string;
}

const HomeButton: FC<IHomeButtonProps> = (props) => {
    return (
        <Link to={"/"} className={props.className ?? ""}>
            <IconButton icon={faHouse} color="rgba(0, 0, 0, 0.3)" />
        </Link>
    );
};

export default HomeButton;
