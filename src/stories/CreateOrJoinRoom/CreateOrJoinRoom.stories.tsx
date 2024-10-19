import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CreateOrJoinRoom from "@/components/RoomCreation/CreateOrJoinRoom";

const meta: Meta<typeof CreateOrJoinRoom> = {
  component: CreateOrJoinRoom,
};

export default meta;
type Story = StoryObj<typeof CreateOrJoinRoom>;

export const Default: Story = {
  args: {
    createRoom: (roomName: string) => action("createRoom")(roomName),
    joinRoom: (roomId: string) => action("joinRoom")(roomId),
  },
};
