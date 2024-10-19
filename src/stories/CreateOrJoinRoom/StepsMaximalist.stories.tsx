import type { Meta, StoryObj } from "@storybook/react";
import Steps from "@/components/RoomCreation/Content/Steps/maximalist/Steps";
import { JOIN_STEPS } from "@/components/RoomCreation/Content/Join/constants";
import { CREATE_STEPS } from "@/components/RoomCreation/Content/Create/constants";

const meta: Meta<typeof Steps> = {
    component: Steps,
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Join: Story = {
    args: {
        steps: JOIN_STEPS,
        currentStep: 2,
    },
};

export const Create: Story = {
    args: {
        steps: CREATE_STEPS,
        currentStep: 3,
    },
};
