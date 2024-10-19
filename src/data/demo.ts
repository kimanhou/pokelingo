import { TeamMemberType, TeamType } from "@/types";
import logo2 from "@/assets/logo-3.png";
import squirtle from "@/assets/avatars/7.svg";
import vulpix from "@/assets/avatars/37.svg";
import jigglypuff from "@/assets/avatars/39.svg";
import oddish from "@/assets/avatars/43.svg";
import paras from "@/assets/avatars/46.svg";
import venonat from "@/assets/avatars/48.svg";
import poliwag from "@/assets/avatars/60.svg";
import gastly from "@/assets/avatars/92.svg";
import krabby from "@/assets/avatars/98.svg";
import cubone from "@/assets/avatars/104.svg";
import hitmonlee from "@/assets/avatars/106.svg";
import hitmonchan from "@/assets/avatars/107.svg";
import chansey from "@/assets/avatars/113.svg";
import tangela from "@/assets/avatars/114.svg";
import dratini from "@/assets/avatars/147.svg";
import ondine from "@/assets/avatars/ondine.png";
import pierre from "@/assets/avatars/pierre.png";
import prChen from "@/assets/avatars/pr-chen.png";

const TEAM_COLORS = {
  ONE: "#fbdae0",
  ONE_DARK: "#f56c84",
  TWO: "#d8c6e9",
  TWO_DARK: "#614592",
  API: "#bee0f8",
  API_DARK: "#2a9ef1",
  THREE: "#fcf6bd",
  THREE_DARK: "#f2df2a",
  FOUR: "#f4bca7",
  FOUR_DARK: "#e96230",
  FIVE: "#e1dad4",
  FIVE_DARK: "#6f6b68",
};

const TEAM_MEMBERS: TeamMemberType[][] = [
  [
    {
      id: "d6038a48-a0cf-4753-8528-1e74e2f9b676",
      color: TEAM_COLORS.ONE,
      colorDark: TEAM_COLORS.ONE_DARK,
      name: "Jade",
      avatar: jigglypuff,
    },
    {
      id: "7010acce-ede9-471a-8540-4735c29fdedb",
      color: TEAM_COLORS.ONE,
      colorDark: TEAM_COLORS.ONE_DARK,
      name: "Gabriel",
      avatar: chansey,
    },
    {
      id: "2865c1ca-14e3-4f44-b3f8-a6ffddceb61f",
      color: TEAM_COLORS.ONE,
      colorDark: TEAM_COLORS.ONE_DARK,
      name: "Alban",
      avatar: venonat,
    },
  ],
  [
    {
      id: "46dffcd7-7f7c-4aad-a761-a74a59793105",
      color: TEAM_COLORS.TWO,
      colorDark: TEAM_COLORS.TWO_DARK,
      name: "Léo",
      avatar: gastly,
    },
    {
      id: "0d5bedd6-5690-4b6a-8cac-8f06cc7f89cb",
      color: TEAM_COLORS.TWO,
      colorDark: TEAM_COLORS.TWO_DARK,
      name: "Raphaël",
      avatar: tangela,
    },
    {
      id: "b313541d-39ba-4243-bb8e-e03d2772deb0",
      color: TEAM_COLORS.TWO,
      colorDark: TEAM_COLORS.TWO_DARK,
      name: "Louis",
      avatar: dratini,
    },
  ],
  [
    {
      id: "1fcaddef-fc40-4b30-aa4b-961574ab8f87",
      color: TEAM_COLORS.API,
      colorDark: TEAM_COLORS.API_DARK,
      name: "Maël",
      avatar: poliwag,
    },
    {
      id: "6cbd84e7-bb80-4557-bf1f-05decccf2e5d",
      color: TEAM_COLORS.API,
      colorDark: TEAM_COLORS.API_DARK,
      name: "Théophile",
      avatar: squirtle,
    },
    {
      id: "1c61e06a-8d31-49d6-bdc7-b47d69a757d9",
      color: TEAM_COLORS.API,
      colorDark: TEAM_COLORS.API_DARK,
      name: "Ambre",
      avatar: oddish,
    },
  ],
  [
    {
      id: "77a9cf18-9740-4fea-a7ec-07e84795fed2",
      color: TEAM_COLORS.THREE,
      colorDark: TEAM_COLORS.THREE_DARK,
      name: "Alba",
      avatar: vulpix,
    },
    {
      id: "4d1877d3-ba0b-4276-9bab-0a8a41ab8d9c",
      color: TEAM_COLORS.THREE,
      colorDark: TEAM_COLORS.THREE_DARK,
      name: "Noah",
      avatar: paras,
    },
    {
      id: "e100f6e5-29e7-4ecd-9bfc-40b30646af04",
      color: TEAM_COLORS.THREE,
      colorDark: TEAM_COLORS.THREE_DARK,
      name: "Lucas",
      avatar: krabby,
    },
  ],
  [
    {
      id: "78a7da3e-5c83-4ea2-82e8-28bd0a41353f",
      color: TEAM_COLORS.FOUR,
      colorDark: TEAM_COLORS.FOUR_DARK,
      name: "Emma",
      avatar: cubone,
    },
    {
      id: "d97d2311-456c-46c5-bc0f-306a865f9d71",
      color: TEAM_COLORS.FOUR,
      colorDark: TEAM_COLORS.FOUR_DARK,
      name: "Rose",
      avatar: hitmonlee,
    },
    {
      id: "59f2c49e-dab7-4565-b7cb-c2df9239f32c",
      color: TEAM_COLORS.FOUR,
      colorDark: TEAM_COLORS.FOUR_DARK,
      name: "Hugo",
      avatar: hitmonchan,
    },
  ],
  [
    {
      id: "3ac0a9dd-239d-4431-ab06-5bfde360a9b5",
      color: TEAM_COLORS.FIVE,
      colorDark: TEAM_COLORS.FIVE_DARK,
      name: "Admin 1",
      avatar: ondine,
      isAdmin: true,
    },
    {
      id: "106209f2-de31-4250-b2c0-91355d68b0c7",
      color: TEAM_COLORS.FIVE,
      colorDark: TEAM_COLORS.FIVE_DARK,
      name: "Admin 2",
      avatar: pierre,
      isAdmin: true,
    },
    {
      id: "d5948f8b-6d8b-48c6-a657-10c969055ed2",
      color: TEAM_COLORS.FIVE,
      colorDark: TEAM_COLORS.FIVE_DARK,
      name: "Admin 3",
      avatar: prChen,
      isAdmin: true,
    },
  ],
];

export const DEMO_TEAM: TeamType = {
  id: "17a3091d-86fc-4c4e-a15b-f0399ba3774f",
  name: "DEMO",
  members: TEAM_MEMBERS,
  logoSrc: logo2,
  color: "#98CAFA",
};
