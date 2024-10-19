import { FC } from "react";
import styles from "./Illustration.module.scss";

interface IIllustrationProps {
    url: string;
}

const Illustration: FC<IIllustrationProps> = ({ url }: IIllustrationProps) => {
    return (
        <div className={styles.illustrationContainer}>
            <div
                className={styles.illustration}
                style={{
                    backgroundImage: `url(${url})`,
                }}
            ></div>
        </div>
    );
};

export default Illustration;
