import { FC, useEffect, useState } from "react";
import BottomNotification from "@/components/common/BottomNotification/BottomNotification";
import Explanation from "@/components/Home/Explanation";
import { getLastVisit, setLastVisit } from "@/ts/localStorageUtils";
import { isBeforeToday, isMobile as isMobileFunc } from "@/ts/utils";
import { useDeviceType } from "@/hooks/useMedia";
import HomeDesktop from "./Desktop/HomeDesktop";
import HomeMobile from "./Mobile/HomeMobile";
import styles from "./Home.module.scss";

const Home: FC = (props) => {
    const deviceType = useDeviceType();
    const isMobile = isMobileFunc(deviceType);
    const [isExplanationVisible, setIsExplanationVisible] = useState(false);
    const [isExplanationLoaded, setIsExplanationLoaded] = useState(false);
    const [shouldTriggerMoves, setShouldTriggerMoves] = useState(false);

    useEffect(() => {
        const lastVisit = getLastVisit();
        if (
            isExplanationLoaded &&
            (!lastVisit || isBeforeToday(new Date(lastVisit)))
        ) {
            setIsExplanationVisible(true);
            setLastVisit(new Date());
        }
    }, [isExplanationLoaded]);

    return (
        <div className={styles.home}>
            {!isMobile && (
                <HomeDesktop shouldTriggerMoves={shouldTriggerMoves} />
            )}
            {isMobile && <HomeMobile shouldTriggerMoves={shouldTriggerMoves} />}

            <BottomNotification
                isVisible={isExplanationVisible}
                setIsVisible={setIsExplanationVisible}
                backgroundColor="var(--color-logo-light)"
                withBackdrop
                onExit={() => {
                    setShouldTriggerMoves(true);
                }}
            >
                <Explanation
                    close={() => setIsExplanationVisible(false)}
                    setIsLoaded={setIsExplanationLoaded}
                />
            </BottomNotification>
        </div>
    );
};

export default Home;
