import { FC, useEffect, useState } from "react";
import AvatarOptions from "@/components/EditAvatar/Options/AvatarOptions";
import Button from "@/components/common/Button/Button";
import AvatarDetails from "@/components/EditAvatar/Details/AvatarDetails";
import Search from "@/components/EditAvatar/Search/Search";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useIsMobile, useIsSmallDesktop } from "@/hooks/useIsMobile";
import { getMainColor, scrollTo } from "@/ts/utils";
import styles from "./EditAvatar.module.scss";
import Creature from "@/data/creature";

interface IEditAvatarProps {
    creatures : Creature[]
}

const EditAvatar: FC<IEditAvatarProps> = (props) => {
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
        <div className={styles.editAvatar}>
            <AvatarDetails
                creature={displayedSelectedCreature}
                randomize={randomize}
                isSmallDesktop={isSmallDesktop}
                isMobile={isMobile}
                search={search}
                setSearch={setSearch}
            />
            <div className={styles.right}>
                {!isSmallDesktop && (
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

export default EditAvatar;
