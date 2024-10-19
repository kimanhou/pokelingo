import { TeamMemberType, TeamType } from "@/types";
import logo3 from "@/assets/logo-2.png";
import charmander from "@/assets/avatars/4.svg";
import squirtle from "@/assets/avatars/7.svg";
import caterpie from "@/assets/avatars/10.svg";
import oddish from "@/assets/avatars/43.svg";
import paras from "@/assets/avatars/46.svg";
import bellsprout from "@/assets/avatars/69.svg";
import gengar from "@/assets/avatars/94.svg";
import cubone from "@/assets/avatars/104.svg";
import chansey from "@/assets/avatars/113.svg";
import starmie from "@/assets/avatars/121.svg";
import snorlax from "@/assets/avatars/143.svg";
import ondine from "@/assets/avatars/ondine.png";
import prChen from "@/assets/avatars/pr-chen.png";

const TEAM_COLORS = {
  FELIX_FRONT_END: "#fbdae0",
  FELIX_FRONT_END_DARK: "#f56c84",
  FELIX_FRONT_END_FELIX_BACK_END:
    "linear-gradient(135deg, #fbdae0 50%, #d8c6e9 50%)",
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
      id: "dc625caa-9df2-4d4d-b48f-41ae420684a3",
      color: TEAM_COLORS.FELIX_BACK_END,
      colorDark: TEAM_COLORS.FELIX_BACK_END_DARK,
      name: "Gaëtan",
      avatar: gengar,
    },
  ],
  [
    {
      id: "5bbf381e-aa28-47c0-8c6e-ee15675f5b5f",
      color: TEAM_COLORS.FELIX_FRONT_END,
      colorDark: TEAM_COLORS.FELIX_FRONT_END_DARK,
      name: "Chan",
      avatar: chansey,
    },
    {
      id: "5a47aee6-f3df-4adc-83da-3addde283806",
      color: TEAM_COLORS.FELIX_FRONT_END_FELIX_BACK_END,
      colorDark: TEAM_COLORS.FELIX_FRONT_END_DARK,
      name: "Mizuki",
      avatar: snorlax,
      isAdmin: true,
    },
  ],
  [
    {
      id: "f454b0bc-45e5-4886-99bd-69babb750074",
      color: TEAM_COLORS.API,
      colorDark: TEAM_COLORS.API_DARK,
      name: "Dimas",
      avatar: charmander,
    },
    {
      id: "ab4e30a7-6b8f-49f9-938a-62c98c5eef47",
      color: TEAM_COLORS.API,
      colorDark: TEAM_COLORS.API_DARK,
      name: "Morvana",
      avatar: oddish,
    },
  ],
  [
    {
      id: "859bce2f-b875-4784-9801-084aae23362d",
      color: TEAM_COLORS.API,
      colorDark: TEAM_COLORS.API_DARK,
      name: "Rihab",
      avatar: squirtle,
    },
    {
      id: "13d69df1-17d3-45a0-91ee-52975f35e3e8",
      color: TEAM_COLORS.API,
      colorDark: TEAM_COLORS.API_DARK,
      name: "Youhai",
      avatar: starmie,
    },
  ],
  [
    {
      id: "7e193eea-a6b3-443d-8242-13790265e462",
      color: TEAM_COLORS.FELIX_BACK_END_PITARI,
      colorDark: TEAM_COLORS.PITARI_DARK,
      name: "James",
      avatar: bellsprout,
    },
    {
      id: "db94c786-05a6-4e3a-a857-cf89b3719ad6",
      color: TEAM_COLORS.FELIX_BACK_END_PITARI,
      colorDark: TEAM_COLORS.PITARI_DARK,
      name: "Ventiy",
      avatar: caterpie,
    },
  ],
  [
    {
      id: "36b46202-0d3c-4dae-8c0b-ee012978779e",
      color: TEAM_COLORS.JSSDK,
      colorDark: TEAM_COLORS.JSSDK_DARK,
      name: "Asad",
      avatar: paras,
    },
    {
      id: "4d8e9091-a6a6-40ca-a403-ea11de546383",
      color: TEAM_COLORS.QA,
      colorDark: TEAM_COLORS.QA_DARK,
      name: "Preeti",
      avatar: cubone,
    },
  ],
  [
    {
      id: "dde1963a-71dd-47a0-a12e-760ad5f9cad3",
      color: TEAM_COLORS.OTHERS,
      colorDark: TEAM_COLORS.OTHERS_DARK,
      name: "Harry",
      avatar: ondine,
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

export const WEBCX_TEAM_2: TeamType = {
  id: "352f4149-eeb1-447b-bfe5-7eec213d4254",
  name: "WebCX 2",
  members: TEAM_MEMBERS,
  logoSrc: logo3,
  color: "#F2E895",
};
