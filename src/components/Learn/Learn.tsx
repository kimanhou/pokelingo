import { FC, useEffect, useState } from "react";
import AvatarOptions from "@/components/Learn/Options/AvatarOptions";
import Button from "@/components/common/Button/Button";
import AvatarDetails from "@/components/Learn/Details/AvatarDetails";
import Search from "@/components/Learn/Search/Search";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useIsMobile, useIsSmallDesktop } from "@/hooks/useIsMobile";
import { getMainColor, scrollTo } from "@/ts/utils";
import styles from "./Learn.module.scss";
import Creature from "@/data/creature";

interface ILearnProps {
    creatures: Creature[];
}

const Learn: FC<ILearnProps> = (props) => {
    const isSmallDesktop = useIsSmallDesktop();
    const isMobile = useIsMobile();

    const [displayedSelectedCreature, setDisplayedSelectedCreature] =
        useState<Creature>(Creature.getDefaultValue());
    const [search, setSearch] = useState("");

    const mainColor = getMainColor(displayedSelectedCreature);

    const randomize = () => {
        const randomIndex = Math.floor(Math.random() * props.creatures.length);
        setDisplayedSelectedCreature(props.creatures[randomIndex]);
        scrollTo({ elementId: `avatar-${randomIndex + 1}` });
    };

    useEffect(() => {
        randomize();
    }, [search]);

    return (
        <div className={styles.learn}>
            <AvatarDetails
                creature={displayedSelectedCreature}
                randomize={randomize}
                isSmallDesktop={isSmallDesktop}
                isMobile={isMobile}
                search={search}
                setSearch={setSearch}
            />
            <div className={styles.right}>
                {!isSmallDesktop && !isMobile && (
                    <div className={styles.randomizeSearchButtonsContainer}>
                        <Button
                            onClick={randomize}
                            text="Randomize"
                            icon={faShuffle}
                            backgroundColor={mainColor}
                        />
                        <Search
                            search={search}
                            setSearch={setSearch}
                            mainColor={mainColor}
                        />
                    </div>
                )}
                <AvatarOptions
                    displayedOptions={props.creatures}
                    displayedSelectedCreature={displayedSelectedCreature}
                    setDisplayedSelectedCreature={setDisplayedSelectedCreature}
                    unavailableCreaturesImageUrl={[]}
                    isSmallDesktop={isSmallDesktop}
                />
            </div>
        </div>
    );
};

export default Learn;
