import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "@/components/common/Button/Button";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    onClick: () => {
      action("onClick")();
    },
    text: "Click me",
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Secondary = {
  args: {
    ...Default.args,
    secondary: true,
  },
};

export const SecondaryDisabled = {
  args: {
    ...Default.args,
    secondary: true,
    disabled: true,
  },
};

export const Selected = {
  args: {
    ...Default.args,
    text: "30 sec",
    selected: true,
  },
};

export const WithIcon = {
  args: {
    ...Default.args,
    text: "Randomize",
    icon: faShuffle,
  },
};

export const WithBackgroundColor = {
  args: {
    ...Default.args,
    text: "Randomize",
    icon: faShuffle,
    backgroundColor: "#a8a77a",
  },
  argTypes: {
    backgroundColor: {
      control: {
        type: "color",
      },
    },
  },
};

export const ShrinkSmallDesktopRandomize = {
  args: {
    ...Default.args,
    text: "Randomize",
    icon: faShuffle,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    shrink: true,
  },
  parameters: {
    backgrounds: {
      default: "NORMAL",
      values: [
        {
          name: "NORMAL",
          value: "#a8a77a",
        },
        {
          name: "FIRE",
          value: "#d43d35",
        },
        {
          name: "WATER",
          value: "#437ee7",
        },
        {
          name: "ELECTRIC",
          value: "#f7d02c",
        },
        {
          name: "GRASS",
          value: "#5b9f3d",
        },
        {
          name: "ICE",
          value: "#96d9d6",
        },
        {
          name: "FIGHTING",
          value: "#ef8733",
        },
        {
          name: "POISON",
          value: "#a33ea1",
        },
        {
          name: "GROUND",
          value: "#e2bf65",
        },
        {
          name: "FLYING",
          value: "#a98ff3",
        },
        {
          name: "PSYCHIC",
          value: "#f95587",
        },
        {
          name: "BUG",
          value: "#a6b91a",
        },
        {
          name: "ROCK",
          value: "#b6a136",
        },
        {
          name: "GHOST",
          value: "#735797",
        },
        {
          name: "DRAGON",
          value: "#6f35fc",
        },
        {
          name: "DARK",
          value: "#705746",
        },
        {
          name: "STEEL",
          value: "#b7b7ce",
        },
        {
          name: "FAIRY",
          value: "#d685ad",
        },
      ],
    },
  },
};
