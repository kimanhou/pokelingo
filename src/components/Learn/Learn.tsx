import { FC, useEffect, useState } from "react";
import Button from "@/components/common/Button/Button";
import HomeButton from "@/components/common/HomeButton/HomeButton";
import AvatarOptions from "@/components/Learn/Options/AvatarOptions";
import AvatarDetails from "@/components/Learn/Details/AvatarDetails";
import Search from "@/components/Learn/Search/Search";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useDeviceType } from "@/hooks/useMedia";
import {
    getMainColor,
    isMediumDesktopOrBigger as isMediumDesktopOrBiggerFunc,
    isMobile,
    scrollToCreatureIndex,
} from "@/ts/utils";
import Creature from "@/model/creature/creature";
import useArrows from "@/hooks/useArrows";
import styles from "./Learn.module.scss";

interface ILearnProps {
    creatures: Creature[];
}

const Learn: FC<ILearnProps> = ({ creatures }: ILearnProps) => {
    const deviceType = useDeviceType();
    const isMediumDesktopOrBigger = isMediumDesktopOrBiggerFunc(deviceType);

    const [displayedSelectedCreature, setDisplayedSelectedCreature] =
        useState<Creature>(Creature.getEmpty());
    const [search, setSearch] = useState("");
    const [displayedOptions, setDisplayedOptions] =
        useState<Creature[]>(creatures);
    if (!isMobile(deviceType)) {
        useArrows({ setDisplayedSelectedCreature, creatures });
    }

    const mainColor = getMainColor(displayedSelectedCreature);

    const randomize = () => {
        const randomIndex = Math.floor(Math.random() * creatures.length);
        setDisplayedSelectedCreature(creatures[randomIndex]);
        scrollToCreatureIndex({ creatureIndex: randomIndex });
    };

    useEffect(() => {
        randomize();
    }, []);

    useEffect(() => {
        setDisplayedOptions(
            creatures.filter(
                (creature) =>
                    creature.getId() === parseInt(search) ||
                    creature.matchesPartial(search)
            )
        );
    }, [search]);

    return (
        <div className={styles.learn}>
            <HomeButton className={styles.homeButton} />
            <AvatarDetails
                creature={displayedSelectedCreature}
                randomize={randomize}
                search={search}
                setSearch={setSearch}
            />
            <div className={styles.right}>
                {isMediumDesktopOrBigger && (
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
                    displayedOptions={displayedOptions}
                    displayedSelectedCreature={displayedSelectedCreature}
                    setDisplayedSelectedCreature={setDisplayedSelectedCreature}
                    unavailableCreaturesImageUrl={[]}
                />
            </div>
        </div>
    );
};

export default Learn;
