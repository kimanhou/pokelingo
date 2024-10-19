import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input from "@/components/common/Input/Input";

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Room name",
    isRequired: true,
    minLength: 3,
    onConfirm: (roomName: string) => action("onConfirm")(roomName),
  },
};
