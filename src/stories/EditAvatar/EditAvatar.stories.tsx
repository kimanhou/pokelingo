import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { WEBCX_TEAM_1 } from "@/data/webcx-1";
import psyduck from "@/assets/avatars/54.svg";
import EditAvatar from "@/components/EditAvatar/EditAvatar";
import SideSheet from "@/components/common/SideSheet/SideSheet";
import Avatar from "@/components/common/Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastNotificationEnum } from "@/components/ToastNotification/enum";

const meta: Meta<typeof EditAvatar> = {
  component: EditAvatar,
};

export default meta;
type Story = StoryObj<typeof EditAvatar>;

export const Default: Story = {
  args: {
    roomId: "6d630f24-ba2d-400b-b4de-7128b872efb7",
    memberId: "49d0cd19-1ca0-476c-81f4-efddf43275ef",
    showToast: (message: string, type: ToastNotificationEnum) =>
      action("showToast")(message, type),
    members: WEBCX_TEAM_1.members.flat(),
    selectedAvatarImageUrl: psyduck,
  },
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
            <Avatar src={psyduck} backgroundColor="#fcf6bd" />
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
              <FontAwesomeIcon icon={faPencil} color="var(--color-grey)" />
            </button>
          </div>
          <h2>Hi Poney!</h2>
        </div>
        <SideSheet
          isVisible={isOpen}
          setIsVisible={setIsOpen}
          transitionFromBottom={true}
          onEnter={() => {
            document.body.style.overflow = "hidden";
          }}
        >
          <EditAvatar
            {...args}
            closeEditAvatar={() => {
              document.body.style.overflow = "auto";
              setIsOpen(false);
            }}
          />
        </SideSheet>
      </>
    );
  },
};
