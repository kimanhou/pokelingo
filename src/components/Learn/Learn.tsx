import { FC, useEffect, useState } from "react";
import AvatarOptions from "@/components/Learn/Options/AvatarOptions";
import Button from "@/components/common/Button/Button";
import AvatarDetails from "@/components/Learn/Details/AvatarDetails";
import Search from "@/components/Learn/Search/Search";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useDeviceType } from "@/hooks/useIsMobile";
import {
    getMainColor,
    scrollTo,
    isMediumDesktopOrBigger as isMediumDesktopOrBiggerFunc,
} from "@/ts/utils";
import Creature from "@/model/creature";
import styles from "./Learn.module.scss";

interface ILearnProps {
    creatures: Creature[];
}

const Learn: FC<ILearnProps> = (props) => {
    const deviceType = useDeviceType();
    const isMediumDesktopOrBigger = isMediumDesktopOrBiggerFunc(deviceType);

    const [displayedSelectedCreature, setDisplayedSelectedCreature] =
        useState<Creature>(Creature.getEmpty());
    const [search, setSearch] = useState("");
    const [displayedOptions, setDisplayedOptions] = useState<Creature[]>(
        props.creatures
    );

    const mainColor = getMainColor(displayedSelectedCreature);

    const randomize = () => {
        const randomIndex = Math.floor(Math.random() * props.creatures.length);
        setDisplayedSelectedCreature(props.creatures[randomIndex]);
        scrollTo({ elementId: `avatar-${randomIndex + 1}` });
    };

    useEffect(() => {
        randomize();
    }, []);

    useEffect(() => {
        setDisplayedOptions(
            props.creatures.filter(
                (creature) =>
                    creature.id === parseInt(search) ||
                    creature.matchesPartial(search)
            )
        );
    }, [search]);

    return (
        <div className={styles.learn}>
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
