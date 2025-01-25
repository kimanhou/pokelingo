import { FC } from "react";
import { useDeviceType } from "@/hooks/useMedia";
import { isMobile as isMobileFunc } from "@/ts/utils";
import Button from "@/components/common/Button/Button";
import logo from "@/assets/logo.svg";
import learn from "@/assets/study_jigglypuff.png";
import quiz from "@/assets/think_squirtle.png";
import styles from "./Explanation.module.scss";

interface IExplanationProps {
    close: () => void;
}

const Explanation: FC<IExplanationProps> = (props) => {
    const deviceType = useDeviceType();
    const isMobile = isMobileFunc(deviceType);

    return (
        <div className={styles.explanation}>
            <div className={styles.content}>
                <img src={logo} className={styles.logo} />
                <p>
                    This is a small app designed to help you discover and learn
                    Japanese Pokemon names, their origins, and cultural
                    references.
                </p>
                <div className={styles.logoAndTextLine}>
                    <img className={styles.sectionLogo} src={learn} />
                    <p>
                        The "<b>Learn</b>" section lets you browse through the
                        first 151 Pokemon.
                    </p>
                </div>
                <div className={styles.logoAndTextLine}>
                    <img className={styles.sectionLogo} src={quiz} />
                    <p>
                        The "<b>Quiz</b>" section tests your knowledge of the
                        Japanese names of the first 151 Pokemon.
                    </p>
                </div>
            </div>

            <Button
                text="Okay, got it"
                onClick={props.close}
                expand={isMobile}
            />
        </div>
    );
};

export default Explanation;
