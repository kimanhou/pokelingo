import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Learn from "@/components/Learn/Learn";
import SideSheet from "@/components/common/SideSheet/SideSheet";
import Avatar from "@/components/common/Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import Root from "@/model/root";

const ROOT_DATA = Root.get();

const meta: Meta<typeof Learn> = {
    component: Learn,
};

export default meta;
type Story = StoryObj<typeof Learn>;

export const Default: Story = {
    args: {},
    render: function Render(args) {
        const [{ isOpen }, updateArgs] = useArgs();

        function setIsOpen(value: boolean) {
            updateArgs({ isOpen: value });
        }

        return (
            <>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div style={{ position: "relative" }}>
                        <Avatar
                            src={ROOT_DATA.creatures[0].imageUrl}
                            backgroundColor="#fcf6bd"
                        />
                        <button
                            onClick={() => setIsOpen(true)}
                            style={{
                                position: "absolute",
                                right: 0,
                                bottom: "-4px",
                                borderRadius: "100%",
                                background: "rgba(255, 255, 255, 0.5)",
                                padding: "4px",
                                // missing hover
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faPencil}
                                color="var(--color-grey)"
                            />
                        </button>
                    </div>
                    <h2>Hi Poney!</h2>
                </div>
                <SideSheet
                    isVisible={isOpen}
                    setIsVisible={
                        setIsOpen as Dispatch<SetStateAction<boolean>>
                    }
                    transitionFromBottom={true}
                    onEnter={() => {
                        document.body.style.overflow = "hidden";
                    }}
                >
                    <Learn {...args} />
                </SideSheet>
            </>
        );
    },
};
