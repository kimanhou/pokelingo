import { FC, useState } from "react";
import { CreateOrJoinRoomTabs } from "@/ts/enums";
import TabButton from "@/components/RoomCreation/Content/TabButton/TabButton";
import Join from "@/components/RoomCreation/Content/Join/Join";
import Create from "@/components/RoomCreation/Content/Create/Create";
import styles from "./Content.module.scss";

interface IContentProps {
  createRoom: (roomName: string) => void;
  joinRoom: (roomId: string) => void;
  color: string;
  lightColor: string;
}

const Content: FC<IContentProps> = ({
  createRoom,
  joinRoom,
  color,
  lightColor,
}: IContentProps) => {
  const [currentTab, setCurrentTab] = useState(CreateOrJoinRoomTabs.JOIN);

  return (
    <div className={styles.content}>
      <div className={styles.tabButtons}>
        <TabButton
          text="Join a room"
          onClick={() => setCurrentTab(CreateOrJoinRoomTabs.JOIN)}
          isSelected={currentTab === CreateOrJoinRoomTabs.JOIN}
          color={color}
          lightColor={lightColor}
        />
        <TabButton
          text="Create a room"
          onClick={() => setCurrentTab(CreateOrJoinRoomTabs.CREATE)}
          isSelected={currentTab === CreateOrJoinRoomTabs.CREATE}
          color={color}
          lightColor={lightColor}
        />
      </div>
      <div className={styles.tabContent}>
        {currentTab === CreateOrJoinRoomTabs.JOIN && (
          <Join joinRoom={joinRoom} color={color} lightColor={lightColor} />
        )}
        {currentTab === CreateOrJoinRoomTabs.CREATE && (
          <Create
            createRoom={createRoom}
            color={color}
            lightColor={lightColor}
          />
        )}
      </div>
    </div>
  );
};

export default Content;
