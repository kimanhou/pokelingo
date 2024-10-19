import type { Meta, StoryObj } from "@storybook/react";
import Steps from "@/components/RoomCreation/Content/Steps/minimalist/Steps";

const meta: Meta<typeof Steps> = {
  component: Steps,
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Join: Story = {
  args: {
    steps: [{ step: 1 }, { step: 2 }, { step: 3 }, { step: 4 }],
    currentStep: 2,
    color: "#E7B457",
  },
};

export const Create: Story = {
  args: {
    steps: [{ step: 1 }, { step: 2 }, { step: 3 }, { step: 4 }, { step: 5 }],
    currentStep: 3,
    color: "#3D545F",
  },
};
