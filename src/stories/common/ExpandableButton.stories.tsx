import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";
import { action } from "@storybook/addon-actions";
import ExpandableButton from "@/components/common/ExpandableButton/ExpandableButton";
import Input from "@/components/common/Input/Input";

const meta: Meta<typeof ExpandableButton> = {
  component: ExpandableButton,
};

export default meta;
type Story = StoryObj<typeof ExpandableButton>;

export const CreateRoom: Story = {
  args: {
    header: "Create room",
  },
  render: (args) => (
    <ExpandableButton {...args}>
      <Input
        label="Room name"
        isRequired={true}
        minLength={3}
        onConfirm={(roomName: string) => action("onConfirm")(roomName)}
      />
    </ExpandableButton>
  ),
};

export const JoinRoom: Story = {
  args: {
    header: "Join room",
  },
  render: (args) => (
    <ExpandableButton {...args}>
      <Input
        label="Room id"
        isRequired={true}
        minLength={3}
        onConfirm={(roomId: string) => action("onConfirm")(roomId)}
      />
    </ExpandableButton>
  ),
};
