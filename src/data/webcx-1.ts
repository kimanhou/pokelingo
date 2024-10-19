import { TeamMemberType, TeamType } from "@/types";
import logo4 from "@/assets/logo-1.webp";
import jigglypuff from "@/assets/avatars/39.svg";
import venonat from "@/assets/avatars/48.svg";
import psyduck from "@/assets/avatars/54.svg";
import poliwag from "@/assets/avatars/60.svg";
import machamp from "@/assets/avatars/68.svg";
import krabby from "@/assets/avatars/98.svg";
import hitmonlee from "@/assets/avatars/106.svg";
import hitmonchan from "@/assets/avatars/107.svg";
import scyther from "@/assets/avatars/123.svg";
import pierre from "@/assets/avatars/pierre.png";
import prChen from "@/assets/avatars/pr-chen.png";

const TEAM_COLORS = {
  FELIX_FRONT_END: "#fbdae0",
  FELIX_FRONT_END_DARK: "#f56c84",
  FELIX_BACK_END: "#d8c6e9",
  FELIX_BACK_END_DARK: "#614592",
  API: "#bee0f8",
  API_DARK: "#2a9ef1",
  JSSDK: "#fcf6bd",
  JSSDK_DARK: "#f2df2a",
  PITARI: "#b7e4c7",
  PITARI_DARK: "#53c97d",
  FELIX_BACK_END_API: "linear-gradient(135deg, #d8c6e9 50%, #bee0f8 50%)",
  FELIX_BACK_END_PITARI: "linear-gradient(135deg, #d8c6e9 50%, #b7e4c7 50%)",
  QA: "#f4bca7",
  QA_DARK: "#e96230",
  OTHERS: "#e1dad4",
  OTHERS_DARK: "#6f6b68",
};

const TEAM_MEMBERS: TeamMemberType[][] = [
  [
    {
      id: "d6649e94-5f94-4027-a2f8-190a48ed74a4",
      color: TEAM_COLORS.FELIX_FRONT_END,
      colorDark: TEAM_COLORS.FELIX_FRONT_END_DARK,
      name: "Kim Anh",
      avatar: jigglypuff,
      isAdmin: true,
    },
  ],
  [
    {
      id: "5087dcab-0366-45b5-8b2e-a92e376ca171",
      color: TEAM_COLORS.FELIX_BACK_END_API,
      colorDark: TEAM_COLORS.FELIX_BACK_END_DARK,
      name: "Anu",
      avatar: venonat,
    },
    {
      id: "25d241ce-acfe-4f4b-959c-5e79d5de092c",
      color: TEAM_COLORS.FELIX_BACK_END_API,
      colorDark: TEAM_COLORS.API_DARK,
      name: "Han",
      avatar: machamp,
    },
  ],
  [
    {
      id: "a3602ff2-06cb-4e4d-bc77-2593c4930acf",
      color: TEAM_COLORS.API,
      colorDark: TEAM_COLORS.API_DARK,
      name: "Rock",
      avatar: poliwag,
    },
    {
      id: "dfc9cca3-ca52-4ae7-9e6f-973800e386ba",
      color: TEAM_COLORS.FELIX_BACK_END_PITARI,
      colorDark: TEAM_COLORS.PITARI_DARK,
      name: "Michael K",
      avatar: scyther,
    },
  ],
  [
    {
      id: "49d0cd19-1ca0-476c-81f4-efddf43275ef",
      color: TEAM_COLORS.JSSDK,
      colorDark: TEAM_COLORS.JSSDK_DARK,
      name: "Yuliia",
      avatar: psyduck,
    },
    {
      id: "1322bc83-ba73-46e9-b2cb-eb328f020acb",
      color: TEAM_COLORS.JSSDK,
      colorDark: TEAM_COLORS.JSSDK_DARK,
      name: "Simba",
      avatar: krabby,
    },
  ],
  [
    {
      id: "7114b6e5-2b78-48ab-81b8-3928c55898c8",
      color: TEAM_COLORS.QA,
      colorDark: TEAM_COLORS.QA_DARK,
      name: "Chris",
      avatar: hitmonlee,
    },
    {
      id: "1752f325-7900-468f-b0bb-2d12472c2efd",
      color: TEAM_COLORS.QA,
      colorDark: TEAM_COLORS.QA_DARK,
      name: "Megha",
      avatar: hitmonchan,
    },
  ],
  [
    {
      id: "b34755bd-6b83-4a56-a557-9f0200a3217f",
      color: TEAM_COLORS.OTHERS,
      colorDark: TEAM_COLORS.OTHERS_DARK,
      name: "Edgar",
      avatar: pierre,
      isAdmin: true,
    },
    {
      id: "7d59113d-5b41-48b2-8b8d-f76fde0ff429",
      color: TEAM_COLORS.OTHERS,
      colorDark: TEAM_COLORS.OTHERS_DARK,
      name: "Adrian",
      avatar: prChen,
      isAdmin: true,
    },
  ],
];

export const WEBCX_TEAM_1: TeamType = {
  id: "6d630f24-ba2d-400b-b4de-7128b872efb7",
  name: "WebCXperts",
  members: TEAM_MEMBERS,
  logoSrc: logo4,
  color: "#E5ACAB",
};
