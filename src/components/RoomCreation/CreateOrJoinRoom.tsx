import { FC, useEffect, useState } from "react";
import Content from "@/components/RoomCreation/Content/Content";
import Illustration from "@/components/RoomCreation/Illustration/Illustration";
import illustration1 from "@/assets/CreateOrJoinRoom/1.jpg";
import illustration2 from "@/assets/CreateOrJoinRoom/2.jpg";
import illustration3 from "@/assets/CreateOrJoinRoom/3.jpg";
import illustration4 from "@/assets/CreateOrJoinRoom/4.png";
import illustration5 from "@/assets/CreateOrJoinRoom/5.png";
import illustration6 from "@/assets/CreateOrJoinRoom/6.png";
import { CreateOrJoinRoomIllustration } from "@/types";
import styles from "./CreateOrJoinRoom.module.scss";

interface ICreateOrJoinRoomProps {
  createRoom: (roomName: string) => void;
  joinRoom: (roomId: string) => void;
}

const CreateOrJoinRoom: FC<ICreateOrJoinRoomProps> = ({
  createRoom,
  joinRoom,
}: ICreateOrJoinRoomProps) => {
  const ILLUSTRATIONS: CreateOrJoinRoomIllustration[] = [
    { url: illustration1, color: "#E7B457", lightColor: "#fdd58b" },
    { url: illustration2, color: "#754732", lightColor: "#D19F73" },
    { url: illustration3, color: "#C18465", lightColor: "#D4AD72" },
    { url: illustration4, color: "#284954", lightColor: "#8fc3d5" },
    { url: illustration5, color: "#3D545F", lightColor: "#99B1AF" },
    { url: illustration6, color: "#f08633", lightColor: "#E8CB95" },
  ];
  const ILLUSTRATION_DELAY = 10000;

  const [illustrationIndex, setIllustrationIndex] = useState(
    Math.floor(Math.random() * ILLUSTRATIONS.length)
  );

  useEffect(() => {
    const updateIllustration = () =>
      setIllustrationIndex((t) => (t + 1) % ILLUSTRATIONS.length);
    const intervalId = setInterval(updateIllustration, ILLUSTRATION_DELAY);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.createOrJoinRoom}>
      <div className={styles.popup}>
        <Content
          createRoom={createRoom}
          joinRoom={joinRoom}
          color={ILLUSTRATIONS[illustrationIndex].color}
          lightColor={ILLUSTRATIONS[illustrationIndex].lightColor}
        />
        <Illustration url={ILLUSTRATIONS[illustrationIndex].url} />
      </div>
    </div>
  );
};

export default CreateOrJoinRoom;
